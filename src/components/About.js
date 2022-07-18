import { Card } from 'react-bootstrap'

export default function About() {
  return (
    <>
      <h1 className='section-title'>about</h1>
      <Card className='about card bg-dark text-light border-light'>
        <Card.Body>
          <Card.Text className='d-flex flex-column'>
            <span>
              A simple SPA news project that, at this moment, uses the New York
              Times API only.
            </span>
            <span>
              Add your favorites. Share them. Take notes. More to come.
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
