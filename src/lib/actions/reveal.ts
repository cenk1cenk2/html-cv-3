import type { Action } from 'svelte/action'

export interface RevealOptions {
  above?: boolean
  threshold?: number
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { above = false } = options ?? {}
  const threshold = Math.min(options?.threshold ?? 0, window.innerHeight / node.offsetHeight)

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
