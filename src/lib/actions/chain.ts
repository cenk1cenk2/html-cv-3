import type { Action } from 'svelte/action'

const STIFFNESS = 160
const DAMPING = 2 * Math.sqrt(STIFFNESS)
const EASE = 0.09
const GAP = 12
const EDGE = 16
const PLUG = 25

interface Row {
  node: HTMLElement
  logo: Element | null
  card: Element | null
  joint: Element[]
}

const rows = new Set<Row>()
let position: number | undefined
let velocity = 0
let last: number | undefined
let frame: number | undefined
let busy = 0
let holding = 0
let held: { row: Row; offset: number } | undefined
let target: unknown
let previous: number | undefined
let chase: number | undefined

const mobile = (): boolean => window.matchMedia('(width < 48rem)').matches

const anchor = ({ node, logo, card }: Row): number => {
  if (node === node.parentElement?.lastElementChild) {
    return node.getBoundingClientRect().bottom
  }

  return ((mobile() ? card : logo) ?? node).getBoundingClientRect().bottom + GAP
}

const shown = ({ node }: Row): boolean => node.dataset.reveal !== 'below' || node.getBoundingClientRect().top < 0

const aim = (): { y: number; key: unknown } => {
  const small = mobile()
  const light = window.innerHeight - (small ? 100 : 60)
  const floor = Math.min(window.innerHeight, document.querySelector('.navbar')?.getBoundingClientRect().top ?? Infinity) - EDGE - PLUG
  const anchors: { row: Row; y: number }[] = []
  let start = Infinity

  for (const row of rows) {
    const { node, logo, card } = row

    start = Math.min(start, node.getBoundingClientRect().top)

    if (shown(row) && ((small ? card : logo) ?? node).getBoundingClientRect().top < light) {
      anchors.push({ row, y: anchor(row) })
    }
  }

  if (anchors.length === 0) {
    return { y: window.scrollY + start, key: 'start' }
  }

  const highest = (list: typeof anchors): (typeof anchors)[number] => list.reduce((a, b) => (b.y > a.y ? b : a))

  if (small) {
    const pick = highest(anchors)

    return { y: window.scrollY + pick.y, key: pick.row }
  }

  const fitting = anchors.filter(({ y }) => y <= floor)
  const pick = fitting.length > 0 ? highest(fitting) : anchors.reduce((a, b) => (b.y < a.y ? b : a))

  if (pick.y > floor) {
    return { y: window.scrollY + floor, key: 'floor' }
  }

  if (pick.y < EDGE) {
    return { y: window.scrollY + EDGE, key: 'edge' }
  }

  return { y: window.scrollY + pick.y, key: pick.row }
}

const paint = (): void => {
  for (const { node, logo, joint } of rows) {
    const { top, height } = node.getBoundingClientRect()
    const draw = Math.min(1, Math.max(0, ((position ?? 0) - window.scrollY - top) / height))
    const ring = joint.map((element) => element.getBoundingClientRect()).filter((rect) => rect.height > 0)

    node.style.setProperty('--draw', draw.toFixed(4))

    if (logo) {
      const icon = logo.getBoundingClientRect()

      node.style.setProperty('--hole-top', `${Math.round(icon.top - top)}px`)
      node.style.setProperty('--hole-bottom', `${Math.round(icon.bottom - top)}px`)
    }

    node.style.setProperty('--joint-top', ring.length > 0 ? `${Math.round(Math.min(...ring.map((rect) => rect.top)) - top)}px` : '0px')
    node.style.setProperty('--joint-bottom', ring.length > 0 ? `${Math.round(Math.max(...ring.map((rect) => rect.bottom)) - top)}px` : '0px')
  }
}

const ride = (time: number): boolean => {
  if (time >= holding || !held || !rows.has(held.row)) {
    held = undefined

    return false
  }

  position = window.scrollY + anchor(held.row) + held.offset
  chase = position
  velocity = 0
  target = undefined
  paint()

  return true
}

const step = (time: number): void => {
  if (ride(time)) {
    last = undefined
    frame = requestAnimationFrame(step)

    return
  }

  const { y: goal, key } = aim()
  const delta = Math.min(0.05, (time - (last ?? time)) / 1000)

  position ??= goal
  chase ??= position

  if (key === target && previous !== undefined) {
    position += goal - previous
    chase += goal - previous
  }

  target = key
  previous = goal
  chase += (goal - chase) * (1 - Math.exp(-delta / EASE))
  velocity += (STIFFNESS * (chase - position) - DAMPING * velocity) * delta
  position += velocity * delta
  last = time

  if (time > busy && Math.abs(goal - position) < 0.5 && Math.abs(goal - chase) < 0.5 && Math.abs(velocity) < 5) {
    position = goal
    chase = goal
    velocity = 0
    last = undefined
    frame = undefined
  } else {
    frame = requestAnimationFrame(step)
  }

  paint()
}

const wake = (): void => {
  frame ??= requestAnimationFrame(step)
}

const reflow = (): void => {
  ride(performance.now())
  wake()
}

const follow = (event: TransitionEvent): void => {
  busy = Math.max(busy, performance.now() + event.elapsedTime * 1000 + 1000)
  wake()
}

export const hold = (duration: number): void => {
  if (position === undefined) {
    return
  }

  const drawn = [...rows].filter((row) => (parseFloat(row.node.style.getPropertyValue('--draw')) || 0) > 0)
  const tip = drawn.find((row) => parseFloat(row.node.style.getPropertyValue('--draw')) < 1) ?? drawn.at(-1)

  if (!tip) {
    return
  }

  held ??= { row: tip, offset: position - window.scrollY - anchor(tip) }
  holding = performance.now() + duration
  wake()
}

export const chain: Action<HTMLElement> = (node) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const row: Row = {
    node,
    logo: node.querySelector('.timeline-logo'),
    card: node.querySelector('.timeline-card'),
    joint: [...node.querySelectorAll('.tether-down, .tether-up')]
  }
  const resize = new ResizeObserver(reflow)

  if (rows.size === 0) {
    window.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('resize', wake)
  }

  rows.add(row)
  node.dataset.chain = ''
  resize.observe(node)

  if (row.card) {
    resize.observe(row.card)
  }

  node.addEventListener('transitionrun', follow)
  wake()

  return {
    destroy(): void {
      rows.delete(row)
      resize.disconnect()
      node.removeEventListener('transitionrun', follow)

      if (rows.size === 0) {
        window.removeEventListener('scroll', wake)
        window.removeEventListener('resize', wake)
      }
    }
  }
}
