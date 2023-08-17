'use client'
import Button from '@/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import Modal from './Modal'

type Inputs = {
  email: string
  password: string
  repeatPassword: string
}

export default function SignUpForm() {
  const [isModalActive, setIsModalActive] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const supabase = createClientComponentClient()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    const id = data?.user?.id
    const { error: insertRowError } = await supabase
      .from('users')
      .insert({ id, email })

    if (signUpError || insertRowError) {
      throw new Error(signUpError?.message || insertRowError?.message)
    }

    if (!signUpError && !insertRowError) {
      setIsModalActive(true)
    }
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        className="mb-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg focus:outline-none dark:bg-darkSecondary"
        autoComplete="off"
        {...register('email', {
          required: 'This field is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email pattern',
          },
          validate: async (value) => {
            const { data } = await supabase
              .from('users')
              .select()
              .eq('email', value)

            return data?.length === 0 || 'This email is already in use'
          },
        })}
      />

      <p className="my-[-5px] text-sm opacity-80">{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Password"
        className="my-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg focus:outline-none dark:bg-darkSecondary"
        {...register('password', {
          required: 'This field is required',
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
          },
        })}
      />

      <p className="my-[-5px] text-sm opacity-80">{errors.password?.message}</p>

      <input
        type="password"
        placeholder="Repeat password"
        className="my-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg focus:outline-none dark:bg-darkSecondary"
        {...register('repeatPassword', {
          required: 'This field is required',
          validate: (value, formValues) =>
            value === formValues.password || 'Passwords do not match',
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
          },
        })}
      />

      <p className="my-[-5px] text-sm opacity-80">
        {errors.repeatPassword?.message}
      </p>

      <Button className="mt-3 w-full text-lg" type="submit" variant={'cta'}>
        Sign in
      </Button>

      <div className="mt-2 flex items-center justify-center">
        <Button variant={'underline'} href="/sign-in">
          Already have an account?
        </Button>
      </div>

      <Modal active={isModalActive} setActive={setIsModalActive} />
    </form>
  )
}
