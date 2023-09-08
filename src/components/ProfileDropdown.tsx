import Image from 'next/image'
import defaultpfp from '../../public/defaultprofilepicture.png'
import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { SetStateAction } from 'react'

type Props = {
  profilePicture: string
  username: string | undefined
  setIsDropdownActive: React.Dispatch<SetStateAction<boolean>>
}

export default function ProfileDropdown({
  profilePicture,
  username,
  setIsDropdownActive,
}: Props) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="absolute right-0 top-14 z-50 w-[200px] rounded-lg border border-black/50 bg-white dark:border-white/50 dark:bg-[#121212]">
      <div className="flex flex-col items-center border-0 border-b border-b-black/10 px-5 py-4 dark:border-b-white/10">
        <Image
          className="rounded-full border-2 border-black/30 dark:border-white/30"
          width={40}
          height={40}
          src={profilePicture || defaultpfp.src}
          alt="pfp"
        />

        <h4 className="mt-2 text-lg font-medium">{username}</h4>
      </div>
      <div>
        <button
          onClick={() => {
            router.push(`/user/${username}`)
            setIsDropdownActive(false)
          }}
          className="flex w-full items-center px-5 py-2 transition-colors hover:bg-whiteHover dark:hover:bg-blackHover"
        >
          <AiOutlineUser className="mr-3 h-5 w-5" />
          My profile
        </button>
        <button
          className="flex w-full items-center rounded-b-lg px-5 py-2 transition-colors hover:bg-whiteHover dark:hover:bg-blackHover"
          onClick={signOut}
        >
          <GoSignOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  )
}
