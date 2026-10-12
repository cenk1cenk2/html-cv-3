import type { Action } from 'svelte/action'

import { activeSection } from '#lib/stores/section.store.js'

export const spotlight: Action<HTMLElement> = (node) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      node.dataset.spotlight = entry.isIntersecting ? 'on' : 'off'

      if (entry.isIntersecting) {
        activeSection.set(node.id)
      }
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )

  observer.observe(node)

  return {
    destroy(): void {
      observer.disconnect()
    }
  }
}
