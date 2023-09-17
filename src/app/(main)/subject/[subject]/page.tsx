import Pagination from '@/components/Pagination'
import Book from '../Book'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subject',
}

export default async function Subject({
  params,
  searchParams,
}: {
  params: { subject: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const res = await fetch(
    `https://openlibrary.org/subjects/${params.subject}.json?limit=12&offset=${
      (page - 1) * 12
    }`,
    {
      method: 'GET',
    },
  )

  if (!res.ok) {
    throw new Error('There is an issue with open library api')
  }

  const books = await res.json()

  return (
    <div className="mt-8">
      {books.works.length > 0 ? (
        <div className="grid grid-cols-4 gap-5 py-6 m1000:grid-cols-3 m800:grid-cols-2 m800:py-4 m600:grid-cols-1">
          {books.works.map((book: any, index: number) => {
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

      {books.work_count > 12 * (page - 1) && books.work_count > 12 && (
        <Pagination
          numberOfPages={Math.ceil(books.work_count / 12)}
          currentPage={page}
          route={`subject/${params.subject}`}
        />
      )}
    </div>
  )
}
