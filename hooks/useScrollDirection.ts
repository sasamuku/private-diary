'use client'

import { useEffect, useState } from 'react'

type Direction = 'up' | 'down' | null

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<Direction>(null)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - prevScrollY) > threshold) {
        const newDirection = currentScrollY > prevScrollY ? 'down' : 'up'
        setDirection(newDirection)
        setPrevScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollY, threshold])

  return direction
}
