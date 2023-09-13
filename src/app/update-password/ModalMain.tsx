'use client'

import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function ModalMain({ error }: { error: boolean }) {
  const router = useRouter()

  return (
    <>
      {!error ? (
        <>
          <h2 className="text-center text-xl font-bold">
            You successfully updated your password!
          </h2>

          <Button
            className="mt-6"
            onClick={() => {
              router.push('/')
            }}
            variant={'cta'}
          >
            Go home
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-center text-xl font-bold">
            An error has occured
          </h2>

          <Button
            className="mt-6"
            onClick={() => {
              location.reload()
            }}
            variant={'cta'}
          >
            Try again
          </Button>
        </>
      )}
    </>
  )
}
