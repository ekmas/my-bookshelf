import SignUpForm from './SignUpForm'

export default function SignUp() {
  return (
    <main className="mx-auto flex h-full min-h-[calc(100dvh-88px-70px)] w-container items-center justify-center px-containerDesktop py-20">
      <div className="w-[500px]">
        <h1 className="text-center text-3xl font-bold">Sign up</h1>

        <p className="mt-4 text-center opacity-80">
          Sign up now for a personalized journey based on your interests.
        </p>

        <SignUpForm />
      </div>
    </main>
  )
}
