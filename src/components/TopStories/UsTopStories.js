import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

import SharingButtons from '../Sharing/SharingButtons'

const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function UsTopStories() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    /* top stories */
    axios.get(nytTopStoriesUrl).then((response) => {
      console.log(response.data.results)
      setPosts(response.data.results)
    })
  }, [])
  return (
    <div className='w-100'>
      <div className='top-stories'>
        {posts.map((post, index) => (
          <div className='w-100'>
            <Card
              className='top-stories__card bg-dark card text-light border-light'
              index={index}
            >
              <Card.Body>
                {' '}
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.updated}</Card.Text>
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
          </div>
        ))}
      </div>
    </div>
  )
}
