import type { Action } from 'svelte/action'

export const spotlight: Action<HTMLElement> = (node) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      node.dataset.spotlight = entry.isIntersecting ? 'on' : 'off'
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
