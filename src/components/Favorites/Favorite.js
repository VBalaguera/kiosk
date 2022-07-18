import { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'

import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'

export default function Favorite({ favorite, index }) {
  const [comment, setComment] = useState('')
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
      window.location.reload(false)
    } catch (err) {
      console.log(err)
      toast(err)
    }
  }
  const handleUpdateFavorite = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(doc(favoritesCollectionRef, favorite.id), {
        comments: comment,
      })
      console.log('updated')
      console.log(favorite)
      window.location.reload(false)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(favorite.comments)

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
          <div className='favorite-card-comments'>
            {favorite.comments ? (
              <span>
                <strong>Comments:</strong> {favorite.comments}.
              </span>
            ) : null}
          </div>
        </Card.Body>
        <Form onSubmit={handleUpdateFavorite}>
          <div className='d-flex my-2'>
            <Form.Control
              type='text'
              className='outline-dark text-light bg-dark '
              placeholder='Would you like to add some comments?'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <Button variant='secondary' className='favorites-btn' type='submit'>
              submit
            </Button>
          </div>
        </Form>
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
