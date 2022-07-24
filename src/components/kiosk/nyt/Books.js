import { useState, useEffect } from 'react'
import axios from 'axios'

import PostCardBooks from '../../PostCardBooks'
import { useAuth } from '../../../context/AuthContext'

import data from '../../../data/nytBooks.json'

const nytBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`

export default function Books() {
  const [books, setBooks] = useState([])
  const { currentUser } = useAuth()
  useEffect(() => {
    /* books */
    axios
      .get(nytBooksUrl)
      .then((response) => {
        /*  console.log(response.data.results.books) */
        setBooks(response.data.results.books)
      })
      .catch((err) => {
        /* console.log(err) */
        setBooks(data)
      })
  }, [])
  return (
    <div>
      {' '}
      <div className='books grid-example'>
        {books.map((post, index) => (
          <>
            <PostCardBooks post={post} user={currentUser} />
          </>
        ))}
      </div>
    </div>
  )
}
