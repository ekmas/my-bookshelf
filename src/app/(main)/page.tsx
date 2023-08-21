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

      await supabase
        .from('users')
        .insert({ id: session.user?.id, email: session.user?.email })
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
