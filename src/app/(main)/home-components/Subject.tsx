import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>
  subject: string
  selectedSubjects: string[]
}

export default function Subject({
  setSubjects,
  subject,
  selectedSubjects,
}: Props) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    if (isSelected) {
      setSubjects((oldArray) => oldArray.filter((item) => item !== subject))
    } else {
      setSubjects((oldArray) => [...oldArray, subject])
    }

    setIsSelected(!isSelected)
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        isSelected ? 'bg-primary text-white' : 'bg-white dark:bg-transparent',
        'm-0.5 mx-1 rounded-md border border-black/50 px-1.5 py-0.5 text-sm transition-all dark:border-white/50',
      )}
    >
      {subject}
    </button>
  )
}
