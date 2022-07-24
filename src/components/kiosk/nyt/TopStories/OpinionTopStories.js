import { useState, useEffect } from 'react'
import axios from 'axios'

import PostCard from '../../../PostCard'
import { useAuth } from '../../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../../firebase'

import data from '../../../../data/nytOpinion.json'
const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function OpinionTopStories() {
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
    /* top stories */
    axios
      .get(nytTopStoriesUrl)
      .then((response) => {
        /*  console.log(response.data.results) */
        setPosts(response.data.results)
      })
      .catch((err) => {
        /*   console.log(err) */
        setPosts(data)
      })

    getFavorites()
  }, [])
  return (
    <div>
      <div className='top-stories grid-example'>
        {posts.map((post, index) => (
          <>
            <PostCard post={post} user={currentUser} favorites={favorites} />
          </>
        ))}
      </div>
    </div>
  )
}
