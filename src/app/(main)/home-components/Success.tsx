import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Button from '@/components/Button'
import loadinggif from '@/../public/loadinggif.gif'

type Props = {
  username: string
  subjects: string[]
}

export default function Success({ username, subjects }: Props) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const supabase = createClientComponentClient()

  const updateUser = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id

    const userSubjects = subjects.map((subject) => {
      return {
        user_id: userId,
        subject: subject,
      }
    })

    const { error: usernameError } = await supabase
      .from('users')
      .update({ username: username })
      .eq('id', userId)

    const { error: subjectsError } = await supabase
      .from('subjects')
      .insert(userSubjects)

    if (usernameError || subjectsError) {
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
            <div className="flex items-center justify-center">
              <img // eslint-disable-line
                alt="loading"
                width={60}
                height={60}
                src={loadinggif.src}
              />
            </div>
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
