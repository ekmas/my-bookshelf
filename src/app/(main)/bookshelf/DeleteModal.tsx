'use client'

import Button from '@/components/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import loadinggif from '@/../public/loadinggif.gif'

export default function DeleteModal() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { id } = useParams()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const deleteBookshelf = async () => {
    setLoading(true)

    const { error: bookshelfItemsError } = await supabase
      .from('bookshelf_items')
      .delete()
      .eq('bookshelf_id', id)

    const { error: bookshelfError } = await supabase
      .from('bookshelves')
      .delete()
      .eq('id', id)

    if (bookshelfItemsError || bookshelfError) setError(true)

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div>
      {loading || error ? (
        <>
          {loading ? (
            <Image alt="loading" width={60} height={60} src={loadinggif.src} />
          ) : (
            <>
              <h2 className="text-center text-xl font-bold">
                An error has occured
              </h2>

              <Button
                variant={'cta'}
                className="mt-6"
                onClick={() => {
                  location.reload()
                }}
              >
                Try again
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          {success ? (
            <>
              <h2 className="text-center text-xl font-bold">Success</h2>

              <Button
                onClick={() => {
                  router.replace('/')
                }}
                variant={'cta'}
                className="mt-6"
              >
                Go home
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-center text-xl font-bold">
                Delete this bookshelf?
              </h2>

              <p className="mt-6">Are you sure? This action is irreversible.</p>

              <Button
                onClick={deleteBookshelf}
                variant={'cta'}
                className="mt-6"
              >
                Delete
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}
