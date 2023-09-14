'use client'
import Button from '@/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Modal from '@/components/Modal'
import { useState } from 'react'
import ModalMain from './ModalMain'

type Inputs = {
  email: string
  password: string
}

export default function SignInForm() {
  const [isForgotPasswordModal, setIsForgotPasswordModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Inputs>()

  const supabase = createClientComponentClient()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    clearErrors()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('email', {
        type: 'custom-error',
        message: error.message,
      })
    } else {
      location.replace(location.origin)
    }
  }

  return (
    <>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg m550:text-base focus:outline-none dark:bg-darkSecondary"
          autoComplete="off"
          {...register('email', { required: 'This field is required' })}
        />

        <p className="my-[-5px] text-sm opacity-80">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          className="my-3 w-full rounded-lg bg-secondary px-5 py-4 text-lg m550:text-base focus:outline-none dark:bg-darkSecondary"
          {...register('password', { required: 'This field is required' })}
        />

        <p className="my-[-5px] text-sm opacity-80">
          {errors.password?.message}
        </p>

        <Button className="mt-3 w-full text-lg m550:text-base" type="submit" variant={'cta'}>
          Sign in
        </Button>

        <div className="mt-2 flex items-center m400:flex-col m400:gap-2 m550:text-sm justify-between">
          <Button
            onClick={() => setIsForgotPasswordModal(true)}
            type="button"
            variant={'underline'}
          >
            Forgot password?
          </Button>

          <Button variant={'underline'} href="/sign-up">
            Don't have an account yet?
          </Button>
        </div>
      </form>
      <Modal
        active={isForgotPasswordModal}
        setActive={setIsForgotPasswordModal}
      >
        <ModalMain />
      </Modal>
    </>
  )
}
