'use client'

import { useState } from 'react'
import logo from '../../public/logo.png'
import Button from './Button'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import defaultpfp from '../../public/defaultprofilepicture.png'
import ProfileDropdown from './ProfileDropdown'

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
    <nav>
      <div className="mx-auto flex w-container items-center justify-between px-containerDesktop py-5">
        <Button variant={'link'} href={'/'}>
          <Image src={logo} alt="logo" width={60} />
        </Button>
        <>
          {user ? (
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
                />
              )}
            </div>
          ) : (
            <Button variant={'cta'} href={'/sign-in'} className="mr-10">
              Sign in
            </Button>
          )}
        </>
      </div>
    </nav>
  )
}
