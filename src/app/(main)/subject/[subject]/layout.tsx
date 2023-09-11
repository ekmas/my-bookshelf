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
    let { data: subjects, error: subjectsError } = await supabase
      .from('subjects')
      .select()
      .eq('user_id', userId)

    let { data: notInterestedSubjects, error: notInterestedSubjectsError } =
      await supabase
        .from('not_interested_subjects')
        .select()
        .eq('user_id', userId)

    if (subjectsError || notInterestedSubjectsError) {
      throw new Error(
        subjectsError?.message || notInterestedSubjectsError?.message,
      )
    }

    if (subjects?.length) {
      subjects = subjects.map((subject) => subject.subject)
    }

    if (notInterestedSubjects?.length) {
      notInterestedSubjects = notInterestedSubjects.map(
        (subject) => subject.subject,
      )
    }
  }

  params.subject = decodeURI(params.subject)

  const subjectHeading =
    params.subject[0].toUpperCase() + params.subject.slice(1)

  return (
    <main className="mx-auto h-full min-h-[calc(100dvh-88px-70px)] w-container px-containerDesktop py-10">
      <h1 className="text-4xl font-bold">{subjectHeading}</h1>
      {userId && (
        <SubjectButtons
          subject={decodeURI(params.subject)}
          subjects={subjects}
          notInterestedSubjects={notInterestedSubjects}
          userId={userId}
        />
      )}
      {children}
    </main>
  )
}
