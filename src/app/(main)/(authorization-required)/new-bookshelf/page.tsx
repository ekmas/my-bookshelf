import NewBookshelfMain from './NewBookshelfMain'

export default async function NewBookshelf() {
  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <h2 className="text-center text-3xl font-bold m500:text-xl">
        Create new bookshelf
      </h2>

      <NewBookshelfMain />
    </div>
  )
}
