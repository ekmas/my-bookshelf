import Link from 'next/link'
import allSubjects from '@/data/subjects.json'
import BookCover from '../BookCover'
import AddBookButton from '../AddBookButton'
import createServerComponentClient from '@/lib/supabase-server'

export default async function Book({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const bookDataRes = await fetch(
    `https://openlibrary.org/works/${params.id}.json`,
    {
      method: 'GET',
    },
  )

  if (!bookDataRes.ok) {
    if (bookDataRes.statusText === 'Not Found') {
      throw new Error("This book id doesn't exist")
    } else {
      throw new Error('There is an issue with open library api')
    }
  }

  const bookData = await bookDataRes.json()

  const author = bookData?.authors?.at(0) || null
  const authorId = bookData?.authors
    ?.at(0)
    ?.author?.key.replace('/authors/', '/author/')

  let authorName

  if (bookData?.authors?.at(0)) {
    const authorDataRes = await fetch(
      `https://openlibrary.org/${authorId}.json`,
      {
        method: 'GET',
      },
    )

    if (!authorDataRes.ok) {
      throw new Error('There is an issue with open library api')
    }

    const authorData = await authorDataRes.json()
    authorName = authorData?.name
  }

  let bookInfo = {
    book_title: bookData?.title,
    cover_id: bookData?.covers?.at(0),
    author_name: authorName,
    author_id: authorId?.split('/')?.at(2),
  }

  const allAvailableSubjects = allSubjects.reduce((acc: string[], category) => {
    acc.push(...category.subjects)
    return acc
  }, [])

  const bookSubjects = bookData?.subjects?.map((subject: string) =>
    subject.toLowerCase(),
  )

  const mutualSubjects = bookSubjects?.filter((subject: string) =>
    allAvailableSubjects.includes(subject),
  )

  // we will only show subjects if they exists both in subjects.json and bookSubjects
  // because there is a lot of undocumented subjects in open library

  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <div className="grid h-min w-full grid-cols-[1fr_2fr] gap-10 m700:gap-5 m650:grid-cols-1">
        <div className="flex h-[400px] justify-center rounded-lg border border-black/10 py-5 dark:border-white/10 m1000:h-[300px] m500:h-[200px]">
          {bookData?.covers?.at(0) ? (
            <BookCover bookId={bookData.covers.at(0)} />
          ) : (
            <div className="flex h-[358px] w-[215px] items-center justify-center text-black dark:text-white m1000:h-full">
              <p>no cover</p>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold m900:text-2xl m500:text-xl">
            {bookData?.title}
          </h1>

          {authorId ? (
            <Link
              title={author?.name}
              className="mt-4 inline-block w-max text-xl transition-none hover:underline m900:text-lg"
              href={authorId}
            >
              {authorName || 'Author'}
            </Link>
          ) : (
            <p className="mt-4 inline-block w-max text-xl">Unknown artist</p>
          )}

          {mutualSubjects?.length > 0 && (
            <div className="mt-4 flex flex-wrap">
              {mutualSubjects.map((item: string) => {
                return (
                  <Link
                    className="m-0.5 rounded-md border border-black/50 px-1.5 py-0.5 text-sm transition-all hover:bg-primary hover:text-white dark:border-white/50"
                    href={`/subject/${item}`}
                    key={item}
                  >
                    {item}
                  </Link>
                )
              })}
            </div>
          )}

          <div className="mt-7">
            {session ? (
              <AddBookButton bookInfo={bookInfo} />
            ) : (
              <p>Please sign in, in order to add books to your bookshelves.</p>
            )}
          </div>
        </div>
      </div>
      {typeof bookData?.description === 'string' && (
        <div className="mt-8">
          <h4 className="mb-3 text-2xl font-bold m900:text-lg">Description</h4>
          <div className="break-all text-lg m900:text-base">
            {bookData.description}
          </div>
        </div>
      )}
    </div>
  )
}
