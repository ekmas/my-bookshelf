import logo from '../../public/logo.png'
import Button from './Button'

export default function GuestNavbar() {
  return (
    <nav>
      <div className="mx-auto flex h-24 w-full max-w-container items-center justify-center px-containerDesktop">
        <Button variant={'link'} href={'/'}>
          <img // eslint-disable-line
            src={logo.src}
            alt="logo"
            width={60}
          />
        </Button>
      </div>
    </nav>
  )
}
