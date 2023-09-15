import createServerComponentClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import UpdatePasswordMain from './UpdatePasswordMain'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Update password',
}

export default async function UpdatePassword() {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <main className="mx-auto flex h-[calc(100dvh-128px)] w-full max-w-container items-center justify-center px-containerDesktop py-10 m600:h-[calc(100dvh-152px)] m500:h-[100dvh] m400:px-containerMobile">
      <UpdatePasswordMain />
    </main>
  )
}
