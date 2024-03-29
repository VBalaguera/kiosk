import { useState, useEffect } from 'react'

import axios from 'axios'

import PostCardMovies from '../../PostCards/PostCardMovies'
import { useAuth } from '../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'

import data from '../../../data/nytMovieReviews.json'
import Loading from '../../Loading/Loading'
const nytMovieReviewsUrl = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`

export default function MovieReviews() {
  const [reviews, setReviews] = useState([])
  const { currentUser } = useAuth()

  /* checking out user's favorites */
  const [favorites, setFavorites] = useState([])

  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    axios
      .get(nytMovieReviewsUrl)
      .then((response) => {
        setReviews(response.data.results)
        setLoading(false)
      })
      .catch((err) => {
        setReviews(data)
        console.log(err)
        setLoading(false)
      })

    getFavorites()
  }, [])
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='movie-reviews grid-example'>
          {reviews.map((post, index) => (
            <PostCardMovies
              key={index}
              post={post}
              user={currentUser}
              favorites={favorites}
            />
          ))}
        </div>
      )}
    </div>
  )
}
