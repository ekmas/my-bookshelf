'use client'

import Link from 'next/link'

export default function SearchResult({ book }: { book: any }) {
  const bookId = book?.key.split('/')?.at(2)

  return (
    <Link
      href={`/book/${bookId}`}
      className="mb-[5px] flex items-center justify-between rounded-lg p-[10px] transition-colors hover:bg-whiteHover dark:hover:bg-blackHover"
    >
      <div className="flex h-[50px] w-[80%] items-center text-sm">
        <div className="min-h-[50px] min-w-[33px] m400:hidden">
          {book.cover_i ? (
            <img // eslint-disable-line
              alt=""
              width={33}
              height={50}
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
            />
          ) : (
            <div className="flex min-h-[50px] min-w-[33px] items-center justify-center border border-black/30 dark:border-white/30">
              /
            </div>
          )}
        </div>
        <div className="mx-[10px] flex min-h-full w-full flex-col justify-between">
          <p
            title={book?.title}
            className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap font-medium"
          >
            {book?.title || '/'}
          </p>
          <p
            title={book?.author_name?.at(0)}
            className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {book?.author_name?.at(0) || '/'}
          </p>
        </div>
      </div>
    </Link>
  )
}
