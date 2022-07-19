import { Card } from 'react-bootstrap'

export default function About() {
  return (
    <>
      <h1 className='page-title'>about</h1>
      <Card className='about card bg-dark text-light border-light'>
        <Card.Body>
          <Card.Text className='d-flex flex-column'>
            <p>
              A simple web app project, created by{' '}
              <a
                className='myLink'
                href='http://vbalaguera.com'
                target='_blank'
                rel='noreferrer'
              >
                Víctor Balaguera
              </a>
              . At this moment, uses the New York Times API only as source of
              external content. Create your account. Read the news. Add your
              favorites. Share them. Take notes.
            </p>

            <p>More to come.</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
