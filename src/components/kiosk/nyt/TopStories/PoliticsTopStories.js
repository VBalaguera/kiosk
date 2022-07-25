import { useState, useEffect } from 'react'
import axios from 'axios'

import PostCard from '../../../PostCards/PostCard'
import { useAuth } from '../../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../../firebase'

import data from '../../../../data/nytPolitics.json'

const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function PoliticsTopStories() {
  const [posts, setPosts] = useState([])
  const { currentUser } = useAuth()
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
    setFavorites(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        user: currentUser.uid,
      }))
    )
  }
  useEffect(() => {
    axios
      .get(nytTopStoriesUrl)
      .then((response) => {
        setPosts(response.data.results)
      })
      .catch((err) => {
        setPosts(data)
      })

    getFavorites()
  }, [])
  return (
    <div>
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
    </div>
  )
}
