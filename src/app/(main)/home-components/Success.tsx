import React from 'react'

export default function Success({ log }: { log: () => void }) {
  log()

  return <div>Success</div>
}
