import EditProfileMain from './EditProfileMain'
import createServerComponentClient from '@/lib/supabase-server'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit profile',
}

export default async function EditProfile() {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', (await supabase.auth.getUser()).data.user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <h2 className="text-center text-3xl font-bold m800:text-2xl">
        Edit profile
      </h2>

      <EditProfileMain
        currentUsername={data?.at(0).username}
        currentprofilePictureUrl={data?.at(0).profilePictureUrl}
      />
    </div>
  )
}
