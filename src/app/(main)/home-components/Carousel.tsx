'use client'

import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import { Arrow } from '@egjs/flicking-plugins'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Button from '@/components/Button'
import Book from './Book'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

type Props = {
  data: any
  isRecommended: boolean | undefined
  subjectName: string
}

export default function Carousel({ data, isRecommended, subjectName }: Props) {
  const [isHidden, setIsHidden] = useState(false)

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
          <div className="flex items-center justify-between p-6">
            <h2 className="text-2xl font-bold">
              {isRecommended && 'You might be interested in '}
              <Link
                className="transition-none hover:underline"
                href={`/subject/${subjectName.toLowerCase()}`}
              >
                {subjectName}
              </Link>
            </h2>

            {isRecommended && (
              <Button onClick={() => handleSubject('hide')}>
                Hide this subject
              </Button>
            )}
          </div>

          <Flicking
            hideBeforeInit={true}
            plugins={plugins}
            circular
            panelsPerView={4}
            align={'center'}
            circularFallback={'bound'}
            className="pb-5"
          >
            {data.works.map((book: any, index: number) => {
              return <Book key={index} book={book} />
            })}

            <ViewportSlot>
              <div className="absolute left-0 top-0 z-10 flex h-full w-[155px] items-center rounded-lg bg-gradient-to-r from-secondary/90 from-50% to-transparent dark:from-darkSecondary/90"></div>
              <div className="absolute right-0 top-0 z-10 flex h-full w-[155px] items-center rounded-lg bg-gradient-to-l from-secondary/90 from-50% to-transparent dark:from-darkSecondary/90"></div>
              <span className="flicking-arrow-prev rounded-lg">
                <Button
                  variant={'cta'}
                  className="absolute left-0 top-[calc(50%-34px)] z-20 px-3 py-6"
                >
                  <AiOutlineArrowLeft className="h-5 w-5" />
                </Button>
              </span>
              <span className="flicking-arrow-next ">
                <Button
                  variant={'cta'}
                  className="absolute right-0 top-[calc(50%-34px)] z-20 rounded-lg px-3 py-6"
                >
                  <AiOutlineArrowRight className="h-5 w-5" />
                </Button>
              </span>
            </ViewportSlot>
          </Flicking>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <h2 className="text-center text-xl font-bold">
            We will stop recommending you this subject.
          </h2>

          <Button
            onClick={() => {
              handleSubject('show')
            }}
            className="mt-6"
          >
            Undo
          </Button>
        </div>
      )}
    </>
  )
}
