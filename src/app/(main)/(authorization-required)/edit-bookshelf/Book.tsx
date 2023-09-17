'use client'

export default function Book({
  book,
  children,
}: {
  book: any
  children?: JSX.Element
}) {
  return (
    <div className="mb-[5px] flex items-center justify-between rounded-lg p-[10px] transition-colors hover:bg-whiteHover dark:hover:bg-blackHover">
      <div className="flex h-[50px] w-[90%] items-center text-sm">
        <div className="flex min-h-[50px] min-w-[33px] items-center justify-center m400:hidden">
          {book.cover_id ? (
            <img // eslint-disable-line
              alt=""
              width={33}
              height={50}
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
            />
          ) : (
            <div className="flex min-h-[50px] min-w-[33px] items-center justify-center border border-black/30 dark:border-white/30">
              /
            </div>
          )}
        </div>
        <div className="mx-[10px] flex min-h-full w-full flex-col justify-between m400:mx-0 m400:text-xs">
          <p
            title={book?.book_title}
            className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap font-medium m400:max-w-[90%]"
          >
            {book?.book_title || '/'}
          </p>
          <p
            title={book?.author_name}
            className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap m400:max-w-[90%]"
          >
            {book?.author_name || '/'}
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}
