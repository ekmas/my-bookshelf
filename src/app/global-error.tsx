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
      <body className="flex h-[100dvh] flex-col items-center justify-center">
        <div>
          <h2 className="mb-6 text-center text-2xl font-bold">
            {error.message || 'Something went wrong.'}
          </h2>
          <div className="flex items-center gap-6">
            <Button href="/" variant={'cta'} className="text-lg">
              Go home
            </Button>

            <Button variant={'cta'} className="text-lg" onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
