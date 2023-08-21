import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Button from '@/components/Button'

type Props = {
  username: string
  subjects: string[]
}

export default function Success({ username, subjects }: Props) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const supabase = createClientComponentClient()

  const updateUser = async () => {
    const { error } = await supabase
      .from('users')
      .update({ username: username, subjects: subjects })
      .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    updateUser()
  }, [])

  return (
    <div>
      {error && !loading ? (
        <>
          <h2 className="text-center text-xl font-bold">
            An error has occured.
          </h2>

          <Button
            className="mt-6"
            onClick={() => [location.reload()]}
            variant={'cta'}
          >
            Refresh
          </Button>
        </>
      ) : (
        <>
          {loading ? (
            'loading...'
          ) : (
            <>
              <h2 className="text-center text-xl font-bold">
                You successfully updated your profile.{' '}
              </h2>

              <Button
                className="mt-6"
                onClick={() => [location.reload()]}
                variant={'cta'}
              >
                Refresh
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}
