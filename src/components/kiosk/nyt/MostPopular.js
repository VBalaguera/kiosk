import { useState, useEffect } from 'react'

import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'

import PostCard from '../../PostCards/PostCard'

import data from '../../../data/nytMostPopular.json'
const nytMostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
export default function MostPopular() {
  const [mostPopulars, setMostPopulars] = useState([])
  const { currentUser } = useAuth()

  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [section, setSection] = useState('')

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState('')

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
    /* most popular */
    axios
      .get(nytMostPopularUrl)
      .then((response) => {
        /* console.log(response.data.results) */
        setMostPopulars(response.data.results)
        /* setUser(currentUser.uid) */
      })
      .catch((err) => {
        console.log(err)
        setMostPopulars(data)
      })

    getFavorites()
  }, [])

  return (
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
  )
}
