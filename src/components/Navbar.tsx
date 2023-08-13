'use client'

import React from 'react'
import logo from '../../public/logo.png'
import Button from './Button'

export default function Navbar() {
  return (
    <nav>
      <div className="mx-auto flex w-container items-center justify-between px-containerDesktop py-5">
        <Button variant={'link'} href={'/'}>
          <img src={logo.src} width={60} alt="logo" />
        </Button>
        <div>
          <Button variant={'link'} href={'/sign-in'} className="mr-10">
            Sign in
          </Button>
          <Button variant={'cta'} href={'/sign-up'}>
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  )
}
