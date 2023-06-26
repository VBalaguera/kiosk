import React from 'react'
import { Button, Nav } from 'react-bootstrap'

const Sections = ({ sections, setMySection }) => {
  return (
    <div className='d-flex justify-content-center flex-wrap flex-row mb-4'>
      {sections.map((section, index) => (
        <Nav.Link key={index} className='px-1 py-1 '>
          <Button
            variant='btn btn-outline-light button p-1 kiosk'
            type='button'
            key={section}
            onClick={() => setMySection(section)}
          >
            {section}
          </Button>
        </Nav.Link>
      ))}
    </div>
  )
}

export default Sections
