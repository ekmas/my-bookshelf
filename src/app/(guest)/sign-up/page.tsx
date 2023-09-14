import SignUpForm from './SignUpForm'

export default function SignUp() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-128px-96px)] m400:px-containerMobile max-w-container w-full items-center justify-center px-containerDesktop py-20">
      <div className="m550:w-full w-[500px]">
        <h1 className="text-center text-3xl font-bold m450:text-2xl">Sign up</h1>

        <p className="mt-4 text-center opacity-80">
          Sign up now for a personalized journey based on your interests.
        </p>

        <SignUpForm />
      </div>
    </main>
  )
}
