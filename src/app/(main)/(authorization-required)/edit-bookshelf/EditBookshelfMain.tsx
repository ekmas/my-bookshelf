'use client'

import Button from '@/components/Button'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import EditBooks from './EditBooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams, useRouter } from 'next/navigation'
import Modal from '@/components/Modal'
import ModalMain from './ModalMain'

type Props = {
  currentBookshelfName: string
  currentBooks: any[]
}

export default function EditBookshelfMain({
  currentBookshelfName,
  currentBooks,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ bookshelfName: string }>({
    defaultValues: {
      bookshelfName: currentBookshelfName,
    },
  })

  const supabase = createClientComponentClient()
  const { id } = useParams()
  const router = useRouter()

  const [books, setBooks] = useState(currentBooks)
  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit: SubmitHandler<{ bookshelfName: string }> = async ({
    bookshelfName,
  }) => {
    if (
      currentBookshelfName === bookshelfName &&
      JSON.stringify(currentBooks) === JSON.stringify(books)
    ) {
      router.push(`/bookshelf/${id}`)
    } else {
      if (currentBookshelfName !== bookshelfName) {
        const { error } = await supabase
          .from('bookshelves')
          .update({ name: bookshelfName })
          .eq('id', id)

        if (error) setError(true)
      }

      if (JSON.stringify(currentBooks) !== JSON.stringify(books)) {
        const addedObjects = []
        const removedObjects = []

        const currentBooksMap = new Map(
          currentBooks.map((obj) => [obj.id, obj]),
        )
        const booksMap = new Map(books.map((obj) => [obj.id, obj]))

        for (const obj1 of currentBooks) {
          if (!booksMap.has(obj1.id)) {
            removedObjects.push(obj1)
          }
        }

        for (const obj2 of books) {
          if (!currentBooksMap.has(obj2.id)) {
            addedObjects.push(obj2)
          }
        }

        if (addedObjects.length) {
          const { error } = await supabase
            .from('bookshelf_items')
            .insert(addedObjects)

          if (error) setError(true)
        }

        if (removedObjects) {
          const ids = removedObjects.map((item) => item.id)

          const { error } = await supabase
            .from('bookshelf_items')
            .delete()
            .in('id', [ids])

          if (error) setError(true)
        }
      }

      setIsModalActive(true)
    }
  }

  return (
    <div className="mx-auto mt-8 flex w-[600px] justify-center">
      <form
        className="flex w-full flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="mb-6 w-[30ch] rounded-lg bg-secondary px-5 py-4 focus:outline-none dark:bg-darkSecondary"
          placeholder="Bookshelf name"
          autoComplete="off"
          {...register('bookshelfName', {
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Bookshelf name should be at least 2 characters long.',
            },
            maxLength: {
              value: 40,
              message: 'Bookshelf name should be shorter than 40 characters.',
            },
            pattern: {
              value: /^[a-zA-Z0-9 ]+$/,
              message: 'Only letters and numbers are allowed.',
            },
          })}
        />

        <p className="mb-4 mt-[-16px] text-center text-sm opacity-80">
          {errors.bookshelfName?.message}
        </p>

        <EditBooks books={books} setBooks={setBooks} />

        <Button className="mt-5" type="submit" variant={'cta'}>
          Update
        </Button>

        <Modal
          active={isModalActive}
          setActive={setIsModalActive}
          showCloseButton={false}
        >
          <ModalMain error={error} bookshelfId={Number(id)} />
        </Modal>
      </form>
    </div>
  )
}
