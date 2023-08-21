import React from 'react'
import subjects from '@/data/subjects.json'
import SubjectsAccordion from './SubjectsAccordion'
import Button from '@/components/Button'
import Subject from './Subject'

type Props = {
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>
  selectedSubjects: string[]
  setActiveSection: React.Dispatch<
    React.SetStateAction<'username' | 'subjects' | 'success'>
  >
}

export default function Subjects({
  setSubjects,
  selectedSubjects,
  setActiveSection,
}: Props) {
  return (
    <div>
      <h2 className="text-center text-xl font-bold">
        Choose subjects you're into
      </h2>

      <p className="my-6">Choose at least 5 subjects</p>

      <div className="subjects max-h-[300px] overflow-y-auto">
        {subjects.map((category) => {
          return (
            <SubjectsAccordion
              key={category.category}
              category={category.category}
            >
              {category.subjects.map((subject) => {
                return (
                  <Subject
                    subject={subject}
                    selectedSubjects={selectedSubjects}
                    setSubjects={setSubjects}
                    key={subject}
                  />
                )
              })}
            </SubjectsAccordion>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="w-14">{selectedSubjects.length} / 5</p>

        <Button
          onClick={() => {
            setActiveSection('success')
          }}
          disabled={selectedSubjects.length < 5}
          variant={'cta'}
        >
          Submit
        </Button>

        <p className="w-14"></p>
      </div>
    </div>
  )
}
