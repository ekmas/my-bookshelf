'use client'

import Image from 'next/image'

export default function Book({
  book,
  children,
}: {
  book: any
  children?: JSX.Element
}) {
  return (
    <div className="mb-[5px] flex items-center justify-between rounded-lg p-[10px] transition-colors hover:bg-[rgb(238,238,238)] dark:hover:bg-[rgb(37,37,37)]">
      <div className="flex h-[50px] w-[90%] items-center text-sm">
        {book.cover_i ? (
          <Image
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
        <div className="mx-[10px] flex min-h-full w-full flex-col justify-between">
          <p
            title={book?.title}
            className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap font-medium"
          >
            {book?.title || '/'}
          </p>
          <p
            title={book?.author_name?.at(0)}
            className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {book?.author_name?.at(0) || '/'}
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}
