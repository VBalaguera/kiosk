import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  where,
  query,
} from 'firebase/firestore'
import { db } from './firebase'
import { useAuth } from './context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

import Favorites from './components/Favorites/Favorites'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])

  /* filtering functionality */
  const [favoritesSection, setFavoritesSection] = useState([])

  /* search functionality */
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const favoritesCollectionRef = collection(db, 'favorites')
  const q = query(
    favoritesCollectionRef,
    where('user', '==', String(currentUser.uid))
  )
  /* TODO: revisit and polish this code asap */

  const getFavorites = async () => {
    const data = await getDocs(q)
    /*       console.log(currentUser.uid) */
    setFavorites(
      data.docs.map((doc) => ({ ...doc.data(), user: currentUser.uid }))
    )
  }

  function filterItems(term) {
    if (term === 'all') {
      setFavorites(favorites) /* og array */
      getFavorites()
      return
    } else {
      const newItems = favorites.filter((favorite) => favorite.section === term)

      setFavorites(newItems)
      setFavoritesSection(allSections)
    }
    /* iterating over og list */
  }

  /* new set with all fav's sections */
  const allSections = [
    'all',
    ...new Set(favorites.map((favorite) => favorite.section)),
  ]

  async function handleLogOut() {
    setError('')
    try {
      await logout()
      navigate('/')
    } catch {
      setError('error while logging out')
    }
  }

  useEffect(() => {
    getFavorites()
  }, [])

  const getCategories = () => {
    const allSections = [
      'all',
      ...new Set(favorites.map((favorite) => favorite.section)),
    ]
    setFavoritesSection(allSections)
  }

  /* console.log('favoritesSection', favoritesSection)
  console.log('allSections', allSections) */

  return (
    <>
      <h1>dashboard</h1>
      <Card className='dashboard card bg-dark text-light border-light'>
        <Card.Body>
          <h2>favorites</h2>
          <div className='d-flex justify-content-center'>
            {/*             {favoritesSection.map((section, index) => (
              <button key={index} onClick={() => filterItems(section)}>
                {section}
              </button>
            ))} */}
            {allSections.map((section, index) => (
              <Button
                variant='secondary'
                className='mx-2'
                key={index}
                onClick={() => filterItems(section)}
              >
                {section}
              </Button>
            ))}
          </div>

          <>
            <Favorites favorites={favorites} />
          </>
        </Card.Body>
      </Card>

      <Card className='dashboard card bg-dark text-light border-light'>
        <Card.Body>
          <h2>profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div>
            <div className='d-flex justify-content-between mt-2'>
              <span>
                Created on:{' '}
                {moment(currentUser.metadata.creationTime).format(
                  'MMMM d, YYYY'
                )}
                .
              </span>

              <span>
                Last login on:{' '}
                {moment(currentUser.metadata.lastSignInTime).format(
                  'MMMM d, YYYY'
                )}
                .
              </span>
            </div>
            <div className='d-flex justify-content-between mt-2'>
              <span>Email: {currentUser.email}</span>
              <Link className='myLink' to='/update-profile'>
                Update profile.
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div>
        <Button variant='secondary' onClick={handleLogOut}>
          log out
        </Button>
      </div>
    </>
  )
}
