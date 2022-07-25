import { useState, useEffect } from 'react'
import axios from 'axios'

import PostCardBooks from '../../PostCards/PostCardBooks'
import { useAuth } from '../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'

import data from '../../../data/nytBooks.json'

const nytBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`

export default function Books() {
  const [books, setBooks] = useState([])
  const { currentUser } = useAuth()

  /* checking out user's favorites */
  const [favorites, setFavorites] = useState([])

  const favoritesCollectionRef = collection(
    db,
    'favorites',
    currentUser.email,
    currentUser.uid
  )
  const q = query(
    favoritesCollectionRef,
    where('user', '==', String(currentUser.uid))
  )
  /* TODO: revisit and polish this code asap */

  const getFavorites = async () => {
    const data = await getDocs(q)
    /*       console.log(currentUser.uid) */
    setFavorites(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        user: currentUser.uid,
      }))
    )
  }

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

    getFavorites()
  }, [])
  return (
    <div>
      {' '}
      <div className='books grid-example'>
        {books.map((post, index) => (
          <>
            <PostCardBooks
              post={post}
              user={currentUser}
              favorites={favorites}
            />
          </>
        ))}
      </div>
    </div>
  )
}
