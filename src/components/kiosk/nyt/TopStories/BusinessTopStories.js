import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

import moment from 'moment'
import { useAuth } from '../../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../../firebase'

import PostCard from '../../../PostCards/PostCard'

import data from '../../../../data/nytBusiness.json'
import Loading from '../../../Loading/Loading'
const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function BusinnessTopStories() {
  const [posts, setPosts] = useState([])
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
    setLoading(true)
    axios
      .get(nytTopStoriesUrl)
      .then((response) => {
        setPosts(response.data.results)
        setLoading(false)
      })
      .catch((err) => {
        setPosts(data)
        setLoading(false)
      })

    getFavorites()
  }, [])
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='top-stories grid-example'>
          {posts.map((post, index) => (
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
