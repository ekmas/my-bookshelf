import logo from '../../public/logo.png'
import Button from './Button'
import Image from 'next/image'

export default function GuestNavbar() {
  return (
    <nav>
      <div className="mx-auto flex h-24 max-w-container w-full items-center justify-center px-containerDesktop">
        <Button variant={'link'} href={'/'}>
          <Image src={logo} alt="logo" width={60} />
        </Button>
      </div>
    </nav>
  )
}
