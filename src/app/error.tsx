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
    <div className="mx-auto flex h-full min-h-[calc(100dvh-128px)] w-full max-w-container flex-col items-center justify-center px-containerDesktop py-20 text-center m500:min-h-[calc(100dvh-152px)] m400:min-h-[100dvh] m400:px-containerMobile">
      <h2 className="text-3xl font-bold m400:text-xl">An error has occured!</h2>
      <p className="my-8 text-xl m400:text-base">
        Error: {error.message || 'Something went wrong'}
      </p>
      <div className="flex items-center gap-6 m400:text-sm">
        <Button href="/" variant={'cta'} className="text-lg m400:text-sm">
          Go home
        </Button>

        <Button
          variant={'cta'}
          className="text-lg m400:text-sm"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
