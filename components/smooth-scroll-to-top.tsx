"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function SmoothScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Enhanced smooth scroll to top with fallback
    const smoothScrollToTop = () => {
      // Check if smooth scrolling is supported
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      } else {
        // Fallback for older browsers with custom smooth animation
        const scrollToTop = () => {
          const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
          if (currentScroll > 0) {
            window.requestAnimationFrame(scrollToTop)
            window.scrollTo(0, currentScroll - currentScroll / 8)
          }
        }
        scrollToTop()
      }
    }

    // Small delay to ensure page content is loaded
    const timeoutId = setTimeout(smoothScrollToTop, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
