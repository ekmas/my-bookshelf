import Image from 'next/image'
import defaultprofilepicture from '@/../public/defaultprofilepicture.png'
import Link from 'next/link'

type Props = {
  title: string
  user: { name: string; profilePicture: string | null }
}

export default function BookshelfInfo({ title, user }: Props) {
  return (
    <aside className="fixed top-[88px] h-[calc(100dvh-88px-70px)] max-h-[calc(100dvh-88px-70px)] w-[350px] py-10">
      <h2 className="text-2xl font-bold">{title}</h2>

      <Link
        href={`/user/${user.name}`}
        className="mt-5 flex w-max items-center rounded-lg p-[10px] transition-colors hover:bg-whiteHover dark:hover:bg-blackHover"
      >
        <div className="mr-4 rounded-full border border-black/30 dark:border-white/30">
          {user.profilePicture ? (
            <Image
              width={35}
              height={35}
              src={user.profilePicture}
              alt="profile picture"
            />
          ) : (
            <Image
              width={35}
              height={35}
              src={defaultprofilepicture.src}
              alt="profile picture"
            />
          )}
        </div>

        <h4 className="font-medium">{user.name}</h4>
      </Link>
    </aside>
  )
}
