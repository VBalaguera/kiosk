import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function TechnologyTopStories() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    /* top stories */
    axios.get(nytTopStoriesUrl).then((response) => {
      console.log(response.data.results)
      setPosts(response.data.results)
    })
  }, [])
  return (
    <div>
      <div className='top-stories'>
        {posts.map((post, index) => (
          <Card className='top-stories__card  card' index={index}>
            <Card.Body>
              {' '}
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.updated}</Card.Text>
              <Button variant='primary'>
                <a href={post.url} className='link'>
                  read more
                </a>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}
