'use client'
import Button from '@/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import createClient from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

type Inputs = {
  email: string
  password: string
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Inputs>()

  const supabase = createClient()
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    clearErrors()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (
        error?.message === 'Invalid login credentials' ||
        error?.message === 'Email not confirmed'
      ) {
        setError('email', {
          type: 'custom-error',
          message: error.message,
        })
      } else {
        throw new Error(error?.message)
      }
    } else {
      // router.refresh()
      location.replace(location.origin)
    }
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        className="mb-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg focus:outline-none dark:bg-darkSecondary"
        autoComplete="off"
        {...register('email', { required: 'This field is required' })}
      />

      <p className="my-[-5px] text-sm opacity-80">{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Password"
        className="my-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg focus:outline-none dark:bg-darkSecondary"
        {...register('password', { required: 'This field is required' })}
      />

      <p className="my-[-5px] text-sm opacity-80">{errors.password?.message}</p>

      <Button className="mt-3 w-full text-lg" type="submit" variant={'cta'}>
        Sign in
      </Button>

      <div className="mt-2 flex items-center justify-between">
        <Button variant={'underline'}>Forgot password?</Button>

        <Button variant={'underline'} href="/sign-up">
          Don't have an account yet?
        </Button>
      </div>
    </form>
  )
}
