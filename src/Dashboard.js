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
            {favorites ? (
              <>
                {favorites.map((favorite, index) => {
                  console.log(favorite)
                  return (
                    <Card
                      key={index}
                      className='card bg-dark text-light border-light'
                    >
                      <Card.Body>
                        <div className='d-flex justify-content-between'>
                          {favorite.title}
                          <div className='d-flex justify-content-between'>
                            <div className='d-flex flex-column align-items-end justify-content-end mx-2'>
                              {' '}
                              <span className='mx-2'>
                                Published on:{' '}
                                {moment(favorite.date).format('MMMM d, YYYY')}.
                              </span>
                              <span className='mx-2'>
                                Saved on:{' '}
                                {moment(favorite.createdAt).format(
                                  'MMMM d, YYYY'
                                )}
                                .{/* TODO: FIX THIS */}
                              </span>
                            </div>
                            <div className='d-flex flex-column align-items-end justify-content-end mx-2'>
                              <span>Section: {favorite.section}.</span>
                              <a href={favorite.url} className='myLink'>
                                Read more.
                              </a>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  )
                })}
              </>
            ) : (
              <>
                <span>you have no favorites yet</span>
              </>
            )}
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
