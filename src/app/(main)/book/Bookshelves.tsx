'use client'

import clsx from 'clsx'

type Props = {
  bookshelves: any[]
  setSelectedBookshelf: React.Dispatch<React.SetStateAction<any>>
  selectedBookshelf: any
}

export default function Bookshelves({
  bookshelves,
  setSelectedBookshelf,
  selectedBookshelf,
}: Props) {
  return (
    <div className="subjects mt-6 max-h-[150px] w-[250px] overflow-auto border border-black/30 dark:border-white/30">
      {bookshelves.map((item, index) => {
        return (
          <button
            onClick={() => {
              setSelectedBookshelf(item)
            }}
            className={clsx(
              selectedBookshelf?.name === item.name
                ? 'bg-primaryHover text-white'
                : 'bg-secondary hover:bg-secondaryHover dark:bg-darkSecondary dark:hover:bg-darkSecondaryHover',
              index !== bookshelves.length - 1 && 'border-b',
              'flex w-full items-center border-b-black/30 p-3 text-left text-sm transition-colors dark:border-b-white/30',
            )}
            key={item.id}
          >
            <div className="mr-[10px] flex h-4 w-4 items-center justify-center rounded-full bg-white">
              <div
                className={clsx(
                  'h-2 w-2 rounded-full',
                  selectedBookshelf?.name === item.name
                    ? 'bg-primary'
                    : 'bg-slate-300',
                )}
              ></div>
            </div>
            <p className="w-[90%] overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.name}
            </p>
          </button>
        )
      })}
    </div>
  )
}
