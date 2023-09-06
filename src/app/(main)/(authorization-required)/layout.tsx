import createServerComponentClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Session } from 'inspector'

export default async function AuthorizationRequiredLayout({
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

  if (!session) {
    redirect('/')
  }

  return <>{children}</>
}
