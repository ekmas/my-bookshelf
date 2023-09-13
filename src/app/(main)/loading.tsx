import Image from 'next/image'
import loadinggif from '../../../public/loadinggif.gif'

export default function loading() {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100dvh-96px-128px-40px)] w-container flex-col items-center justify-center px-containerDesktop py-10">
      <Image width={120} height={120} src={loadinggif.src} alt="loading" />
    </div>
  )
}
