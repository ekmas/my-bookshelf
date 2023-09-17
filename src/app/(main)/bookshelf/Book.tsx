import Link from 'next/link'

export default function Book({
  book,
  place,
}: {
  book: {
    book_id: string
    cover_id: number
    book_title: string
    author_name: string
    author_id: string
  }
  place: number
}) {
  return (
    <div className="mb-[5px] flex items-center rounded-lg p-[10px] px-5 outline outline-1 outline-black/10 transition-colors hover:bg-whiteHover dark:outline-white/10 dark:hover:bg-blackHover m900:text-sm m500:text-xs">
      <p className="w-[3ch]">{place}</p>

      <div className="flex w-[150px] items-center justify-center m400:hidden">
        {book?.cover_id ? (
          <img // eslint-disable-line
            alt="book cover"
            width={33}
            height={50}
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
          />
        ) : (
          <div className="flex h-[50px] w-[33px] shrink-0 flex-grow-0 items-center justify-center border border-black/10 dark:border-white/10">
            /
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-2">
        <Link
          className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap font-medium hover:underline"
          href={`/book/${book.book_id}`}
        >
          {book.book_title}
        </Link>

        {book.author_name ? (
          <Link
            className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
            href={`/author/${book.author_id}`}
          >
            {book.author_name}
          </Link>
        ) : (
          <p>Unknown artist</p>
        )}
      </div>
    </div>
  )
}
