'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import Modal from '@/components/Modal'
import DeleteModal from './DeleteModal'

type Props = { bookshelf: any; isThisMyBookshelf: boolean }

export default function Bookshelf({ bookshelf, isThisMyBookshelf }: Props) {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)

  return (
    <div className="flex min-h-[130px] flex-col justify-between rounded-lg bg-secondary p-5 transition-colors hover:bg-secondaryHover dark:bg-darkSecondary dark:hover:bg-darkSecondaryHover">
      <Link href={`/bookshelf/${bookshelf.id}`} className="font-medium">
        {bookshelf.name}
      </Link>

      {isThisMyBookshelf && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button
            href={`/edit-bookshelf/${bookshelf.id}`}
            size={'sm'}
            variant={'cta'}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalActive(true)
            }}
            size={'sm'}
            variant={'cta'}
          >
            Delete
          </Button>

          <Modal
            active={isDeleteModalActive}
            setActive={setIsDeleteModalActive}
          >
            <DeleteModal id={bookshelf.id} />
          </Modal>
        </div>
      )}
    </div>
  )
}