'use client'

import Image from 'next/image'
import { useState } from 'react'
import logoplaceholder from '@/../public/transparentlogo.png'

export default function AuthorImage({ imageId }: { imageId: number }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <div className={isLoaded ? 'block' : 'hidden'}>
        <Image
          width={260}
          height={400}
          alt={'Author'}
          onLoadingComplete={() => {
            setIsLoaded(true)
          }}
          src={`https://covers.openlibrary.org/a/id/${imageId}-M.jpg`}
          priority
        />
      </div>
      <div className={isLoaded ? 'hidden' : 'block'}>
        <div className="flex h-[400px] items-center justify-center">
          <Image
            width={174}
            height={132}
            alt={'placeholder'}
            src={logoplaceholder.src}
            priority
          />
        </div>
      </div>
    </>
  )
}
