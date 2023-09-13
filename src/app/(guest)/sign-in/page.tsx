import SignInForm from './SignInForm'
import SignInProviders from './SignInProviders'

export default function SignIn() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-128px-96px)] w-container items-center justify-center px-containerDesktop py-20">
      <div className="w-[500px]">
        <h1 className="text-center text-3xl font-bold">Sign in</h1>

        <p className="mt-4 text-center opacity-80">
          Welcome back! Please enter your details.
        </p>

        <SignInForm />

        <div className="my-5 flex items-center">
          <hr className="h-0.5 w-full bg-black opacity-50 dark:bg-white" />
          <div className="shrink-0 px-3">
            <p className="text-sm">or sign in with</p>
          </div>
          <hr className="h-0.5 w-full bg-black opacity-50 dark:bg-white" />
        </div>

        <SignInProviders />
      </div>
    </main>
  )
}
