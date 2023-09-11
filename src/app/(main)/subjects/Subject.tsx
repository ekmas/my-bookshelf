import Link from 'next/link'

export default function Subject({
  subject,
}: {
  subject: { category: string; subjects: string[] }
}) {
  return (
    <div className="py-5">
      <h3 className="text-2xl font-medium">{subject.category}</h3>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {subject.subjects.map((item: string) => {
          return (
            <Link
              className="rounded-md border border-black/50 px-2.5 py-1 text-lg transition-all hover:bg-primary hover:text-white dark:border-white/50"
              href={`/subject/${item}`}
              key={item}
            >
              {item}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
