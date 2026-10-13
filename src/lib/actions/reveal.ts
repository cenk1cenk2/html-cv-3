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
  let threshold: number | undefined

  const clamp = (): number => Math.min(options?.threshold ?? 0, ((window.innerHeight - 48) / node.offsetHeight) * 0.95)

  const observe = (): void => {
    const value = clamp()

    observer?.disconnect()
    threshold = value

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]

        if (entry.isIntersecting && entry.intersectionRatio >= value) {
          node.dataset.reveal = 'visible'
        } else if (entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)) {
          node.dataset.reveal = above ? 'above' : 'visible'
        } else {
          node.dataset.reveal = 'below'
        }
      },
      { threshold: [0, value], rootMargin: mobile.matches ? options?.mobileMargin : undefined }
    )

    observer.observe(node)
  }

  const refresh = (): void => {
    if (clamp() !== threshold) {
      observe()
    }
  }

  const resize = new ResizeObserver(refresh)

  observe()
  resize.observe(node)
  mobile.addEventListener('change', observe)
  window.addEventListener('resize', refresh)

  return {
    destroy(): void {
      observer?.disconnect()
      resize.disconnect()
      mobile.removeEventListener('change', observe)
      window.removeEventListener('resize', refresh)
    }
  }
}
