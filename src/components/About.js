import { Card } from 'react-bootstrap'

export default function About() {
  return (
    <>
      <h1>about</h1>
      <Card className='about card bg-dark text-light border-light'>
        <Card.Body>
          <Card.Text>
            A simple SPA news project that, at this moment, uses the New York
            Times API only. More to come.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
