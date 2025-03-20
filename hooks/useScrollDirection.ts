'use client'

import { useEffect, useState } from 'react'

type Direction = 'up' | 'down' | null

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<Direction>(null)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    setAtTop(window.scrollY <= 0)
    setPrevScrollY(window.scrollY)

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setAtTop(true)
        setDirection('up')
        setPrevScrollY(0)
        return
      }

      if (atTop && currentScrollY > 0) {
        setAtTop(false)
      }

      if (Math.abs(currentScrollY - prevScrollY) > threshold) {
        const newDirection = currentScrollY > prevScrollY ? 'down' : 'up'
        setDirection(newDirection)
        setPrevScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollY, threshold, atTop])

  return { direction, atTop }
}
