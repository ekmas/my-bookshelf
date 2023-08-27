import createServerComponentClient from '@/lib/supabase-server'
import IntroductionModal from './home-components/IntroductionModal'
import Carousels from './home-components/Carousels'

export default async function Home() {
  const supabase = createServerComponentClient()

  let isFirstLogin: null | boolean = null
  let subjects: null | string[] = null
  let notInterestedSubjects: null | string[] = null

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

        const { data: notInterestedSubs } = await supabase
          .from('notInterestedSubjects')
          .select()
          .eq('user_id', session.user.id)

        const { data: subs } = await supabase
          .from('subjects')
          .select()
          .eq('user_id', session.user.id)

        if (notInterestedSubs?.length) {
          notInterestedSubjects = notInterestedSubs?.map((item) => item.subject)
        }

        if (subs?.length) {
          subjects = subs?.map((item) => item.subject)
        }
      }
    }
  }

  return (
    <main>
      <IntroductionModal isFirstLogin={isFirstLogin} />
      <Carousels
        subjects={subjects}
        notInterestedSubjects={notInterestedSubjects}
      />
    </main>
  )
}
