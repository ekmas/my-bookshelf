'use client'
import { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

type Props = {
  category: string
  children: React.ReactNode
}

export default function SubjectsAccordion({ category, children }: Props) {
  const [showContent, setShowContent] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [showContent])

  return (
    <div className="mb-0.5 w-full rounded-md">
      <button
        className="flex w-full items-center justify-between rounded-[5px] bg-secondary p-5 transition-colors hover:bg-secondaryHover dark:bg-darkSecondary dark:hover:bg-darkSecondaryHover"
        onClick={() => {
          setShowContent(!showContent)
        }}
      >
        {category}
        <BsChevronDown
          style={{ transform: `rotate(${showContent ? '180deg' : '0'})` }}
          className="ml-4 min-h-[20px] min-w-[20px] transition-transform ease-in-out"
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: showContent ? `${contentHeight}` : '0' }}
        className="flex flex-wrap justify-center overflow-hidden rounded-[5px] bg-white/50 transition-[height] ease-in-out dark:bg-black/50"
      >
        <div className="m-3">{children}</div>
      </div>
    </div>
  )
}
