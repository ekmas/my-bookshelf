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
    <div className="mx-auto flex h-full min-h-[calc(100dvh-128px)] w-container flex-col items-center justify-center px-containerDesktop py-20">
      <h2 className="text-3xl font-bold">An error has occured!</h2>
      <p className="my-8 text-xl">
        Error: {error.message || 'Something went wrong'}
      </p>
      <div className="flex items-center gap-6">
        <Button href="/" variant={'cta'} className="text-lg">
          Go home
        </Button>

        <Button variant={'cta'} className="text-lg" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  )
}
