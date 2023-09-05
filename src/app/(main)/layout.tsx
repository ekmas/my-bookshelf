import Navbar from '@/components/Navbar'
import createServerComponentClient from '@/lib/supabase-server'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient()

  let isFirstLogin: null | boolean = null

  let userData: {
    username?: string
    profilePictureUrl: any
  } | null = null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data } = await supabase.from('users').select().eq('id', user.id)

    if (!data?.at(0)?.email) {
      isFirstLogin = true
      userData = {
        profilePictureUrl: user?.user_metadata?.avatar_url,
      }
    } else {
      isFirstLogin = false
      let user = data[0]
      userData = {
        username: user.username,
        profilePictureUrl: user.profilePictureUrl,
      }
    }
  }

  return (
    <>
      <Navbar user={user} isFirstLogin={isFirstLogin} userData={userData} />
      <div className="pt-[88px]">{children}</div>
    </>
  )
}
