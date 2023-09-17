import loadinggif from '../../../public/loadinggif.gif'

export default function loading() {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100dvh-96px-128px-40px)] w-full max-w-container flex-col items-center justify-center px-containerDesktop py-10 m500:min-h-[calc(100dvh-88px)] m400:px-containerMobile">
      <img // eslint-disable-line
        width={100}
        height={100}
        src={loadinggif.src}
        alt="loading"
      />
    </div>
  )
}
