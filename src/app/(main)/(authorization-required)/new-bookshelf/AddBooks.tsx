'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import loadinggif from '@/../public/loadinggif.gif'
import Image from 'next/image'
import useDebounce from '@/hooks/useDebounce'
import Book from './Book'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import Button from '@/components/Button'

type Props = {
  books: any[]
  setBooks: React.Dispatch<React.SetStateAction<any[]>>
}

export default function AddBooks({ books, setBooks }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [results, setResults] = useState([])
  const [resultsActive, setResultsActive] = useState(true)

  const debouncedSearch = useDebounce(searchQuery, 1000)

  const search = () => {
    setLoading(true)
    fetch(`https://openlibrary.org/search.json?title=${searchQuery}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.docs)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  useEffect(() => {
    if (debouncedSearch && searchQuery.trim().length >= 3) search()
  }, [debouncedSearch])

  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <div className="relative flex w-full justify-center">
        <div className="mb-5 flex w-full items-center rounded-lg bg-secondary pl-5 dark:bg-darkSecondary">
          <AiOutlineSearch className="h-6 w-6 opacity-50" />
          <input
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setLoading(true)
            }}
            onFocus={() => {
              setResultsActive(true)
            }}
            onBlur={() => {
              setResultsActive(false)
            }}
            type="text"
            className="w-full rounded-lg bg-secondary px-5 py-4 focus:outline-none dark:bg-darkSecondary m500:text-sm"
            placeholder="Search for books"
            autoComplete="off"
          />
        </div>

        <div
          className={clsx(
            resultsActive && searchQuery.trim().length >= 3
              ? 'visible opacity-100'
              : 'invisible opacity-0',
            'scrollbar absolute left-0 top-[70px] z-10 max-h-[200px] w-full overflow-y-auto rounded-lg border border-black/30 bg-white p-[10px] transition-all dark:border-white/30 dark:bg-[#121212]',
          )}
        >
          {loading || error ? (
            <div className="flex justify-center">
              <>
                {loading ? (
                  <Image
                    alt="loading"
                    width={40}
                    height={40}
                    src={loadinggif.src}
                  />
                ) : (
                  <p className="py-2 text-center m500:text-sm">
                    An error has occured, please try again.
                  </p>
                )}
              </>
            </div>
          ) : (
            <>
              {results.length ? (
                <>
                  {results.map((result, index) => {
                    return (
                      <Book book={result} key={index}>
                        <Button
                          onClick={() => {
                            setBooks((books) => [...books, result])
                          }}
                          size={'sm'}
                          variant={'cta'}
                          type="button"
                          className="m400:px-2 m400:py-2"
                        >
                          <span className="m400:hidden">Add</span>
                          <AiOutlinePlus className="hidden h-4 w-4 m400:inline" />
                        </Button>
                      </Book>
                    )
                  })}
                </>
              ) : (
                <div className="py-2 text-center m500:text-sm">
                  0 results found
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="scrollbar h-[300px] w-full overflow-y-auto overflow-x-hidden rounded-lg border border-black/30 p-[10px] dark:border-white/30">
        {books.length ? (
          <div className="w-full">
            {books.map((book, index) => {
              return (
                <Book book={book} key={index}>
                  <Button
                    onClick={() => {
                      setBooks((oldBooks) =>
                        oldBooks.filter((item) => item !== book),
                      )
                    }}
                    className="p-2"
                    variant={'cta'}
                    type="button"
                  >
                    <IoMdClose />
                  </Button>
                </Book>
              )
            })}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-5 text-center m500:text-sm">
            Search for books and when you add them, they will appear here.
          </div>
        )}
      </div>
    </div>
  )
}
