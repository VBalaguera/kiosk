import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import SharingButtons from './Sharing/SharingButtons'

/* firebase and firestore */
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

import moment from 'moment'

import data from '../data/nytMostPopular.json'
const nytMostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
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

  /* firestore collection */
  const favoritesCollectionRef = collection(db, 'favorites')
  /* console.log(favoritesCollectionRef) */
  function handleFavorite(post) {
    setUser(currentUser.uid)
    setAuthor(post.byline)
    setDate(post.published_date)
    setDescription(post.abstract)
    setSection(post.section)
    setTitle(post.title)
    setUrl(post.url)

    setUser(currentUser.uid)
    console.log({ author, date, description, section, title, url, user })
  }

  const saveFavorite = async (post) => {
    setAuthor(post.byline)
    setDate(post.published_date)
    setDescription(post.abstract)
    setSection(post.section)
    setTitle(post.title)
    setUrl(post.url)

    setUser(currentUser.uid)

    try {
      await addDoc(favoritesCollectionRef, {
        author,
        date,
        description,
        section,
        title,
        url,
        user,
      })
      console.log('favorite added')
      console.log({ author, date, description, section, title, url, user })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    /* most popular */
    axios
      .get(nytMostPopularUrl)
      .then((response) => {
        /* console.log(response.data.results) */
        setMostPopulars(response.data.results)
        setUser(currentUser.uid)
      })
      .catch((err) => {
        console.log(err)
        setMostPopulars(data)
      })
    console.log(mostPopulars[0])
    const info = mostPopulars[0]

    console.log({ author, date, description, section, title, url, user })
  }, [])

  return (
    <div className='most-populars'>
      {mostPopulars.map((post, index) => (
        <Card
          className='most-populars__card  card bg-dark text-light border-light'
          key={index}
        >
          <span onClick={() => handleFavorite(mostPopulars[index])}>
            handleFavorite here
          </span>
          <span onClick={() => saveFavorite(mostPopulars[index])}>
            save favorite here
          </span>
          <Card.Body>
            {' '}
            <div className='title-card'>{post.title}</div>
            <div className='subtitle'>{post.abstract}</div>
            <Card.Text className='author-date'>
              <span>{post.byline}</span>{' '}
              <span>
                Published: {moment(post.published_date).format('MMMM d, YYYY')}
              </span>
            </Card.Text>
            <Button className='btn read-more' variant='btn btn-outline-light'>
              <a href={post.url} className='link'>
                read more
              </a>
            </Button>
          </Card.Body>

          <Card.Footer>
            <SharingButtons url={post.url} />
          </Card.Footer>
        </Card>
      ))}
    </div>
  )
}
