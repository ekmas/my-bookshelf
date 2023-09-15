import SignUpForm from './SignUpForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function SignUp() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-128px-96px)] w-full max-w-container items-center justify-center px-containerDesktop py-20 m400:px-containerMobile">
      <div className="w-[500px] m550:w-full">
        <h1 className="text-center text-3xl font-bold m450:text-2xl">
          Sign up
        </h1>

        <p className="mt-4 text-center opacity-80">
          Sign up now for a personalized journey based on your interests.
        </p>

        <SignUpForm />
      </div>
    </main>
  )
}
