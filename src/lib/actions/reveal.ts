import type { Action } from 'svelte/action'

export const reveal: Action<HTMLElement> = (node) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const observer = new IntersectionObserver(([entry]) => {
    node.dataset.reveal = entry.isIntersecting || entry.boundingClientRect.top < 0 ? 'visible' : 'below'
  })

  observer.observe(node)

  return {
    destroy(): void {
      observer.disconnect()
    }
  }
}
