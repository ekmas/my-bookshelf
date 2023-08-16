'use client'
import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { MdClose } from 'react-icons/md'

type Props = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ active, setActive }: Props) {
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
        className="relative flex w-[450px] flex-col items-center justify-center rounded-md border-2 border-black bg-bg p-10 py-14 text-center transition-all duration-300 dark:border-white dark:bg-darkBg"
      >
        <button onClick={closeModal}>
          <MdClose className="absolute right-6 top-6 h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold">
          You successfully created your account!
        </h2>

        <p className="mt-6">
          Please verify your account via link in email we've sent you, so you
          can sign in.
        </p>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  )
}
