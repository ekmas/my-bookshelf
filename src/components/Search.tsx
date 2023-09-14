'use client'

import useDebounce from '@/hooks/useDebounce'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import loadinggif from '@/../public/loadinggif.gif'
import SearchResult from './SearchResult'

export default function Search() {
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
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full justify-center">
        <div className="flex w-full items-center rounded-lg bg-secondary pl-5 dark:bg-darkSecondary">
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
            className="w-full rounded-lg bg-secondary px-5 py-4 focus:outline-none dark:bg-darkSecondary"
            placeholder="Search for books"
            autoComplete="off"
          />
        </div>

        <div
          className={clsx(
            resultsActive && searchQuery.trim().length >= 3
              ? 'visible opacity-100'
              : 'invisible opacity-0',
            'scrollbar absolute left-0 top-[70px] z-10 max-h-[300px] w-full overflow-y-auto overflow-x-hidden rounded-lg border border-black/30 bg-white p-[10px] transition-all dark:border-white/30 dark:bg-[#121212]',
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
                  <p className="py-2 text-center">
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
                    return <SearchResult key={index} book={result} />
                  })}
                </>
              ) : (
                <div className="py-2 text-center">0 results found</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
