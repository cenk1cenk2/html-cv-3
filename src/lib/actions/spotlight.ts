import type { Action } from 'svelte/action'

import { section } from '#lib/stores/section.svelte.js'

const nodes = new Set<HTMLElement>()
let frame: number | null = null

const update = (): void => {
  frame = null

  const line = window.innerHeight / 2
  let active: HTMLElement | undefined
  let closest = -Infinity

  for (const node of nodes) {
    const { top } = node.getBoundingClientRect()

    if (top <= line && top > closest) {
      active = node
      closest = top
    }
  }

  for (const node of nodes) {
    const state = node === active ? 'on' : 'off'

    if (node.dataset.spotlight !== state) {
      node.dataset.spotlight = state
    }
  }

  if (active) {
    section.active = active.id
  }
}

const schedule = (): void => {
  frame ??= requestAnimationFrame(update)
}

export const spotlight: Action<HTMLElement> = (node) => {
  if (nodes.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  }

  nodes.add(node)
  schedule()

  return {
    destroy(): void {
      nodes.delete(node)

      if (nodes.size === 0) {
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
      }
    }
  }
}
