'use client'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

type Props = {
  active: boolean
  error: boolean
  bookshelfId: number | null
}

export default function Modal({ active, error, bookshelfId }: Props) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

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
        className="relative flex w-[450px] flex-col items-center justify-center rounded-md border border-black bg-bg p-10 py-14 text-center transition-all duration-300 dark:border-white dark:bg-darkBg"
      >
        <>
          {!error ? (
            <>
              <h2 className="text-xl font-bold">
                You successfully created your bookshelf!
              </h2>

              <Button
                className="mt-6"
                onClick={() => {
                  location.replace(`/bookshelf/${bookshelfId}`)
                }}
                variant={'cta'}
              >
                Go to bookshelf
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">An error has occured</h2>

              <Button
                className="mt-6"
                onClick={() => {
                  router.refresh()
                }}
                variant={'cta'}
              >
                Try again
              </Button>
            </>
          )}
        </>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  )
}
