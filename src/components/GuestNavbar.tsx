import logo from '../../public/logo.png'
import Button from './Button'

export default function GuestNavbar() {
  return (
    <nav>
      <div className="mx-auto flex w-container items-center justify-center px-containerDesktop py-[21px]">
        <Button variant={'link'} href={'/'}>
          <img src={logo.src} width={60} alt="logo" />
        </Button>
      </div>
    </nav>
  )
}
