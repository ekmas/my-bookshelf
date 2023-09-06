import GuestNavbar from '@/components/GuestNavbar'
import createServerComponentClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Session } from 'inspector'

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = (await supabase.auth.getSession()) as {
    data: { session: Session | null }
  }

  if (session) {
    redirect('/')
  }

  return (
    <>
      <GuestNavbar />
      {children}
    </>
  )
}
