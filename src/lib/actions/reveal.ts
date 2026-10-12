import type { Action } from 'svelte/action'

export const reveal: Action<HTMLElement> = (node) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.reveal = 'visible'
      } else {
        node.dataset.reveal = entry.boundingClientRect.top < 0 ? 'above' : 'below'
      }
    },
    { rootMargin: '0px 0px -10% 0px' }
  )

  observer.observe(node)

  return {
    destroy(): void {
      observer.disconnect()
    }
  }
}
