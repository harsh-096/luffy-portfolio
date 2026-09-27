import { useState, useEffect, useRef } from 'react'

const STORAGE_KEY = 'harsh_portfolio_views'
const INITIAL_FAKE_COUNT = 5687

export function useVisitorCount() {
  const [count, setCount] = useState<number>(INITIAL_FAKE_COUNT)
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  const incrementedRef = useRef<boolean>(false)

  useEffect(() => {
    // Prevent double-incrementing in React StrictMode development mode
    if (incrementedRef.current) return
    incrementedRef.current = true

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      let nextCount: number

      if (!stored) {
        // First visit starts directly at 5,687
        nextCount = INITIAL_FAKE_COUNT
      } else {
        const parsed = parseInt(stored, 10)
        nextCount = isNaN(parsed) || parsed < INITIAL_FAKE_COUNT ? INITIAL_FAKE_COUNT + 1 : parsed + 1
      }

      localStorage.setItem(STORAGE_KEY, nextCount.toString())
      setCount(nextCount)
    } catch {
      setCount(INITIAL_FAKE_COUNT)
    } finally {
      setHasLoaded(true)
    }
  }, [])

  return { count, hasLoaded, formattedCount: count.toLocaleString() }
}
