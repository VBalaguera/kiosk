import { Card } from 'react-bootstrap'

export default function Welcome() {
  const sections = [
    'most popular',
    'us',
    'world',
    'politics',
    'business',
    'tech',
    'movie reviews',
    'books',
    'opinion',
    'sports',
    'art',
    'search',
  ]
  const section = sections[Math.floor(Math.random() * sections.length)]
  return (
    <div className='w-100'>
      <h1 className='page-title'>welcome</h1>
      <Card className='about card bg-dark text-light border-light'>
        <Card.Body>
          <Card.Text className='d-flex flex-column'>
            <p>Please select a section.</p>
            <p>
              For example: <b>{section}</b>.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
