'use client'
import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { MdClose } from 'react-icons/md'
import clsx from 'clsx'

type Props = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  showCloseButton?: boolean
  children: React.ReactNode
}

export default function Modal({
  active,
  setActive,
  showCloseButton = true,
  children,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => {
      setActive(false)
    }, 300)
  }

  useEffect(() => {
    if (active) {
      setIsVisible(true)
    }
  }, [active])

  if (!active) return null

  return ReactDom.createPortal(
    <div
      className={clsx(
        isVisible ? 'opacity-100' : 'opacity-0',
        'fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-white/50 transition-all duration-300 dark:bg-black/50',
      )}
    >
      <div
        className={clsx(
          isVisible ? 'visible' : 'hidden',
          showCloseButton ? 'py-14' : 'py-10',
          'relative flex w-[450px] flex-col items-center justify-center rounded-md border border-black bg-bg p-10 text-center transition-all duration-300 dark:border-white dark:bg-darkBg',
        )}
      >
        {showCloseButton && (
          <button onClick={closeModal}>
            <MdClose className="absolute right-6 top-6 h-6 w-6" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  )
}
