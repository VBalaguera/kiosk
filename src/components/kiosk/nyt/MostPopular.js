import { useState, useEffect } from 'react'

import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'

import PostCard from '../../PostCard'

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
    /* console.log(mostPopulars[0]) */
    const info = mostPopulars[0]

    /* console.log({ author, date, description, section, title, url, user }) */
  }, [])

  return (
    <div className='most-populars grid-example'>
      {mostPopulars.map((post, index) => (
        <>
          <PostCard post={post} user={currentUser} />
        </>
      ))}
    </div>
  )
}
