'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  currentUsername: string
  profilePictureUrl: string
}

export default function EditProfileMain({
  currentUsername,
  profilePictureUrl,
}: Props) {
  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ username: string }>({
    defaultValues: {
      username: currentUsername,
    },
  })

  const onSubmit: SubmitHandler<{ username: string }> = async ({
    username,
  }) => {
    console.log(username)
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
          placeholder="Username"
          autoComplete="off"
          {...register('username', {
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Username should be at least 2 characters long.',
            },
            maxLength: {
              value: 20,
              message: 'Username should be shorter than 20 characters.',
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'Only letters and numbers are allowed.',
            },
            validate: async (value) => {
              const { data, error } = await supabase
                .from('users')
                .select()
                .eq('username', value)

              if (error) {
                setError('username', {
                  type: 'custom-error',
                  message: error.message,
                })
              }

              return data?.length === 0 || 'This username is already in use'
            },
          })}
        />

        <p className="mb-4 mt-[-16px] text-sm opacity-80">
          {errors.username?.message}
        </p>
      </form>
    </div>
  )
}
