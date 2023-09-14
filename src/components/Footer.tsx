import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="mx-auto max-w-container w-full px-containerDesktop py-5 m400:px-containerMobile m350:text-sm">
      <div className="flex m600:flex-col items-center justify-between">
        <div className="h-6 w-6">
          <ThemeSwitcher />
        </div>

        <div className="flex items-center m600:mt-5 m500:flex-col m500:gap-5 gap-10">
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
      <div className="mt-10 m600:mt-5 text-center">
        &copy; Copyright 2023 - My bookshelf
      </div>
    </footer>
  )
}

export default Footer
