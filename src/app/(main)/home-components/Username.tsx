import Button from '@/components/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setActiveSection: React.Dispatch<
    React.SetStateAction<'username' | 'subjects' | 'success'>
  >
}

export default function Username({
  username,
  setUsername,
  setActiveSection,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
    setError,
  } = useForm<{ username: string }>({
    defaultValues: {
      username: username,
    },
  })

  useEffect(() => {
    reset({ username }, { keepDefaultValues: false })
    setFocus('username')
  }, [username])

  const supabase = createClientComponentClient()

  const onSubmit: SubmitHandler<{ username: string }> = async ({
    username,
  }) => {
    setUsername(username)
    setActiveSection('subjects')
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-xl font-bold">Set your username</h2>

        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            className="my-8 w-[30ch] rounded-lg bg-secondary p-2.5 text-center focus:outline-none dark:bg-darkSecondary m450:w-[25ch] m450:text-sm m350:w-[20ch]"
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

          <Button variant={'cta'} type="submit" className="w-max">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
