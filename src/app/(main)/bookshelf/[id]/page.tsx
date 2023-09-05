import createServerComponentClient from '@/lib/supabase-server'
import BookshelfInfo from '../BookshelfInfo'
import Book from '../Book'

export default async function Bookshelf({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient()

  let user, books

  const { data: bookshelf, error: bookshelfError } = await supabase
    .from('bookshelves')
    .select()
    .eq('id', params.id)

  if (bookshelfError) throw new Error(bookshelfError.message)

  if (!bookshelf?.length) {
    throw new Error('This book id does not exist')
  } else {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select()
      .eq('id', bookshelf.at(0).user_id)

    if (userError) {
      throw new Error(userError.message)
    } else {
      user = {
        name: userData?.at(0).username,
        profilePicture: userData?.at(0).profilePictureUrl,
      }
    }

    const { data: booksData, error: booksError } = await supabase
      .from('bookshelf_items')
      .select()
      .eq('bookshelf_id', params.id)

    if (booksError) throw new Error(booksError.message)

    books = booksData
  }

  return (
    <main className="mx-auto h-full min-h-[calc(100dvh-108px-70px)] w-container px-containerDesktop">
      <BookshelfInfo title={bookshelf?.at(0)?.name} user={user} />
      <div className="ml-[370px] mt-5 w-[calc(100%-350px)]">
        {books.map((book, index) => {
          return <Book place={index + 1} key={book.id} book={book} />
        })}
      </div>
    </main>
  )
}
