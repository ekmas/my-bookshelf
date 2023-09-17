import defaultpfp from '@/../public/defaultprofilepicture.png'
import Button from '@/components/Button'

type Props = {
  username: string
  profilePicture: string
  isThisMyBookshelf: boolean
}

export default function User({
  username,
  profilePicture,
  isThisMyBookshelf,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <img // eslint-disable-line
        className="rounded-full border-2 border-black/30 dark:border-white/30"
        width={100}
        height={100}
        src={profilePicture || defaultpfp.src}
        alt="pfp"
      />

      <h2 className="mt-5 text-3xl font-medium m800:text-2xl m400:text-xl">
        {username}
      </h2>

      {isThisMyBookshelf && (
        <Button
          href="/edit-profile"
          className="mt-5 m800:text-sm"
          variant={'cta'}
        >
          Edit profile
        </Button>
      )}
    </div>
  )
}
