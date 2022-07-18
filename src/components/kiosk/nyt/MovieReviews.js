import { useState, useEffect } from 'react'

import axios from 'axios'

import PostCardMovies from '../../PostCardMovies'
import { useAuth } from '../../../context/AuthContext'

import data from '../../../data/nytMovieReviews.json'
const nytMovieReviewsUrl = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${process.env.REACT_APP_NYT_API_KEY}`

export default function MovieReviews() {
  const [reviews, setReviews] = useState([])
  const { currentUser } = useAuth()
  useEffect(() => {
    /* movie reviews */
    axios
      .get(nytMovieReviewsUrl)
      .then((response) => {
        console.log(response.data.results)
        setReviews(response.data.results)
      })
      .catch((err) => {
        console.log(err)
        setReviews(data)
      })
  }, [])
  return (
    <div>
      <div className='movie-reviews'>
        {reviews.map((post, index) => (
          <PostCardMovies post={post} user={currentUser} />
        ))}
      </div>
    </div>
  )
}
