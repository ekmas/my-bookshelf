'use client'

import { useState } from 'react'
import defaultprofilepicture from '@/../public/defaultprofilepicture.png'
import Link from 'next/link'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ShareModal from './ShareModal'
import DeleteModal from './DeleteModal'
import { useParams, useRouter } from 'next/navigation'

type Props = {
  title: string
  user: { name: string; profilePicture: string | null }
  isThisMyBookshelf: boolean
}

export default function BookshelfInfo({
  title,
  user,
  isThisMyBookshelf,
}: Props) {
  const [isShareModalActive, setIsShareModalActive] = useState(false)
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)

  const { id } = useParams()

  return (
    <aside className="fixed top-[108px] h-[calc(100dvh-108px-128px-40px)] max-h-[calc(100dvh-108px-128px-40px)] w-[350px] rounded-lg bg-secondary p-5 dark:bg-darkSecondary m1000:w-[250px] m800:relative m800:top-0 m800:block m800:h-auto m800:max-h-none m800:w-full">
      <h2 className="text-2xl font-bold m800:text-xl">{title}</h2>

      <Link
        href={`/user/${user.name}`}
        className="my-6 flex max-w-min items-center rounded-lg p-[10px] transition-colors hover:bg-secondaryHover dark:hover:bg-darkSecondaryHover"
      >
        <div className="mr-4 min-h-[35px] min-w-[35px] rounded-full border border-black/30 dark:border-white/30">
          <img // eslint-disable-line
            width={35}
            height={35}
            src={user.profilePicture || defaultprofilepicture.src}
            alt="profile picture"
            className="rounded-full"
          />
        </div>

        <h4 className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap font-medium m400:text-sm">
          {user.name}
        </h4>
      </Link>

      <Button
        onClick={() => {
          setIsShareModalActive(true)
        }}
        className="w-full m400:text-xs"
        size={'sm'}
        variant={'cta'}
      >
        Share
      </Button>

      <Modal active={isShareModalActive} setActive={setIsShareModalActive}>
        <ShareModal />
      </Modal>

      {isThisMyBookshelf && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button
              href={`/edit-bookshelf/${id}`}
              className="w-full border border-black/10 dark:border-white/10 m400:text-xs"
              size={'sm'}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalActive(true)
              }}
              className="w-full border border-black/10 dark:border-white/10 m400:text-xs"
              size={'sm'}
            >
              Delete
            </Button>
          </div>

          <Modal
            active={isDeleteModalActive}
            setActive={setIsDeleteModalActive}
          >
            <DeleteModal />
          </Modal>
        </>
      )}
    </aside>
  )
}
