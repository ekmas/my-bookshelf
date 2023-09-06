'use client'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

type Props = {
  error: boolean
  bookshelfId: number | null
}

export default function ModalMain({ error, bookshelfId }: Props) {
  const router = useRouter()

  return (
    <>
      {!error ? (
        <>
          <h2 className="text-center text-xl font-bold">
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
          <h2 className="text-center text-xl font-bold">
            An error has occured
          </h2>

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
  )
}
