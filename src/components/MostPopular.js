import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import SharingButtons from './Sharing/SharingButtons'
const nytMostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`

export default function MostPopular() {
  const [mostPopulars, setMostPopulars] = useState([])

  useEffect(() => {
    /* most popular */
    axios.get(nytMostPopularUrl).then((response) => {
      console.log(response.data.results)
      setMostPopulars(response.data.results)
    })
  }, [])
  return (
    <div className='most-populars'>
      {mostPopulars.map((post, index) => (
        <Card
          className='most-populars__card  card bg-dark text-light border-light'
          index={index}
        >
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>

            <Card.Text>
              <span>{post.updated}</span>
            </Card.Text>

            <Button variant='btn btn-outline-light'>
              <a href={post.url} className='link'>
                read more
              </a>
            </Button>
          </Card.Body>
          <Card.Footer>
            <SharingButtons url={post.url} />
          </Card.Footer>
        </Card>
      ))}
    </div>
  )
}
