import { useState, useEffect } from 'react'

import axios from 'axios'

import PostCardMovies from '../../PostCardMovies'
import { useAuth } from '../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'

import data from '../../../data/nytMovieReviews.json'
const nytMovieReviewsUrl = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`

export default function MovieReviews() {
  const [reviews, setReviews] = useState([])
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
    /* movie reviews */
    axios
      .get(nytMovieReviewsUrl)
      .then((response) => {
        /* console.log(response.data.results) */
        setReviews(response.data.results)
      })
      .catch((err) => {
        /*  console.log(err) */
        setReviews(data)
      })

    getFavorites()
  }, [])
  return (
    <div>
      <div className='movie-reviews grid-example'>
        {reviews.map((post, index) => (
          <PostCardMovies
            post={post}
            user={currentUser}
            favorites={favorites}
          />
        ))}
      </div>
    </div>
  )
}
