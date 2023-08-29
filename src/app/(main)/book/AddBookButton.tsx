'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import AddBookModal from './AddBookModal'

type Props = {
  coverId: string | null
  bookName: string | null
}

export default function AddBookButton({ coverId, bookName }: Props) {
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalActive(true)} variant={'cta'}>
        Add to bookshelf
      </Button>

      <AddBookModal
        active={isModalActive}
        setActive={setIsModalActive}
        coverId={coverId}
        bookName={bookName}
      />
    </>
  )
}
