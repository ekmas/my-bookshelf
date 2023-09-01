import createServerComponentClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import NewBookshelfMain from './NewBookshelfMain'

export default async function NewBookshelf() {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <main className="mx-auto h-full min-h-[calc(100dvh-88px-70px)] w-container px-containerDesktop py-20">
      <h2 className="text-center text-3xl font-bold">Create new bookshelf</h2>

      <NewBookshelfMain />
    </main>
  )
}
