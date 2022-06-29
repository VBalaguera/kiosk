import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import SharingButtons from './Sharing/SharingButtons'

import moment from 'moment'

import data from '../data/nytMostPopular.json'
const nytMostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`

export default function MostPopular() {
  const [mostPopulars, setMostPopulars] = useState([])

  useEffect(() => {
    /* most popular */
    axios
      .get(nytMostPopularUrl)
      .then((response) => {
        console.log(response.data.results)
        setMostPopulars(response.data.results)
      })
      .catch((err) => {
        console.log(err)
        setMostPopulars(data)
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
            {' '}
            <div className='title-card'>{post.title}</div>
            <div className='subtitle'>{post.abstract}</div>
            <Card.Text className='author-date'>
              <span>{post.byline}</span>{' '}
              <span>
                Published: {moment(post.published_date).format('MMMM d, YYYY')}
              </span>
            </Card.Text>
            <Button className='btn read-more' variant='btn btn-outline-light'>
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
