import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import SharingButtons from './Sharing/SharingButtons'
const nytBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`

export default function Books() {
  const [books, setBooks] = useState([])
  useEffect(() => {
    /* books */
    axios.get(nytBooksUrl).then((response) => {
      console.log(response.data.results.books)
      setBooks(response.data.results.books)
    })
  }, [])
  return (
    <div>
      {' '}
      <div className='books'>
        {books.map((post, index) => (
          <Card
            className='books__card card bg-dark text-light border-light'
            index={index}
          >
            <Card.Body>
              {' '}
              <Card.Title>{post.title}</Card.Title>
              <Card.Img
                className='img books__img'
                src={post.book_image}
                alt={post.title}
              />
              <Card.Text>
                <span>By: {post.author}</span>
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
    </div>
  )
}
