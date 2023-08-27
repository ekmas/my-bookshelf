'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getRandomNumber } from '@/lib/utils'
import Username from './Username'
import Subjects from './Subjects'
import Success from './Success'

export default function IntroductionWrapper() {
  const [activeSection, setActiveSection] = useState<
    'username' | 'subjects' | 'success'
  >('username')

  const [username, setUsername] = useState('')
  const [subjects, setSubjects] = useState<string[]>([])

  const supabase = createClientComponentClient()

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user?.app_metadata.provider !== 'email') {
      if (user?.app_metadata.provider === 'google') {
        setUsername(
          user?.user_metadata?.full_name.split(' ').join('') +
            getRandomNumber(1000),
        )
      }

      if (user?.app_metadata.provider === 'github') {
        setUsername(
          user?.user_metadata?.preferred_username + getRandomNumber(1000),
        )
      }
    }
  }

  let currentSection
  switch (activeSection) {
    case 'username':
      currentSection = (
        <Username
          username={username}
          setUsername={setUsername}
          setActiveSection={setActiveSection}
        />
      )
      break
    case 'subjects':
      currentSection = (
        <Subjects
          setSubjects={setSubjects}
          selectedSubjects={subjects}
          setActiveSection={setActiveSection}
        />
      )
      break
    case 'success':
      currentSection = <Success username={username} subjects={subjects} />
  }

  useEffect(() => {
    getUser()
  }, [])

  return <div className="relative z-[100] w-full">{currentSection}</div>
}
