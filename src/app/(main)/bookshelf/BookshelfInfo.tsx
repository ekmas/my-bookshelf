'use client'

import { useState } from 'react'
import Image from 'next/image'
import defaultprofilepicture from '@/../public/defaultprofilepicture.png'
import Link from 'next/link'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ShareModal from './ShareModal'

type Props = {
  title: string
  user: { name: string; profilePicture: string | null }
}

export default function BookshelfInfo({ title, user }: Props) {
  const [isShareModalActive, setIsShareModalActive] = useState(false)

  return (
    <aside className="fixed top-[108px] h-[calc(100dvh-108px-70px)] max-h-[calc(100dvh-108px-70px)] w-[350px] rounded-lg bg-secondary p-5 dark:bg-darkSecondary">
      <h2 className="text-2xl font-bold">{title}</h2>

      <Link
        href={`/user/${user.name}`}
        className="my-6 flex max-w-min items-center rounded-lg p-[10px] transition-colors hover:bg-secondaryHover dark:hover:bg-darkSecondaryHover"
      >
        <div className="mr-4 min-h-[35px] min-w-[35px] rounded-full border border-black/30 dark:border-white/30">
          {user.profilePicture ? (
            <Image
              width={35}
              height={35}
              src={user.profilePicture}
              alt="profile picture"
              className="rounded-full"
            />
          ) : (
            <Image
              width={35}
              height={35}
              src={defaultprofilepicture.src}
              alt="profile picture"
              className="rounded-full"
            />
          )}
        </div>

        <h4 className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap font-medium">
          {user.name}
        </h4>
      </Link>

      <Button
        onClick={() => {
          setIsShareModalActive(true)
        }}
        className="w-full"
        size={'sm'}
        variant={'cta'}
      >
        Share
      </Button>

      <Modal active={isShareModalActive} setActive={setIsShareModalActive}>
        <ShareModal />
      </Modal>
    </aside>
  )
}
