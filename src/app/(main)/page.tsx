import createServerComponentClient from '@/lib/supabase-server'
import IntroductionModal from './home-components/IntroductionModal'

export default async function Home() {
  const supabase = createServerComponentClient()

  let isFirstLogin: null | boolean = null

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const { data: userData } = await supabase
      .from('users')
      .select()
      .eq('id', session.user?.id)

    if (userData?.length === 0) {
      isFirstLogin = true

      let newUserData: any = {
        id: session.user?.id,
        email: session.user?.email,
      }

      if (session.user.app_metadata.provider !== 'email') {
        newUserData = {
          ...newUserData,
          profilePictureUrl: session.user.user_metadata.avatar_url,
        }
      }

      await supabase.from('users').insert(newUserData)
    } else {
      if (!userData?.at(0)?.username) {
        isFirstLogin = true
      } else {
        isFirstLogin = false
      }
    }
  }

  return (
    <main>
      <IntroductionModal isFirstLogin={isFirstLogin} />
    </main>
  )
}
