import Bookshelf from './Bookshelf'

type Props = {
  bookshelves: any[] | null
  isThisMyBookshelf: boolean
  username: string
}

export default function Bookshelves({
  bookshelves,
  isThisMyBookshelf,
  username,
}: Props) {
  return (
    <div className="mt-10">
      {bookshelves?.length ? (
        <div className="grid grid-cols-3 gap-5">
          {bookshelves.map((bookshelf) => {
            return (
              <Bookshelf
                key={bookshelf.id}
                bookshelf={bookshelf}
                isThisMyBookshelf={isThisMyBookshelf}
              />
            )
          })}
        </div>
      ) : (
        <div className="flex h-[100px] w-full items-center justify-center">
          <p>
            {isThisMyBookshelf
              ? "You don't have any bookshelf yet."
              : `${username} don't have any bookshelf yet.`}
          </p>
        </div>
      )}
    </div>
  )
}
