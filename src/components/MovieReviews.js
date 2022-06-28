import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import SharingButtons from './Sharing/SharingButtons'

import moment from 'moment'

import data from '../data/nytMovieReviews.json'
const nytMovieReviewsUrl = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${process.env.REACT_APP_NYT_API_KEY}`

export default function MovieReviews() {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    /* movie reviews */
    axios
      .get(nytMovieReviewsUrl)
      .then((response) => {
        console.log(response.data.results)
        setReviews(response.data.results)
      })
      .catch((err) => {
        console.log(err)
        setReviews(data)
      })
  }, [])
  return (
    <div>
      <div className='movie-reviews'>
        {reviews.map((post, index) => (
          <Card
            index={index}
            className='movie-reviews__card  card bg-dark text-light border-light'
          >
            <Card.Body>
              <Card.Title>{post.display_title}</Card.Title>

              <Card.Img
                className='img movie-reviews__img'
                src={post.multimedia.src}
                alt={post.display_title}
              />

              <Card.Text>
                <span>
                  Opens on:{' '}
                  {moment(post.publication_date).format('MMMM d, YYYY')}
                </span>
                <span>
                  Published on:{' '}
                  <span>
                    {moment(post.publication_date).format('MMMM d, YYYY')}
                  </span>
                </span>
                <span>{post.summary_short}</span>
                <span>MPAA Rating: {post.mpaa_rating}</span>
              </Card.Text>

              <Button variant='btn btn-outline-light'>
                {' '}
                <a href={post.link.url} alt={post.headline} className='link'>
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
    </div>
  )
}
