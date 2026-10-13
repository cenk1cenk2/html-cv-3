import type { Action } from 'svelte/action'

export interface RevealOptions {
  above?: boolean
  threshold?: number
  mobileMargin?: string
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const { above = false } = options ?? {}
  const mobile = window.matchMedia('(width < 48rem)')
  let observer: IntersectionObserver | undefined

  const observe = (): void => {
    observer?.disconnect()

    const threshold = Math.min(options?.threshold ?? 0, ((window.innerHeight - 48) / node.offsetHeight) * 0.95)

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]

        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          node.dataset.reveal = 'visible'
        } else if (entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)) {
          node.dataset.reveal = above ? 'above' : 'visible'
        } else {
          node.dataset.reveal = 'below'
        }
      },
      { threshold: [0, threshold], rootMargin: mobile.matches ? options?.mobileMargin : undefined }
    )

    observer.observe(node)
  }

  observe()
  mobile.addEventListener('change', observe)

  return {
    destroy(): void {
      observer?.disconnect()
      mobile.removeEventListener('change', observe)
    }
  }
}
