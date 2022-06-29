import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import SharingButtons from '../Sharing/SharingButtons'

import moment from 'moment'
import data from '../../data/nytPolitics.json'

const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function PoliticsTopStories() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    /* top stories */
    axios
      .get(nytTopStoriesUrl)
      .then((response) => {
        console.log(response.data.results)
        setPosts(response.data.results)
      })
      .catch((err) => {
        console.log(err)
        setPosts(data)
      })
  }, [])
  return (
    <div>
      <div className='top-stories'>
        {posts.map((post, index) => (
          <Card
            className='top-stories__card  card bg-dark text-light border-light'
            key={index}
          >
            <Card.Body>
              {' '}
              <div className='title-card'>{post.title}</div>
              <Card.Img
                className='img'
                src={post.multimedia[0].url}
                alt={post.caption}
              />
              <div className='subtitle'>{post.abstract}</div>
              <Card.Text className='author-date'>
                <span>{post.byline}</span>{' '}
                <span>
                  Published:{' '}
                  {moment(post.published_date).format('MMMM d, YYYY')}
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
    </div>
  )
}
