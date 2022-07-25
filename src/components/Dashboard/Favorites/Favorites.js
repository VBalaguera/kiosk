import { useState, useEffect } from 'react'
import Favorite from './Favorite'
import { Button } from 'react-bootstrap'
import Link from 'next/link'

import { useAuth } from '../../../context/AuthContext'

import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../../firebase'

export default function Favorites() {
  const { currentUser } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [favoritesSection, setFavoritesSection] = useState([])

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

    const favorites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      user: currentUser.uid,
    }))
    const sortedAsc = favorites.sort(
      (objA, objB) =>
        Number(objA.createdAt.seconds) - Number(objB.createdAt.seconds)
    )
    setFavorites(sortedAsc)
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

  const getCategories = () => {
    const allSections = [
      'all',
      ...new Set(favorites.map((favorite) => favorite.section)),
    ]
    setFavoritesSection(allSections)
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <>
      <div className='dashboard bg-dark text-light border-light'>
        <div>
          <h2 className='section-title'>favorites</h2>
          <div className='d-flex justify-content-center my-3 flex-wrap'>
            {allSections.map((section, index) => (
              <Button
                variant='secondary'
                className='m-2 favorites-btn'
                key={index}
                onClick={() => filterItems(section)}
              >
                {section}
              </Button>
            ))}
          </div>

          <>
            {favorites.length > 0 ? (
              <>
                {favorites.map((favorite, index) => {
                  return (
                    <>
                      <Favorite favorite={favorite} index={index} />
                    </>
                  )
                })}
              </>
            ) : (
              <div className='mt-4'>
                <>
                  <span>
                    You have no favorites yet. C'mon,{' '}
                    <Link className='myLink' href='/kiosk'>
                      add some
                    </Link>
                    .
                  </span>
                </>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  )
}
