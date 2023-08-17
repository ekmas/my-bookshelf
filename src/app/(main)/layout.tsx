import Navbar from '@/components/Navbar'
import createServerComponentClient from '@/lib/supabase-server'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  )
}
