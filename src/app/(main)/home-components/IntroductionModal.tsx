'use client'
import React, { useState, useEffect } from 'react'
import IntroductionWrapper from './IntroductionWrapper'
import Modal from '@/components/Modal'

export default function IntroductionModal({
  isFirstLogin,
}: {
  isFirstLogin: null | boolean
}) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isFirstLogin) {
      setIsActive(true)
    }
  }, [isFirstLogin])

  return (
    <Modal active={isActive} setActive={setIsActive} showCloseButton={false}>
      <IntroductionWrapper />
    </Modal>
  )
}
