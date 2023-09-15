import Book from '../Book'
import Pagination from '@/components/Pagination'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Author',
}

export default async function Author({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const res = await fetch(
    `https://openlibrary.org/authors/${params.id}/works.json?limit=24&offset=${
      (page - 1) * 24
    }`,
    {
      method: 'GET',
    },
  )

  if (!res.ok) {
    throw new Error('There is an issue with open library api')
  }

  const authorBooks = await res.json()

  return (
    <>
      <div className="mt-8">
        <h4 className="mb-5 text-2xl font-bold m900:text-lg">Books</h4>

        {authorBooks.entries.length > 0 ? (
          <div className="grid grid-cols-4 gap-5 py-6 m1000:grid-cols-3 m800:grid-cols-2 m800:py-4 m600:grid-cols-1">
            {authorBooks.entries.map((book: any, index: number) => {
              return <Book key={index} book={book} />
            })}
          </div>
        ) : (
          <p className="my-6">
            {page > 1
              ? "There's no more books."
              : "Unfortunately we didn't find any books."}
          </p>
        )}

        {authorBooks.size > 24 * (page - 1) && authorBooks.size > 24 && (
          <Pagination
            numberOfPages={Math.ceil(authorBooks.size / 24)}
            currentPage={page}
            route={`author/${params.id}`}
          />
        )}
      </div>
    </>
  )
}
