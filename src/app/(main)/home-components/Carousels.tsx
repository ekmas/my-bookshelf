import allSubjects from '@/data/subjects.json'
import CarouselWrapper from './CarouselWrapper'
import { shuffleArray } from '@/lib/utils'

type Props = {
  subjects: null | string[]
  notInterestedSubjects: null | string[]
}

export default function Carousels({ subjects, notInterestedSubjects }: Props) {
  let isLoggedIn

  const allAvailableSubjects = allSubjects.reduce((acc: string[], category) => {
    acc.push(...category.subjects)
    if (notInterestedSubjects?.length) {
      return acc.filter((item) => !notInterestedSubjects.includes(item))
    } else {
      return acc
    }
  }, [])

  const shuffledSubjects = shuffleArray([...allAvailableSubjects])

  let randomSubjects = shuffledSubjects.slice(0, 3)

  if (subjects) {
    subjects = shuffleArray(subjects).slice(0, 3)

    isLoggedIn = true

    if (notInterestedSubjects) {
      randomSubjects = randomSubjects.filter(
        (item) => !subjects?.includes(item),
      )
    }
  } else {
    isLoggedIn = false

    subjects = randomSubjects
  }

  return (
    <div className="mx-auto w-full max-w-container px-containerDesktop m400:px-containerMobile">
      {isLoggedIn ? (
        <>
          {subjects.map((item) => {
            return <CarouselWrapper key={item} subject={item} />
          })}

          {randomSubjects.map((item) => {
            return <CarouselWrapper key={item} subject={item} isRecommended />
          })}
        </>
      ) : (
        <>
          {randomSubjects.map((item) => {
            return <CarouselWrapper key={item} subject={item} />
          })}
        </>
      )}
    </div>
  )
}
