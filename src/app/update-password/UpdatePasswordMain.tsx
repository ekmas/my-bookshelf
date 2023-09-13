'use client'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ModalMain from './ModalMain'

export default function UpdatePasswordMain() {
  const [error, setError] = useState(false)
  const [isModalActive, setIsModalActive] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>()

  const supabase = createClientComponentClient()

  const onSubmit: SubmitHandler<{ password: string }> = async ({
    password,
  }) => {
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      setError(true)
    }

    setIsModalActive(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-2xl font-bold">Update your password</h2>

        <div className="flex flex-col items-center justify-center">
          <input
            type="password"
            className="my-8 w-[30ch] rounded-lg bg-secondary p-2.5 text-center focus:outline-none dark:bg-darkSecondary"
            autoComplete="off"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            })}
          />

          <p className="mb-4 mt-[-16px] text-sm opacity-80">
            {errors.password?.message}
          </p>

          <Button variant={'cta'} type="submit" className="w-max">
            Submit
          </Button>
        </div>
      </form>
      <Modal
        showCloseButton={false}
        active={isModalActive}
        setActive={setIsModalActive}
      >
        <ModalMain error={error} />
      </Modal>
    </div>
  )
}
