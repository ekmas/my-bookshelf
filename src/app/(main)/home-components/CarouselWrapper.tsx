import Carousel from './Carousel'
import { getRandomNumber } from '@/lib/utils'

export default async function CarouselWrapper({
  subject,
  isRecommended,
}: {
  subject: string
  isRecommended?: boolean
}) {
  const res = await fetch(
    `https://openlibrary.org/subjects/${subject}.json?limit=6&offset=${
      getRandomNumber(10) * 10
    }`,
    {
      method: 'GET',
    },
  )

  if (!res.ok) {
    console.log(res, subject)
    throw new Error('There is an issue with open library api')
  }

  const data = await res.json()

  const subjectName = subject[0].toUpperCase() + subject.slice(1)

  if (data?.works?.length < 5) {
    return null
  } else {
    return (
      <div className="my-10 rounded-lg bg-secondary dark:bg-darkSecondary m700:my-5">
        <Carousel
          subjectName={subjectName}
          isRecommended={isRecommended}
          data={data}
        />
      </div>
    )
  }
}
