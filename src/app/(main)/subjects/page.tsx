import subjects from '@/data/subjects.json'
import Subject from './Subject'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subjects',
}

export default function Subjects() {
  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <h2 className="text-center text-3xl font-bold m500:text-xl">Subjects</h2>

      <div className="py-10">
        {subjects.map((subject) => {
          return <Subject key={subject.category} subject={subject} />
        })}
      </div>
    </div>
  )
}
