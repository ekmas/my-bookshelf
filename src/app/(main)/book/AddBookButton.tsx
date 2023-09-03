'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ModalMain from './ModalMain'

export default function AddBookButton({ bookInfo }: { bookInfo: any }) {
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalActive(true)} variant={'cta'}>
        Add to bookshelf
      </Button>

      <Modal active={isModalActive} setActive={setIsModalActive}>
        <ModalMain bookInfo={bookInfo} />
      </Modal>
    </>
  )
}
