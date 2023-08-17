'use client'

import React from 'react'
import logo from '../../public/logo.png'
import Button from './Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'

export default function ClientNavbar({ user }: { user: User | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <nav>
      <div className="mx-auto flex w-container items-center justify-between px-containerDesktop py-5">
        <Button variant={'link'} href={'/'}>
          <Image src={logo} alt="logo" width={60} />
        </Button>
        <div>
          {user ? (
            <>
              <p>{user.email}</p>
              <Button onClick={signOut} variant={'cta'}>
                Sign out
              </Button>
            </>
          ) : (
            <Button variant={'cta'} href={'/sign-in'} className="mr-10">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
