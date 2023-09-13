import subjects from '@/data/subjects.json'
import Subject from './Subject'

export default function Subjects() {
  return (
    <div className="mx-auto h-full w-container px-containerDesktop py-10">
      <h2 className="text-center text-3xl font-bold">Subjects</h2>

      <div className="py-10">
        {subjects.map((subject) => {
          return <Subject key={subject.category} subject={subject} />
        })}
      </div>
    </div>
  )
}
