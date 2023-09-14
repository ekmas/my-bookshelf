'use client'

import { useState } from 'react'
import logo from '../../public/logo.png'
import Button from './Button'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import defaultpfp from '../../public/defaultprofilepicture.png'
import ProfileDropdown from './ProfileDropdown'
import { AiOutlinePlus } from 'react-icons/ai'
import { GoSignIn } from 'react-icons/go'
import Search from './Search'

type Props = {
  user: User | null
  isFirstLogin: null | boolean
  userData: {
    username?: string
    profilePictureUrl: any
  } | null
}

export default function Navbar({ user, isFirstLogin, userData }: Props) {
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  return (
    <nav className="fixed left-0 top-0 z-30 w-full bg-white dark:bg-[#121212]">
      <div className="mx-auto flex w-full max-w-container items-center justify-between px-containerDesktop py-5 m400:px-containerMobile">
        <div className="w-[280px] m700:mr-5 m700:w-auto m700:flex-shrink-0">
          <div className="relative h-[50px] w-[65px] overflow-hidden m500:h-[42px] m500:w-[55px]">
            <Button variant={'link'} href={'/'}>
              <Image src={logo} alt="logo" layout="fill" objectFit="cover" />
            </Button>
          </div>
        </div>

        <div className="w-[400px] m700:w-auto m500:hidden">
          <Search />
        </div>
        <div className="flex w-[280px] justify-end m700:ml-5 m700:w-auto m700:flex-shrink-0">
          {user ? (
            <div className="flex items-center ">
              <Button
                className="mr-5 m1000:hidden"
                variant={'cta'}
                href={'/new-bookshelf'}
              >
                <AiOutlinePlus className="mr-2 h-5 w-5 fill-white" />
                New bookshelf
              </Button>

              <div className="relative h-12 w-12">
                <button
                  onClick={() => {
                    setIsDropdownActive(!isDropdownActive)
                  }}
                  // button is disabled if isFirstLogin because at that moment user's username is still unset
                  disabled={isFirstLogin === true}
                  className="max-w-12 h-12 max-h-12 w-12 rounded-full"
                >
                  <Image
                    className="rounded-full border-2 border-black/30 dark:border-white/30"
                    width={48}
                    height={48}
                    src={userData?.profilePictureUrl || defaultpfp.src}
                    alt="pfp"
                  />
                </button>

                {isDropdownActive && (
                  <ProfileDropdown
                    username={userData?.username}
                    profilePicture={userData?.profilePictureUrl}
                    setIsDropdownActive={setIsDropdownActive}
                  />
                )}
              </div>
            </div>
          ) : (
            <Button className="m500:text-sm" variant={'cta'} href={'/sign-in'}>
              <GoSignIn className="mr-3 h-5 w-5 m400:hidden" />
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
