import createServerComponentClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import EditBookshelfMain from '../EditBookshelfMain'

export default async function EditBookshelf({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient()

  const { data: bookshelf, error: bookshelfError } = await supabase
    .from('bookshelves')
    .select()
    .eq('id', params.id)

  if (bookshelfError) {
    throw new Error(bookshelfError.message)
  } else {
    if (
      !bookshelf.length ||
      bookshelf?.at(0).user_id !== (await supabase.auth.getUser()).data.user?.id
    ) {
      redirect('/')
    }
  }

  const { data: booksData, error: booksError } = await supabase
    .from('bookshelf_items')
    .select()
    .eq('bookshelf_id', params.id)

  if (booksError) throw new Error(booksError.message)

  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <h2 className="text-center text-3xl font-bold m500:text-xl">
        Edit bookshelf
      </h2>

      <EditBookshelfMain
        currentBookshelfName={bookshelf?.at(0)?.name}
        currentBooks={booksData}
      />
    </div>
  )
}
