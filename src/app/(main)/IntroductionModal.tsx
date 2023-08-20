'use client'
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import IntroductionWrapper from './IntroductionWrapper'

export default function IntroductionModal({
  isFirstLogin,
}: {
  isFirstLogin: null | boolean
}) {
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isFirstLogin) {
      // im manually setting active to true after 2 seconds because at the moment isFirstLogin changed, div with id modal maybe didn't mount yet

      setTimeout(() => {
        setIsActive(true)
      }, 2000)
      setTimeout(() => {
        setIsVisible(true)
      }, 2500)
    }
  }, [isFirstLogin])

  if (!isActive) return null

  return ReactDom.createPortal(
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-white/50 transition-all duration-300 dark:bg-black/50"
      style={{
        opacity: isVisible ? '1' : '0',
      }}
    >
      <div
        style={{
          opacity: isVisible ? '1' : '0',
          visibility: isVisible ? 'visible' : 'hidden',
        }}
        className="relative flex w-[450px] flex-col items-center justify-center rounded-md border-2 border-black/50 bg-bg px-5 py-14 text-center transition-all duration-300 dark:border-white/50 dark:bg-darkBg"
      >
        <IntroductionWrapper />
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  )
}
