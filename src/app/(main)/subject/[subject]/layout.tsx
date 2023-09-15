import createServerComponentClient from '@/lib/supabase-server'
import SubjectButtons from '../SubjectButtons'

export default async function SubjectPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { subject: string }
}) {
  const supabase = createServerComponentClient()

  const userId = (await supabase.auth.getUser()).data.user?.id

  let subjects: any[] | null = null
  let notInterestedSubjects: any[] | null = null

  if (userId) {
    let { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select()
      .eq('user_id', userId)

    let { data: notInterestedSubjectsData, error: notInterestedSubjectsError } =
      await supabase
        .from('not_interested_subjects')
        .select()
        .eq('user_id', userId)

    if (subjectsError || notInterestedSubjectsError) {
      throw new Error(
        subjectsError?.message || notInterestedSubjectsError?.message,
      )
    }

    if (subjectsData?.length) {
      subjects = subjectsData.map((subject) => subject.subject)
    }

    if (notInterestedSubjectsData?.length) {
      notInterestedSubjects = notInterestedSubjectsData.map(
        (subject) => subject.subject,
      )
    }
  }

  params.subject = decodeURI(params.subject)

  const subjectHeading =
    params.subject[0].toUpperCase() + params.subject.slice(1)

  return (
    <div className="mx-auto h-full w-full max-w-container px-containerDesktop py-10 m400:px-containerMobile">
      <h1 className="text-4xl font-bold m900:text-2xl m500:text-xl">
        {subjectHeading}
      </h1>
      {userId && (
        <SubjectButtons
          subject={decodeURI(params.subject)}
          subjects={subjects}
          notInterestedSubjects={notInterestedSubjects}
          userId={userId}
        />
      )}
      {children}
    </div>
  )
}
