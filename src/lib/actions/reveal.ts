import type { Action } from 'svelte/action'

export interface RevealOptions {
  above?: boolean
  threshold?: number
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { above = false, threshold = 0 } = options ?? {}

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        node.dataset.reveal = 'visible'
      } else if (entry.boundingClientRect.top < 0) {
        node.dataset.reveal = above ? 'above' : 'visible'
      } else {
        node.dataset.reveal = 'below'
      }
    },
    { threshold }
  )

  observer.observe(node)

  return {
    destroy(): void {
      observer.disconnect()
    }
  }
}
