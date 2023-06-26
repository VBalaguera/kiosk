import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

export default function Welcome({ sections, setMySection }) {
  console.log(sections)

  const [section, setSection] = useState()

  useEffect(() => {
    setSection(sections[Math.floor(Math.random() * sections.length)])
  }, [sections, setSection])
  return (
    <div className='w-100'>
      <h1 className='page-title'>welcome</h1>
      <Card className='about card bg-dark text-light border-light'>
        <Card.Body>
          <Card.Text className='d-flex flex-column'>
            <p>Please select a section.</p>
            <p>
              For example:{' '}
              <b className='hover' onClick={() => setMySection(section)}>
                {section}
              </b>
              .
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
