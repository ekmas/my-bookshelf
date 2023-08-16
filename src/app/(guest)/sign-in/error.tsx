'use client'

import Button from '@/components/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100dvh-88px-70px)] w-container flex-col items-center justify-center px-containerDesktop py-20">
      <h2 className="text-3xl font-bold">An error has occured!</h2>
      <p className="my-6 text-xl">
        Error: {error.message || 'Something went wrong'}
      </p>
      <Button variant={'cta'} className="text-lg" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
