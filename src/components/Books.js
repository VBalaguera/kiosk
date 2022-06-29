import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import SharingButtons from './Sharing/SharingButtons'

import moment from 'moment'

import data from '../data/nytBooks.json'

const nytBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`

export default function Books() {
  const [books, setBooks] = useState([])
  useEffect(() => {
    /* books */
    axios
      .get(nytBooksUrl)
      .then((response) => {
        console.log(response.data.results.books)
        setBooks(response.data.results.books)
      })
      .catch((err) => {
        console.log(err)
        setBooks(data)
      })
  }, [])
  return (
    <div>
      {' '}
      <div className='books'>
        {books.map((post, index) => (
          <Card
            className='books__card card bg-dark text-light border-light'
            key={index}
          >
            <Card.Body>
              {' '}
              <div className='title-card'>{post.title}</div>
              <Card.Img
                className='img book-img'
                src={post.book_image}
                alt={post.description}
              />
              <div className='subtitle'>{post.description}</div>
              <Card.Text className='author-date'>
                <span>By: {post.author}</span>{' '}
                <span>Publisher: {post.publisher}</span>
              </Card.Text>
              <Button className='btn read-more' variant='btn btn-outline-light'>
                <a href={post.amazon_product_url} className='link'>
                  check it out
                </a>
              </Button>
            </Card.Body>
            <Card.Footer>
              <SharingButtons url={post.amazon_product_url} />
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  )
}
