import createServerComponentClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import UpdatePasswordMain from './UpdatePasswordMain'

export default async function UpdatePassword() {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <main className="mx-auto flex h-[calc(100dvh-128px)] w-container items-center justify-center px-containerDesktop py-10">
      <UpdatePasswordMain />
    </main>
  )
}
