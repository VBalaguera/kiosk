import { Card } from 'react-bootstrap'

export default function About() {
  return (
    <>
      <h1 className='section-title'>about</h1>
      <Card className='about card bg-dark text-light border-light'>
        <Card.Body>
          <Card.Text className='d-flex flex-column'>
            <span>
              A simple web app project, created by{' '}
              <a
                className='myLink'
                href='http://vbalaguera.com'
                target='_blank'
                rel='noreferrer'
              >
                Víctor Balaguera
              </a>
              .
            </span>
            <span>
              At this moment, uses the New York Times API only as source of
              external content.
            </span>
            <span>
              Create your account. Read the news. Add your favorites. Share
              them. Take notes.
            </span>
            <span>More to come.</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
