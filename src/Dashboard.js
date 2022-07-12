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

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])
  const favoritesCollectionRef = collection(db, 'favorites')
  const q = query(
    favoritesCollectionRef,
    where('user', '==', String(currentUser.uid))
  )
  /* TODO: revisit and polish this code asap */

  useEffect(() => {
    const getFavorites = async () => {
      const data = await getDocs(q)
      console.log(currentUser.uid)
      setFavorites(
        data.docs.map((doc) => ({ ...doc.data(), user: currentUser.uid }))
      )
    }
    /*     const getFavorites = async () => {
      const data = await getDocs(
        favoritesCollectionRef,
        where('user', '==', String(currentUser.uid))
      )
      console.log(currentUser.uid)
      setFavorites(
        data.docs.map((doc) => ({ ...doc.data(), user: currentUser.uid }))
      )
    } */

    getFavorites()
  }, [])

  async function handleLogOut() {
    setError('')
    try {
      await logout()
      navigate('/')
    } catch {
      setError('error while logging out')
    }
  }
  return (
    <>
      <h1>dashboard</h1>
      <Card className='dashboard card bg-dark text-light border-light'>
        <Card.Body>
          <h2>favorites</h2>

          <>
            {favorites.map((favorite, index) => {
              return (
                <div>
                  <span key={index}>{favorite.title}</span>
                  <span>{favorite.user}</span>
                </div>
              )
            })}
          </>
        </Card.Body>
      </Card>

      <Card className='dashboard card bg-dark text-light border-light'>
        <Card.Body>
          <h2>profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div>
            <span>email: {currentUser.email}</span>
            <Link to='/update-profile'>update profile</Link>
          </div>
        </Card.Body>
      </Card>
      <div>
        <Button variant='link' onClick={handleLogOut}>
          log out
        </Button>
      </div>
    </>
  )
}
