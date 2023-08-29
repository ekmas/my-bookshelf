import Button from '@/components/Button'
import { useState, useEffect } from 'react'
import Bookshelves from './Bookshelves'
import clsx from 'clsx'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams } from 'next/navigation'
import loadinggif from '@/../public/loadinggif.gif'

type Props = {
  bookName: string | null
  coverId: string | null
}

export default function AddBookModalMain({ bookName, coverId }: Props) {
  const supabase = createClientComponentClient()
  const { id } = useParams()

  const [bookshelves, setBookshelves] = useState<any[]>([])
  const [selectedBookshelf, setSelectedBookshelf] = useState<any>(null)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  const getUserBookshelves = async () => {
    const { data, error } = await supabase
      .from('bookshelves')
      .select()
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
    if (error) setError(true)
    if (data?.length) {
      setBookshelves(data)
    }

    setLoading(false)
  }

  const addBook = async () => {
    setLoading(true)

    const { error } = await supabase.from('bookshelf_items').insert({
      bookshelf_id: selectedBookshelf?.id,
      book_id: id,
      name: bookName,
      cover_id: coverId,
    })

    if (error) {
      setError(true)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserBookshelves()
  }, [])

  return (
    <>
      {!error ? (
        <>
          {!loading ? (
            <>
              {bookshelves.length ? (
                <>
                  {!success ? (
                    <>
                      <h2 className="text-xl font-bold">Choose bookshelf</h2>

                      <Bookshelves
                        bookshelves={bookshelves}
                        selectedBookshelf={selectedBookshelf}
                        setSelectedBookshelf={setSelectedBookshelf}
                      />

                      <Button
                        onClick={addBook}
                        disabled={selectedBookshelf === null}
                        className={clsx(
                          selectedBookshelf === null && 'cursor-not-allowed',
                          'mt-6',
                        )}
                        variant={'cta'}
                      >
                        Add
                      </Button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">Success</h2>

                      <Button
                        className="mt-6"
                        onClick={() => {
                          location.replace(`/bookshelf/${selectedBookshelf.id}`)
                        }}
                        variant={'cta'}
                      >
                        Go to bookshelf
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div>
                  <h2 className="text-xl font-bold">
                    Please create a bookshelf first
                  </h2>

                  <Button
                    className="mt-6"
                    href="/new-bookshelf"
                    variant={'cta'}
                  >
                    Create
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Image width={70} height={70} src={loadinggif.src} alt="loading" />
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">An error has occured</h2>

          <Button
            className="mt-6"
            onClick={() => {
              location.reload()
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
