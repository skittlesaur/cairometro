import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

    window.addEventListener('resize', handleResize)

    handleResize() // update on mount

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < 640,
    isTablet: windowSize.width >= 640 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  }
}

export default useWindowSize