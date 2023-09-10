'use client'

import { SetStateAction, useState } from 'react'
import defaultpfp from '@/../public/defaultprofilepicture.png'
import Button from '@/components/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
  currentprofilePictureUrl: string | null
  setProfilePictureUrl: React.Dispatch<SetStateAction<string | null>>
  setErr: React.Dispatch<SetStateAction<boolean>>
}

export default function ProfilePicture({
  currentprofilePictureUrl,
  setProfilePictureUrl,
  setErr,
}: Props) {
  const supabase = createClientComponentClient()

  const currentPfp = currentprofilePictureUrl
    ? currentprofilePictureUrl
    : defaultpfp.src

  const [pfp, setPfp] = useState(currentPfp)

  const onImageUpload = async (event: any) => {
    const allowedFormats = ['image/png', 'image/gif', 'image/jpeg']

    if (
      event.target.files[0] &&
      allowedFormats.includes(event.target.files[0].type) &&
      event.target.files[0].size <= 2 * 1024 * 1024
    ) {
      setPfp(URL.createObjectURL(event.target.files[0]))

      const filePath =
        (await supabase.auth.getUser()).data.user?.id +
        '/' +
        crypto.randomUUID()

      const { error } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, event.target.files[0])

      if (error) setErr(true)

      const { data: publicUrl } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath)

      setProfilePictureUrl(publicUrl.publicUrl)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div
        style={{ backgroundImage: `url(${pfp})` }}
        className="h-[150px] w-[150px] rounded-full bg-cover bg-center bg-no-repeat"
      ></div>

      <p className="mt-2 text-sm opacity-80">
        Please choose an image that has same width and height and is below 2MB
      </p>

      <input
        type="file"
        id="profile-picture"
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={onImageUpload}
      />

      <div className="mt-5 flex items-center">
        <label
          className="mr-3 cursor-pointer rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primaryHover"
          htmlFor="profile-picture"
        >
          Upload image
        </label>

        {pfp !== currentPfp && (
          <Button
            className="ml-3"
            onClick={() => setPfp(currentPfp)}
            variant={'cta'}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
