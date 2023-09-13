'use client'

import Button from '@/components/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import loadinggif from '@/../public/loadinggif.gif'

export default function ModalMain() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>()

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      setError(true)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <>
      {error || loading ? (
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
              <h2 className="text-center text-xl font-bold">
                Reset link has been sent
              </h2>

              <p className="mt-6">Please check email we've sent you.</p>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center text-xl font-bold">
                Enter your email
              </h2>

              <div className="flex flex-col items-center justify-center">
                <input
                  type="text"
                  className="my-8 w-[30ch] rounded-lg bg-secondary p-2.5 text-center focus:outline-none dark:bg-darkSecondary"
                  autoComplete="off"
                  {...register('email', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email pattern',
                    },
                  })}
                />

                <p className="mb-4 mt-[-16px] text-sm opacity-80">
                  {errors.email?.message}
                </p>

                <Button variant={'cta'} type="submit" className="w-max">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </>
      )}
    </>
  )
}
