import AuthorImage from '../AuthorImage'

export default async function AuthorPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const res = await fetch(`https://openlibrary.org/authors/${params.id}.json`, {
    method: 'GET',
  })

  if (!res.ok) {
    if (res.statusText === 'Not Found') {
      throw new Error("This author id doesn't exist")
    } else {
      throw new Error('There is an issue with open library api')
    }
  }

  const data = await res.json()

  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <div className="grid h-min w-full grid-cols-[1fr_2fr] gap-10 m700:gap-5 m650:grid-cols-1">
        <div className="flex h-[250px] justify-center rounded-lg border border-black/10 py-5 dark:border-white/10">
          {data?.photos?.at(0) ? (
            <AuthorImage imageId={data?.photos?.at(0)} />
          ) : (
            <div className="flex h-[208px] w-[208px] items-center justify-center text-black dark:text-white">
              <p>no image</p>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold m900:text-2xl m500:text-xl">
            {data?.name}
          </h1>

          {data?.birth_date && (
            <div className="mt-4">
              {data?.birth_date} - {data?.death_date}
            </div>
          )}
        </div>
      </div>
      {data?.bio && (
        <div className="mt-8">
          <h4 className="mb-5 text-2xl font-bold m900:text-lg">Bio</h4>
          <div className="break-all text-lg m900:text-base">
            {data?.bio?.value || data?.bio}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
