import { useState, useEffect } from 'react'

import axios from 'axios'
import PostCard from '../../../PostCards/PostCard'
import { useAuth } from '../../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../../firebase'

import data from '../../../../data/nytWorld.json'
import Loading from '../../../Loading/Loading'
const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`

export default function WorldTopStories() {
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
        setPosts(response.data.results.slice(2))
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
