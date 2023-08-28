'use client'

import React, { useState, forwardRef, Ref } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import placeholder from '@/../public/bookplaceholder.jpg'

const Book = forwardRef(
  ({ book }: any, ref: Ref<HTMLDivElement>): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false)

    const author = book?.authors?.at(0) || null
    const bookId = book?.key.split('/')?.at(2)
    const authorId = book?.authors?.at(0)?.key.replace('/authors/', '/author/')

    return (
      <div
        className="mx-5 flex flex-col items-center justify-center rounded-lg py-8 transition-colors hover:bg-secondaryHover dark:hover:bg-darkSecondaryHover"
        ref={ref}
      >
        <Link
          className="flex w-full flex-col items-center justify-center"
          href={`book/${bookId}`}
        >
          {book.cover_id ? (
            <>
              <div className={isLoaded ? 'block' : 'hidden'}>
                <Image
                  width={130}
                  height={200}
                  alt={book.title}
                  quality={'50'}
                  onLoadingComplete={() => {
                    setIsLoaded(true)
                  }}
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                  priority
                />
              </div>

              <div className={isLoaded ? 'hidden' : 'block'}>
                <Image
                  width={130}
                  height={200}
                  alt="placeholder"
                  src={placeholder.src}
                  priority
                />
              </div>
            </>
          ) : (
            <div className="flex h-[200px] w-[130px] items-center justify-center border border-black/10 text-black dark:border-white/10 dark:text-white">
              <p>no cover</p>
            </div>
          )}

          <h2
            title={book.title}
            className="mt-3 w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium"
          >
            {book.title}
          </h2>
        </Link>

        {author && (
          <Link
            title={author.name}
            className="mt-1.5 w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center transition-none hover:underline"
            href={authorId}
          >
            {author.name}
          </Link>
        )}
      </div>
    )
  },
)

Book.displayName = 'Book'

export default Book
