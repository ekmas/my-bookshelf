'use client'

import React, { useState, forwardRef, Ref } from 'react'
import Link from 'next/link'
import placeholder from '@/../public/bookplaceholder.jpg'
import clsx from 'clsx'

const Book = forwardRef(
  ({ book }: any, ref: Ref<HTMLDivElement>): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false)

    const author = book?.authors?.at(0) || null
    const bookId = book?.key.split('/')?.at(2)
    const authorId = book?.authors?.at(0)?.key.replace('/authors/', '/author/')

    return (
      <div
        className="mx-5 flex h-[350px] flex-col items-center justify-center rounded-lg py-8 transition-colors hover:bg-secondaryHover dark:hover:bg-darkSecondaryHover m400:mx-10 m400:h-[250px] m400:py-5"
        ref={ref}
      >
        <Link
          className="flex h-full w-full flex-col items-center justify-center"
          href={`book/${bookId}`}
        >
          {book.cover_id ? (
            <>
              <div
                className={clsx(
                  'relative flex aspect-[1.2/2] h-full max-w-[130px] items-center justify-center',
                  isLoaded ? 'block h-full' : 'hidden',
                )}
              >
                <img // eslint-disable-line
                  alt={book.title}
                  sizes="(max-width: 400px) 100px, 130px"
                  onLoad={() => {
                    setIsLoaded(true)
                  }}
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                />
              </div>

              <div
                className={clsx(
                  'relative aspect-[1.3/2] max-w-[130px]',
                  isLoaded ? 'hidden' : 'block h-full',
                )}
              >
                <img // eslint-disable-line
                  sizes="(max-width: 400px) 100px, 130px"
                  alt="placeholder"
                  src={placeholder.src}
                />
              </div>
            </>
          ) : (
            <div className="flex h-[225px] w-[130px] items-center justify-center border border-black/10 text-black dark:border-white/10 dark:text-white m400:h-[157px] m400:w-[94px]">
              <p>no cover</p>
            </div>
          )}

          <h2
            title={book.title}
            className="mt-3 w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium m400:w-[70%] m400:text-sm"
          >
            {book.title}
          </h2>
        </Link>

        {author && (
          <Link
            title={author.name}
            className="mt-1.5 w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center opacity-90 transition-none hover:underline m400:w-[70%] m400:text-sm"
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
