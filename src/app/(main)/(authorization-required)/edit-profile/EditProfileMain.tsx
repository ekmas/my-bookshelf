'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfilePicture from './ProfilePicture'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal'
import ModalMain from './ModalMain'

type Props = {
  currentUsername: string
  currentprofilePictureUrl: string
}

export default function EditProfileMain({
  currentUsername,
  currentprofilePictureUrl,
}: Props) {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    currentprofilePictureUrl,
  )
  const [err, setErr] = useState(false)
  const [isModalActive, setIsModalActive] = useState(false)

  const supabase = createClientComponentClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<{ username: string }>({
    defaultValues: {
      username: currentUsername,
    },
  })

  const onSubmit: SubmitHandler<{ username: string }> = async ({
    username,
  }) => {
    if (
      username === currentUsername &&
      profilePictureUrl === currentprofilePictureUrl
    ) {
      router.push(`/user/${currentUsername}`)
    } else {
      const { error } = await supabase
        .from('users')
        .update({ username: username, profilePictureUrl: profilePictureUrl })
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

      if (error) setErr(true)
    }

    setIsModalActive(true)
  }

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[600px] flex-col items-center justify-center m600:mt-5">
      <ProfilePicture
        currentprofilePictureUrl={currentprofilePictureUrl}
        setProfilePictureUrl={setProfilePictureUrl}
        setErr={setErr}
      />

      <form
        className="flex w-full flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="mb-6 mt-5 w-[30ch] rounded-lg bg-secondary px-5 py-4 focus:outline-none dark:bg-darkSecondary m600:mb-4 m600:mt-3 m600:text-sm"
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
              if (value !== currentUsername) {
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
              }
            },
          })}
        />

        <p className="mb-4 mt-[-16px] text-center text-sm opacity-80 m600:mt-[-12px]">
          {errors.username?.message}
        </p>

        <Button
          type="submit"
          className="mt-5 w-max m600:text-sm"
          variant={'cta'}
        >
          Update
        </Button>
      </form>

      <Modal
        showCloseButton={false}
        active={isModalActive}
        setActive={setIsModalActive}
      >
        <ModalMain username={getValues('username')} error={err} />
      </Modal>
    </div>
  )
}
