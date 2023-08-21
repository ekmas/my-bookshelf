'use client'

import Button from '@/components/Button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center">
        <h2 className="mb-6 text-center text-2xl font-bold">
          {error.message || 'Something went wrong!'}
        </h2>
        <Button variant={'cta'} onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  )
}
