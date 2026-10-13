import type { Action } from 'svelte/action'

const STIFFNESS = 160
const DAMPING = 2 * Math.sqrt(STIFFNESS)
const EASE = 0.09
const GAP = 12
const EDGE = 16
const PLUG = 25

interface Row {
  node: HTMLElement
  chain: HTMLElement
  section: HTMLElement | null
  logo: Element | null
  card: Element | null
  joint: Element[]
  written: Map<string, string>
}

interface Measure {
  row: Row
  box: DOMRect
  icon?: DOMRect
  card?: DOMRect
  ring: DOMRect[]
  reached: boolean
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
let query: MediaQueryList | undefined
let navbar: Element | null | undefined

const mobile = (): boolean => (query ??= window.matchMedia('(width < 48rem)')).matches

const inspect = (row: Row): Measure => ({
  row,
  box: row.node.getBoundingClientRect(),
  icon: row.logo?.getBoundingClientRect(),
  card: row.card?.getBoundingClientRect(),
  ring: row.joint.map((element) => element.getBoundingClientRect()).filter((rect) => rect.height > 0),
  reached: !row.section || row.section.getBoundingClientRect().top <= window.innerHeight / 2
})

const measure = (): Measure[] => [...rows].map(inspect)

const anchor = ({ row, box, icon, card }: Measure, small: boolean): number => {
  if (row.node === row.node.parentElement?.lastElementChild) {
    return box.bottom
  }

  return ((small ? card : icon) ?? box).bottom + GAP
}

const shown = ({ row, box, reached }: Measure): boolean => (row.node.dataset.reveal !== 'below' && reached) || box.top < 0

const aim = (measured: Measure[]): { y: number; key: unknown } => {
  const small = mobile()
  const light = window.innerHeight - (small ? 100 : 60)

  navbar = navbar?.isConnected ? navbar : document.querySelector('.navbar')

  const floor = Math.min(window.innerHeight, navbar?.getBoundingClientRect().top ?? Infinity) - EDGE - PLUG
  const anchors: { row: Row; y: number }[] = []
  let start = Infinity

  for (const entry of measured) {
    start = Math.min(start, entry.box.top)

    if (shown(entry) && ((small ? entry.card : entry.icon) ?? entry.box).top < light) {
      anchors.push({ row: entry.row, y: anchor(entry, small) })
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

const write = (row: Row, name: string, value: string, target: HTMLElement = row.chain): void => {
  if (row.written.get(name) === value) {
    return
  }

  row.written.set(name, value)
  target.style.setProperty(name, value)
}

const paint = (measured: Measure[]): void => {
  for (const { row, box, icon, ring } of measured) {
    write(row, '--draw', Math.min(1, Math.max(0, ((position ?? 0) - window.scrollY - box.top) / box.height)).toFixed(4))

    if (icon) {
      write(row, '--lit', Math.min(1, Math.max(0, ((position ?? 0) - window.scrollY - box.top) / (icon.bottom + GAP - box.top))).toFixed(3), row.node)
      write(row, '--hole-top', `${Math.round(icon.top - box.top)}px`)
      write(row, '--hole-bottom', `${Math.round(icon.bottom - box.top)}px`)
    }

    write(row, '--joint-top', ring.length > 0 ? `${Math.round(Math.min(...ring.map((rect) => rect.top)) - box.top)}px` : '0px')
    write(row, '--joint-bottom', ring.length > 0 ? `${Math.round(Math.max(...ring.map((rect) => rect.bottom)) - box.top)}px` : '0px')
  }
}

const drawn = (row: Row): number => parseFloat(row.written.get('--draw') ?? '0')

const ride = (time: number): boolean => {
  if (time >= holding || !held || !rows.has(held.row)) {
    held = undefined

    return false
  }

  const measured = measure()
  const entry = measured.find(({ row }) => row === held?.row)

  if (!entry) {
    return false
  }

  position = window.scrollY + anchor(entry, mobile()) + held.offset
  chase = position
  velocity = 0
  target = undefined
  paint(measured)

  return true
}

const step = (time: number): void => {
  if (rows.size === 0) {
    frame = undefined

    return
  }

  if (ride(time)) {
    last = undefined
    frame = requestAnimationFrame(step)

    return
  }

  const measured = measure()
  const { y: goal, key } = aim(measured)
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

  paint(measured)
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

const reset = (): void => {
  if (frame !== undefined) {
    cancelAnimationFrame(frame)
  }

  frame = position = chase = last = previous = target = held = undefined
  velocity = busy = holding = 0
}

export const hold = (duration: number): void => {
  if (position === undefined) {
    return
  }

  if (performance.now() >= holding) {
    held = undefined
  }

  const lit = [...rows].filter((row) => drawn(row) > 0)
  const tip = lit.find((row) => drawn(row) < 1) ?? lit.at(-1)

  if (!tip) {
    return
  }

  held ??= { row: tip, offset: position - window.scrollY - anchor(inspect(tip), mobile()) }
  holding = performance.now() + duration
  wake()
}

export const chain: Action<HTMLElement> = (node) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const row: Row = {
    node,
    chain: node.querySelector<HTMLElement>('.timeline-chain') ?? node,
    section: node.closest('section'),
    logo: node.querySelector('.timeline-logo'),
    card: node.querySelector('.timeline-card'),
    joint: [...node.querySelectorAll('.tether-down, .tether-up')],
    written: new Map()
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
        reset()
      }
    }
  }
}
