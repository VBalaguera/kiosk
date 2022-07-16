import React from 'react'
import { Card } from 'react-bootstrap'

import { doc, deleteDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import moment from 'moment'

export default function Favorite({ favorite, index }) {
  const { currentUser } = useAuth()
  const favoritesCollectionRef = collection(
    db,
    'favorites',
    currentUser.email,
    currentUser.uid
  )
  const handleDeleteFavorite = async () => {
    const docRef = doc(favoritesCollectionRef)
    deleteDoc(docRef)
      .then(() => {
        console.log('Entire Document has been deleted successfully.')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Card key={index} className='card bg-dark text-light border-light'>
        <Card.Body>
          <div className='d-flex justify-content-between favorite-card'>
            {favorite.title}
            <div className='d-flex justify-content-between favorite-card-top'>
              <div className='d-flex flex-column align-items-end justify-content-end mx-2'>
                {' '}
                <span className='mx-2'>
                  Published on: {String(favorite.date).slice(0, 10)}.
                </span>
                {/* {favorite.createdAt.seconds ? (
                  <span className='mx-2'>
                    <>
                      Saved on:{' '}
                      {moment
                        .utc(favorite.createdAt.seconds)
                        .format()
                        .slice(0, 10)}
                    </>

                    
                  </span>
                ) : null} */}
                {/* <>{moment.utc(favorite.createdAt.seconds).format()}</>
                  {moment(favorite.createdAt.seconds).format('MMMM d, YYYY')}. */}
                {/* TODO: FIX THIS */}
              </div>
              <div className='d-flex flex-column align-items-end justify-content-end mx-2 favorite-card-bottom'>
                <span>Section: {favorite.section}.</span>
                <a href={favorite.url} className='myLink'>
                  Read more.
                </a>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
