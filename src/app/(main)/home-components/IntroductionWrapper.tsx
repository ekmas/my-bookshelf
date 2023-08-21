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
            getRandomNumber(),
        )
      }

      if (user?.app_metadata.provider === 'github') {
        setUsername(user?.user_metadata?.preferred_username + getRandomNumber())
      }
    }
  }

  const log = () => {
    console.log(username, subjects)
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
      currentSection = <Success log={log} />
  }

  useEffect(() => {
    getUser()
  }, [])

  return <div className="w-full">{currentSection}</div>
}
