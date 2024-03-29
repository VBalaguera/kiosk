import { useState, useEffect } from 'react'

import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'

import PostCard from '../../PostCards/PostCard'

import data from '../../../data/nytMostPopular.json'
import Loading from '../../Loading/Loading'
const nytMostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
export default function MostPopular() {
  const [mostPopulars, setMostPopulars] = useState([])
  const { currentUser } = useAuth()

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
    /* most popular */
    setLoading(true)
    axios
      .get(nytMostPopularUrl)
      .then((response) => {
        setMostPopulars(response.data.results)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setMostPopulars(data)
        setLoading(false)
      })

    getFavorites()
  }, [])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='most-populars grid-example'>
          {mostPopulars.map((post, index) => (
            <>
              <PostCard
                key={index}
                post={post}
                user={currentUser}
                favorites={favorites}
              />
            </>
          ))}
        </div>
      )}
    </div>
  )
}
