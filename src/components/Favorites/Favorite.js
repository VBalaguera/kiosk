import React from 'react'
import { Card, Button } from 'react-bootstrap'

import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'

export default function Favorite({ favorite, index }) {
  const { currentUser } = useAuth()
  const favoritesCollectionRef = collection(
    db,
    'favorites',
    currentUser.email,
    currentUser.uid
  )

  const handleDeleteFavorite = async (id) => {
    try {
      await deleteDoc(doc(favoritesCollectionRef, id))
      console.log('Entire Document has been deleted successfully.')
      toast(`Document with id ${id} has been deleted successfully.`)
    } catch (err) {
      console.log(err)
      toast(err)
    }
  }
  const handleUpdateFavorite = async (e, id) => {
    e.preventDefault()
    try {
      await updateDoc(doc(favoritesCollectionRef, id), {
        comments: e.target.value,
      })
    } catch (err) {
      console.log(err)
    }
  }

  console.log(favorite)

  return (
    <>
      <Card key={index} className='card bg-dark text-light border-light'>
        <Card.Body>
          <div className='favorite-card'>
            <div className='favorite-card-top'>
              <span className='title-favorite-card'>{favorite.title}</span>
            </div>
            <div className='favorite-card-bottom'>
              <div className='favorite-card-bottom-left'>
                <span>
                  Published on: {moment(favorite.date).format('YYYY-MM-DD')}.
                </span>
                <span>
                  Saved on: {moment(favorite.createdAt).format('YYYY-MM-DD')}.
                </span>
              </div>
              <div className='favorite-card-bottom-center'>
                <span>Source: {favorite.source}</span>
                <span>Section: {favorite.section}.</span>
              </div>
              <div className='favorite-card-bottom-right'>
                <Button variant='secondary' className='favorites-btn me-2'>
                  <a href={favorite.url} className='myLink text-light'>
                    Read more.
                  </a>
                </Button>
                <Button
                  variant='warning'
                  className='favorites-btn'
                  onClick={() => handleDeleteFavorite(favorite.id)}
                >
                  delete
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
        <form onSubmit={handleUpdateFavorite(favorite.id)}>
          <input
            type='text'
            className='outline-dark text-light bg-dark'
            placeholder='your comments'
          />
          <button type='submit'>submit</button>
        </form>
        {favorite.comments ? <span>Comments: {favorite.comments}</span> : null}
      </Card>
      <ToastContainer
        position='bottom-right'
        type='info'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='dark'
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
