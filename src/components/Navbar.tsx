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
      <div className="mx-auto flex w-container items-center justify-between px-containerDesktop py-5">
        <div className="w-[280px]">
          <Button variant={'link'} href={'/'}>
            <Image src={logo} alt="logo" width={60} />
          </Button>
        </div>
        <div className="w-[400px]">
          <Search />
        </div>
        <>
          {user ? (
            <div className="flex w-[280px] items-center">
              <Button className="mr-5" variant={'cta'} href={'/new-bookshelf'}>
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
                  style={{
                    backgroundImage: userData?.profilePictureUrl
                      ? `url(${userData.profilePictureUrl})`
                      : `url(${defaultpfp.src})`,
                  }}
                  className="max-w-12 h-12 max-h-12 w-12 rounded-full border-2 border-black/30 bg-cover bg-center dark:border-white/30"
                ></button>

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
            <Button variant={'cta'} href={'/sign-in'}>
              <GoSignIn className="mr-3 h-5 w-5" />
              Sign in
            </Button>
          )}
        </>
      </div>
    </nav>
  )
}
