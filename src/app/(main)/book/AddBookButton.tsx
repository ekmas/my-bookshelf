'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import AddBookModal from './AddBookModal'

export default function AddBookButton({ bookInfo }: { bookInfo: any }) {
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalActive(true)} variant={'cta'}>
        Add to bookshelf
      </Button>

      <AddBookModal
        active={isModalActive}
        setActive={setIsModalActive}
        bookInfo={bookInfo}
      />
    </>
  )
}
