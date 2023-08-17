import { createServerComponentClient as _createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

const createServerComponentClient = cache(() => {
  const cookieStore = cookies()
  return _createServerComponentClient({ cookies: () => cookieStore })
})

export default createServerComponentClient
