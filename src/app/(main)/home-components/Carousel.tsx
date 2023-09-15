'use client'

import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import { Arrow } from '@egjs/flicking-plugins'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Button from '@/components/Button'
import Book from './Book'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import useWindowWidth from '@/hooks/useWindowWidth'
import clsx from 'clsx'

type Props = {
  data: any
  isRecommended: boolean | undefined
  subjectName: string
}

export default function Carousel({ data, isRecommended, subjectName }: Props) {
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth > 800) {
      setPanelsCount(4)
    } else if (windowWidth > 700) {
      setPanelsCount(2)
    } else {
      setPanelsCount(1)
    }
  }, [windowWidth])

  const [isHidden, setIsHidden] = useState(false)
  const [panelsCount, setPanelsCount] = useState(4)

  const supabase = createClientComponentClient()

  const handleSubject = async (action: 'hide' | 'show') => {
    const userId = (await supabase.auth.getUser()).data.user?.id

    if (action === 'hide') {
      const { error } = await supabase.from('not_interested_subjects').insert({
        user_id: userId,
        subject: subjectName.toLowerCase(),
      })
      if (!error) setIsHidden(true)
    } else {
      const { error } = await supabase
        .from('not_interested_subjects')
        .delete()
        .eq('subject', subjectName.toLowerCase())
      if (!error) setIsHidden(false)
    }
  }

  const plugins = [new Arrow()]

  return (
    <>
      {!isHidden ? (
        <>
          <div className="flex items-center justify-between p-6 m500:flex-col">
            <h2 className="max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold m900:text-xl m700:text-lg">
              {isRecommended && (
                <span className="m800:hidden">You might be interested in </span>
              )}
              <Link
                className="transition-none hover:underline"
                href={`/subject/${subjectName.toLowerCase()}`}
              >
                {subjectName}
              </Link>
            </h2>

            {isRecommended && (
              <Button
                className="flex-shrink-0 border border-black/10 dark:border-white/10 m500:mt-2.5 m500:text-sm"
                onClick={() => handleSubject('hide')}
              >
                Hide subject
              </Button>
            )}
          </div>

          <Flicking
            hideBeforeInit={true}
            plugins={plugins}
            circular
            panelsPerView={panelsCount}
            align={'center'}
            circularFallback={'bound'}
            className={clsx(panelsCount === 3 && 'px-[80px]', 'pb-5')}
          >
            {data.works.map((book: any, index: number) => {
              return <Book key={index} book={book} />
            })}

            <ViewportSlot>
              <div className="absolute left-0 top-0 z-10 flex h-full w-[155px] items-center rounded-lg bg-gradient-to-r from-secondary/90 from-50% to-transparent dark:from-darkSecondary/90 m1050:w-20 m700:w-0"></div>
              <div className="absolute right-0 top-0 z-10 flex h-full w-[155px] items-center rounded-lg bg-gradient-to-l from-secondary/90 from-50% to-transparent dark:from-darkSecondary/90 m1050:w-20 m700:w-0"></div>
              <span className="flicking-arrow-prev rounded-lg">
                <Button
                  variant={'cta'}
                  className="absolute left-0 top-[calc(50%-34px)] z-20 px-3 py-6 m400:top-[calc(50%-18px)] m400:px-1.5 m400:py-4"
                >
                  <AiOutlineArrowLeft className="h-5 w-5" />
                </Button>
              </span>
              <span className="flicking-arrow-next ">
                <Button
                  variant={'cta'}
                  className="absolute right-0 top-[calc(50%-34px)] z-20 rounded-lg px-3 py-6 m400:top-[calc(50%-18px)] m400:px-1.5 m400:py-4"
                >
                  <AiOutlineArrowRight className="h-5 w-5" />
                </Button>
              </span>
            </ViewportSlot>
          </Flicking>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-2.5 py-10">
          <h2 className="text-center text-xl font-bold m700:text-lg">
            We will stop recommending you this subject.
          </h2>

          <Button
            onClick={() => {
              handleSubject('show')
            }}
            className="mt-6 border border-black/10 dark:border-white/10 m500:text-sm"
          >
            Undo
          </Button>
        </div>
      )}
    </>
  )
}
