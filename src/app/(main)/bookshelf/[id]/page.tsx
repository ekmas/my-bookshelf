import createServerComponentClient from '@/lib/supabase-server'
import BookshelfInfo from '../BookshelfInfo'

export default async function Bookshelf({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient()
  const { data: bookshelf, error: bookshelfError } = await supabase
    .from('bookshelves')
    .select()
    .eq('id', params.id)

  const { data: user, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', bookshelf?.at(0).user_id)

  const { data: books, error: booksError } = await supabase
    .from('bookshelf_items')
    .select()
    .eq('bookshelf_id', params.id)

  if (bookshelfError || userError || booksError) {
    throw new Error(
      bookshelfError?.message || userError?.message || booksError?.message,
    )
  }

  return (
    <main className="mx-auto h-full min-h-[calc(100dvh-88px-70px)] w-container px-containerDesktop py-10">
      <div>
        <BookshelfInfo
          title={bookshelf?.at(0)?.name}
          user={{
            name: user?.at(0).username,
            profilePicture: user?.at(0).profilePictureUrl,
          }}
        />
        <div className="ml-[350px] w-[full-350px]"></div>
      </div>
    </main>
  )
}
