import { useLayoutEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  const handleWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useLayoutEffect(() => {
    handleWidth()

    window.addEventListener('resize', handleWidth)

    return () => window.removeEventListener('resize', handleWidth)
  }, [])

  return windowWidth
}

export default useWindowWidth
