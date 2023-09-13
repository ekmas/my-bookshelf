import NewBookshelfMain from './NewBookshelfMain'

export default async function NewBookshelf() {
  return (
    <div className="mx-auto h-full w-container px-containerDesktop py-10">
      <h2 className="text-center text-3xl font-bold">Create new bookshelf</h2>

      <NewBookshelfMain />
    </div>
  )
}
