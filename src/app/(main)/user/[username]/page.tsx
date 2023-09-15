import createServerComponentClient from '@/lib/supabase-server'
import User from '../User'
import Bookshelves from '../Bookshelves'

export default async function UserPage({
  params,
}: {
  params: { username: string }
}) {
  const supabase = createServerComponentClient()

  const user_id = (await supabase.auth.getUser()).data.user?.id

  const { error: userError, data: userData } = await supabase
    .from('users')
    .select()
    .eq('username', params.username)

  if (userError) {
    throw new Error(userError.message)
  }

  if (!userData.length) {
    throw new Error(`User ${params.username} does not exist.`)
  }

  const { error: bookshelfsError, data: bookshelfsData } = await supabase
    .from('bookshelves')
    .select()
    .eq('user_id', userData?.at(0).id)

  if (bookshelfsError) {
    throw new Error(bookshelfsError.message)
  }

  const isThisMyBookshelf = userData?.at(0).id === user_id

  return (
    <div className="mx-auto h-full w-full max-w-[900px] px-containerDesktop py-10 m400:px-containerMobile">
      <User
        username={params.username}
        profilePicture={userData?.at(0)?.profilePictureUrl}
        isThisMyBookshelf={isThisMyBookshelf}
      />
      <Bookshelves
        username={params.username}
        bookshelves={bookshelfsData}
        isThisMyBookshelf={isThisMyBookshelf}
      />
    </div>
  )
}
