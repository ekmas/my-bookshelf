'use client'

import Button from '@/components/Button'
import { useParams, useRouter } from 'next/navigation'

export default function Pagination({
  numberOfPages,
  currentPage,
}: {
  numberOfPages: number
  currentPage: number
}) {
  const router = useRouter()
  const { id } = useParams()

  return (
    <div className="mt-5 flex w-full items-center justify-center">
      <div className="flex gap-6">
        <Button
          disabled={currentPage <= 1}
          onClick={() => {
            router.push(`/author/${id}?page=${currentPage - 1}`)
          }}
        >
          Prev
        </Button>
        <Button
          disabled={currentPage >= numberOfPages}
          onClick={() => {
            router.push(`/author/${id}?page=${currentPage + 1}`)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
