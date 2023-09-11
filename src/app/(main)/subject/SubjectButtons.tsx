'use client'

import Button from '@/components/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

type Props = {
  subject: string
  subjects: any[] | null
  notInterestedSubjects: any[] | null
  userId: string | undefined
}

export default function SubjectButtons({
  subject,
  subjects,
  notInterestedSubjects,
  userId,
}: Props) {
  const supabase = createClientComponentClient()

  const [isFavorite, setIsFavorite] = useState<boolean | null>(null)
  const [isMuted, setIsMuted] = useState<boolean | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (subjects?.includes(subject)) {
      setIsFavorite(true)
      setIsMuted(false)
    } else {
      if (notInterestedSubjects?.includes(subject)) {
        setIsFavorite(false)
        setIsMuted(true)
      } else {
        setIsFavorite(false)
        setIsMuted(false)
      }
    }
  }, [])

  const favoriteSubject = async () => {
    const { error } = await supabase
      .from('subjects')
      .insert({ user_id: userId, subject: subject })

    if (error) {
      setError(true)
    } else {
      setIsFavorite(true)
    }
  }

  const muteSubject = async () => {
    const { error } = await supabase
      .from('not_interested_subjects')
      .insert({ user_id: userId, subject: subject })

    if (error) {
      setError(true)
    } else {
      setIsMuted(true)
    }
  }

  const unfavoriteSubject = async () => {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('subject', subject)

    if (error) {
      setError(true)
    } else {
      setIsFavorite(false)
    }
  }

  const unmuteSubject = async () => {
    const { error } = await supabase
      .from('not_interested_subjects')
      .delete()
      .eq('subject', subject)

    if (error) {
      setError(true)
    } else {
      setIsMuted(false)
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-6">
        {!isFavorite && !isMuted ? (
          <>
            <Button onClick={favoriteSubject} variant={'cta'}>
              Favorite subject
            </Button>
            <Button onClick={muteSubject} variant={'cta'}>
              Mute subject
            </Button>
          </>
        ) : (
          <>
            {isFavorite ? (
              <Button onClick={unfavoriteSubject} variant={'cta'}>
                Unfavorite subject
              </Button>
            ) : (
              <Button onClick={unmuteSubject} variant={'cta'}>
                Unmute subject
              </Button>
            )}
          </>
        )}
      </div>
      {error && (
        <div>
          <p>An error has occured please refresh this page.</p>
        </div>
      )}
    </div>
  )
}
