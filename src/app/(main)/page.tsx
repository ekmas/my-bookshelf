import createClient from '@/lib/supabase-server'

export default async function Home() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const { data: userData } = await supabase
      .from('users')
      .select()
      .eq('id', session.user?.id)

    if (userData?.length === 0) {
      await supabase
        .from('users')
        .insert({ id: session.user?.id, email: session.user?.email })
    }
  }

  return <main></main>
}
