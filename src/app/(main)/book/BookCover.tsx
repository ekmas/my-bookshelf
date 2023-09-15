'use client'

import Image from 'next/image'
import { useState } from 'react'
import logoplaceholder from '@/../public/transparentlogo.png'
import clsx from 'clsx'

export default function BookCover({ bookId }: { bookId: any }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <div
        className={clsx(
          'relative aspect-[1.2/2] h-full max-w-[260px]',
          isLoaded ? 'block h-full' : 'hidden',
        )}
      >
        <Image
          alt={'Book cover'}
          fill
          sizes="(max-width: 1000px) 200px, (max-width: 500px) 150px, 260px"
          onLoadingComplete={() => {
            setIsLoaded(true)
          }}
          src={`https://covers.openlibrary.org/b/id/${bookId}-L.jpg`}
          priority
        />
      </div>
      <div className={isLoaded ? 'hidden' : 'block'}>
        <div className="flex h-full items-center justify-center">
          <div className="relative aspect-[1.32/1] h-[150px] max-w-[172px] m1000:h-[90px]">
            <Image
              fill
              sizes="(max-width: 1000px) 130px, 172px"
              alt={'placeholder'}
              src={logoplaceholder.src}
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}
