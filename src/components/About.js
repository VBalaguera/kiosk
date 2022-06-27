import { Card } from 'react-bootstrap'

export default function About() {
  return (
    <>
      <Card className='about card'>
        <Card.Body>
          <Card.Title>Kiosk</Card.Title>
          <Card.Text>
            A simple SPA news project that uses several APIs.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
