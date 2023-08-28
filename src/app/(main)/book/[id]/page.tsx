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

  const allAvailableSubjects = allSubjects.reduce((acc: string[], category) => {
    acc.push(...category.subjects)
    return acc
  }, [])

  const bookSubjects = bookData?.subjects.map((subject: string) =>
    subject.toLowerCase(),
  )

  const mutualSubjects = bookSubjects.filter((subject: string) =>
    allAvailableSubjects.includes(subject),
  )

  // we will only show subjects if they exists both in subjects.json and bookSubjects
  // because there is a lot of undocumented subjects in open library

  return (
    <main className="mx-auto h-full min-h-[calc(100dvh-88px-70px)] w-container px-containerDesktop py-20">
      <div className="grid h-min w-full grid-cols-[1fr_2fr] gap-10">
        <div className="flex justify-center rounded-lg border border-black/10 py-5 dark:border-white/10">
          {bookData?.covers?.at(0) ? (
            <BookCover bookId={bookData.covers.at(0)} />
          ) : (
            <div className="flex h-[400px] w-[260px] items-center justify-center text-black dark:text-white">
              <p>no cover</p>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold">{bookData?.title}</h1>

          <Link
            title={author?.name}
            className="mt-4 inline-block w-max text-xl transition-none hover:underline"
            href={authorId}
          >
            {authorName || 'Author'}
          </Link>

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

          <div className="mt-7">
            {session ? (
              <AddBookButton />
            ) : (
              <p>Please sign in, in order to add books to your bookshelves.</p>
            )}
          </div>
        </div>
      </div>
      {typeof bookData?.description === 'string' && (
        <div className="mt-8">
          <h4 className="mb-3 text-2xl font-bold">Description</h4>
          <div className="text-lg">{bookData.description}</div>
        </div>
      )}
    </main>
  )
}