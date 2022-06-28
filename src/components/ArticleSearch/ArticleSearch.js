import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

import SharingButtons from '../Sharing/SharingButtons'

const nytArticlesSearch = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cats&api-key=${process.env.REACT_APP_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function ArticleSearch() {
  const [wordEntered, setWordEntered] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearch = (event) => {
    const query = event.target.value
    setWordEntered(query)

    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
      )
      .then((response) => {
        console.log(response.data.response.docs)
        setPosts(response.data.response.docs)
      })
  }
  /* useEffect(() => {
    const query = 'cats'
    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
      )
      .then((response) => {
        console.log(response.data.response.docs)
        setPosts(response.data.response.docs)
      })
  }, []) */
  return (
    <div className='w-100'>
      <div className='articles-search'>
        <input
          type='text'
          value={wordEntered}
          onChange={handleSearch}
          className='articles-search__input form-control'
          placeholder='what would you like to know?'
        />
        {posts.map((post) => (
          <div className='w-100'>
            <Card
              className='articles-search__card bg-dark card text-light border-light'
              index={post._id}
            >
              <Card.Body>
                {' '}
                <Card.Title>{post.headline.main}</Card.Title>
                <Card.Subtitle>{post.byline.original}</Card.Subtitle>
                <Card.Text>
                  <span>{post.pub_date}</span>
                  <span>{post.snippet}</span>
                  <span className='articles-search__keywords'>
                    Keywords:
                    {post.keywords.map((keyword) => (
                      <span className='articles-search__keywords-item'>
                        {keyword.value}
                      </span>
                    ))}
                  </span>
                </Card.Text>
                <Button variant='btn btn-outline-light'>
                  <a href={post.web_url} className='link'>
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
