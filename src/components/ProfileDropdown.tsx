import Image from 'next/image'
import defaultpfp from '../../public/defaultprofilepicture.png'
import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
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
    <div className="absolute right-0 top-[68px] z-50 min-w-[200px] rounded-lg border border-black/50 bg-white dark:border-white/50 dark:bg-[#121212]">
      <div className="flex flex-col items-center border-0 border-b border-b-black/10 px-5 py-4 dark:border-b-white/10">
        <div className="relative aspect-square h-10 max-w-[40px] overflow-hidden m500:h-8 m500:w-8 m500:max-w-[32px]">
          <Image
            className="rounded-full border-2 border-black/30 dark:border-white/30"
            src={profilePicture || defaultpfp.src}
            sizes='sizes="(max-width: 500px) 32px, 40px"'
            alt="pfp"
            fill
          />
        </div>

        <h4 className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg font-medium m500:w-[12ch] m500:text-base">
          {username}
        </h4>
      </div>
      <div>
        <button
          onClick={() => {
            router.push(`/user/${username}`)
            setIsDropdownActive(false)
          }}
          className="flex w-full items-center px-5 py-2 transition-colors hover:bg-whiteHover dark:hover:bg-blackHover m500:text-sm"
        >
          <AiOutlineUser className="mr-3 h-5 w-5 m500:h-4 m500:w-4" />
          My profile
        </button>
        <button
          onClick={() => {
            router.push('/new-bookshelf')
            setIsDropdownActive(false)
          }}
          className="hidden w-full items-center px-5 py-2 transition-colors hover:bg-whiteHover dark:hover:bg-blackHover m1000:flex m500:text-sm"
        >
          <AiOutlinePlus className="mr-3 h-5 w-5 m500:h-4 m500:w-4" />
          New bookshelf
        </button>
        <button
          className="flex w-full items-center rounded-b-lg px-5 py-2 transition-colors hover:bg-whiteHover dark:hover:bg-blackHover m500:text-sm"
          onClick={signOut}
        >
          <GoSignOut className="mr-3 h-5 w-5 m500:h-4 m500:w-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}
