import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

import moment from 'moment'

import data from '../../data/nytMostPopular.json'

import SharingButtons from '../Sharing/SharingButtons'

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
      .catch((err) => {
        console.log(err)
        setPosts(data)
      })
  }

  const clearInput = () => {
    setPosts([])
    setWordEntered('')
  }

  return (
    <div className='w-100'>
      <div className='articles-search'>
        <div class='input-group mb-4'>
          <input
            type='text'
            className='articles-search__input form-control'
            placeholder='what would you like to know?'
            value={wordEntered}
            onChange={handleSearch}
            aria-label='what would you like to know?'
          />
          {posts.length === 0 ? (
            <span
              class='btn btn-outline-light'
              type='button'
              id='button-addon2'
            >
              search
            </span>
          ) : (
            <button
              class='btn btn-outline-light'
              type='button'
              id='button-addon2'
              onClick={clearInput}
            >
              delete
            </button>
          )}
        </div>

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
                  <span>{moment(post.pub_date).format('MMMM d, YYYY')}</span>
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
