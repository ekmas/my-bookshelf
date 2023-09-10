import Button from '@/components/Button'

type Props = {
  error: boolean
  username: string
}

export default function ModalMain({ error, username }: Props) {
  return (
    <>
      {!error ? (
        <>
          <h2 className="text-center text-xl font-bold">
            You successfully updated your profile!
          </h2>

          <Button
            className="mt-6"
            onClick={() => {
              location.replace(`/user/${username}`)
            }}
            variant={'cta'}
          >
            Your profile
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-center text-xl font-bold">
            An error has occured
          </h2>

          <Button
            className="mt-6"
            onClick={() => {
              location.reload()
            }}
            variant={'cta'}
          >
            Try again
          </Button>
        </>
      )}
    </>
  )
}
