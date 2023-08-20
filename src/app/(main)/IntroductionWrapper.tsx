'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getRandomNumber } from '@/lib/utils'

export default function IntroductionWrapper() {
  const [activeSection, setActiveSection] = useState()

  const [defaultUsername, setDefaultUsername] = useState<string | null>(null)
  const [defaultProfilePicture, setDefaultProfilePicture] = useState<
    string | null
  >(null)

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
        setDefaultUsername(
          user?.user_metadata?.full_name.split(' ').join('') +
            getRandomNumber(),
        )
      }

      if (user?.app_metadata.provider === 'github') {
        setDefaultUsername(user?.user_metadata?.preferred_username)
      }

      setDefaultProfilePicture(user?.user_metadata?.avatar_url)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <div>
        <div></div>
      </div>
    </div>
  )
}
