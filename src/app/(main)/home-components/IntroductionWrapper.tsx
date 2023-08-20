'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getRandomNumber } from '@/lib/utils'
import Username from './Username'

export default function IntroductionWrapper() {
  const [activeSection, setActiveSection] = useState(0)

  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [subjects, setSubjects] = useState([])

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

      setProfilePicture(user?.user_metadata?.avatar_url)
    }
  }

  let currentSection
  switch (activeSection) {
    case 0:
      currentSection = (
        <Username
          username={username}
          setUsername={setUsername}
          setActiveSection={setActiveSection}
        />
      )
      break
  }

  useEffect(() => {
    getUser()
  }, [])

  return <div className="w-full">{currentSection}</div>
}
