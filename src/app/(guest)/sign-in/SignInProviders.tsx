'use client'

import Button from '@/components/Button'
import React from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Provider } from '@supabase/supabase-js'

export default function SignInProviders() {
  const supabase = createClientComponentClient()

  const signIn = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <Button
        onClick={() => {
          signIn('google')
        }}
        className="py-4"
        variant={'cta'}
      >
        <BsGoogle className="h-6 w-6" />
      </Button>
      <Button
        onClick={() => {
          signIn('github')
        }}
        className="py-4"
        variant={'cta'}
      >
        <BsGithub className="h-6 w-6" />
      </Button>
    </div>
  )
}
