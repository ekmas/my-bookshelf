import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="mx-auto w-container px-containerDesktop py-5">
      <div className="flex items-center justify-between">
        <div className="h-6 w-6">
          <ThemeSwitcher />
        </div>

        <div className="flex items-center gap-10">
          <Link className="hover:underline" href={'/subjects'}>
            Subjects
          </Link>
          <Link className="hover:underline" href={'/privacy-policy'}>
            Privacy policy
          </Link>
          <Link className="hover:underline" href={'/terms-of-service'}>
            Terms of service
          </Link>
        </div>
      </div>
      <div className="mt-10 text-center">
        &copy; Copyright 2023 - My bookshelf
      </div>
    </footer>
  )
}

export default Footer
