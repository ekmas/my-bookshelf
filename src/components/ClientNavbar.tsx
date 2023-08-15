'use client'

import React from 'react'
import logo from '../../public/logo.png'
import Button from './Button'
import createClient from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js'

export default function ClientNavbar({ session }: { session: Session | null }) {
  const supabase = createClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <nav>
      <div className="mx-auto flex w-container items-center justify-between px-containerDesktop py-5">
        <Button variant={'link'} href={'/'}>
          <img src={logo.src} width={60} alt="logo" />
        </Button>
        <div>
          {session ? (
            <Button onClick={signOut} variant={'cta'}>
              Sign out
            </Button>
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
