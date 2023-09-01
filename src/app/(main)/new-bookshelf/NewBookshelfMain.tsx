'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AddBooks from './AddBooks'
import Button from '@/components/Button'
import Modal from './Modal'

export default function NewBookshelfMain() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ bookshelfName: string }>()

  const supabase = createClientComponentClient()

  const [bookshelfNames, setBookshelfNames] = useState<any[] | null>(null)
  const [books, setBooks] = useState<any[]>([])
  const [bookshelfId, setBookshelfId] = useState<number | null>(null)

  const [isModalActive, setIsModalActive] = useState(false)
  const [error, setError] = useState(false)

  const getUserBookshelves = async () => {
    const { data } = await supabase
      .from('bookshelves')
      .select()
      .eq('user_id', (await supabase.auth.getUser())?.data?.user?.id)

    if (data?.length) {
      setBookshelfNames(
        data?.map((bookshelf) => {
          return bookshelf.name
        }),
      )
    }
  }

  useEffect(() => {
    getUserBookshelves()
  }, [])

  const onSubmit: SubmitHandler<{ bookshelfName: string }> = async ({
    bookshelfName,
  }) => {
    const { data, error } = await supabase
      .from('bookshelves')
      .insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        name: bookshelfName,
      })
      .select()

    if (!error) {
      setBookshelfId(data?.at(0)?.id)

      if (books.length) {
        const parsedBooks = books.map((book) => {
          return {
            bookshelf_id: data?.at(0)?.id,
            book_id: book?.key.split('/')?.at(2),
            book_title: book.title,
            cover_id: book?.cover_i,
            author_name: book?.author_name?.at(0),
            author_id: book?.author_key?.at(0),
          }
        })

        const { error } = await supabase
          .from('bookshelf_items')
          .insert(parsedBooks)

        if (error) {
          setError(true)
        }
      }
    } else {
      setError(true)
    }

    setIsModalActive(true)
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
              value: 20,
              message: 'Bookshelf name should be shorter than 20 characters.',
            },
            pattern: {
              value: /^[a-zA-Z0-9 ]+$/,
              message: 'Only letters and numbers are allowed.',
            },
            validate: (value) => {
              if (bookshelfNames) {
                return (
                  !bookshelfNames?.includes(value) ||
                  'This bookshelf name already exists'
                )
              }
            },
          })}
        />

        <p className="mb-4 mt-[-16px] text-center text-sm opacity-80">
          {errors.bookshelfName?.message}
        </p>

        <AddBooks books={books} setBooks={setBooks} />

        <Button className="mt-5" type="submit" variant={'cta'}>
          Create
        </Button>

        <Modal active={isModalActive} error={error} bookshelfId={bookshelfId} />
      </form>
    </div>
  )
}
