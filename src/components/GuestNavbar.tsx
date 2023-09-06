import logo from '../../public/logo.png'
import Button from './Button'
import Image from 'next/image'

export default function GuestNavbar() {
  return (
    <nav>
      <div className="mx-auto flex w-container items-center justify-center px-containerDesktop py-[21px]">
        <Button variant={'link'} href={'/'}>
          <Image src={logo} alt="logo" width={60} />
        </Button>
      </div>
    </nav>
  )
}
