import GuestNavbar from '@/components/GuestNavbar'
import createServerComponentClient from '@/lib/supabase-server'
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

  return (
    <>
      <GuestNavbar session={session} />
      {children}
    </>
  )
}
