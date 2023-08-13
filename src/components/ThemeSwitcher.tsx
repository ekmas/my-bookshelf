'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      {theme === 'dark' ? (
        <button onClick={() => setTheme('light')}>
          <BsFillSunFill className="h-6 w-6" />
        </button>
      ) : (
        <button onClick={() => setTheme('dark')}>
          <BsFillMoonFill className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}

export default ThemeSwitcher
