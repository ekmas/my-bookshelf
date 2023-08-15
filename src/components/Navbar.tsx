import React from 'react'
import createClient from '@/lib/supabase-server'
import ClientNavbar from './ClientNavbar'

export default async function Navbar() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <ClientNavbar session={session} />
}
