import { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'

import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useAuth } from '../../../context/AuthContext'
import moment from 'moment'

import Modal from 'react-modal'

import { ToastContainer, toast } from 'react-toastify'

/* modal styles */
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',

    transform: 'translate(-50%, -50%)',
  },
}

export default function Favorite({ favorite, index }) {
  /* modal */
  const [modal, setModal] = useState(false)

  function openModal() {
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }
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
      setModal(false)
      setTimeout(await deleteDoc(doc(favoritesCollectionRef, id)), 2000)
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

      /* console.log(favorite) */
      window.location.reload(false)
      toast('updated')
    } catch (err) {
      /* console.log(err) */
      toast(err)
    }
  }

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
                  Published on: {moment(favorite.date).format('MMMM DD, YYYY')}.
                </span>
                <span>
                  Saved on:{' '}
                  {moment
                    .unix(favorite.createdAt.seconds)
                    .format('MMMM DD, YYYY')}
                  .
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
                  onClick={openModal}
                >
                  Delete.
                </Button>
                <Modal
                  isOpen={modal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel='Warning'
                >
                  <div className='d-flex flex-column align-items-center'>
                    <span>Are you sure you want to delete this item</span>
                    <span>This action cannot be undone.</span>
                  </div>
                  <div className='d-flex justify-content-between mt-2'>
                    <Button
                      variant='secondary'
                      className='delete-btn'
                      onClick={closeModal}
                    >
                      Cancel.
                    </Button>
                    <Button
                      variant='danger'
                      className='delete-btn'
                      onClick={() => handleDeleteFavorite(favorite.id)}
                    >
                      Delete.
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className='favorite-card-comments'>
            {favorite.comments ? (
              <span>
                <strong>Comments:</strong> {favorite.comments}
              </span>
            ) : null}
          </div>
          <Form onSubmit={handleUpdateFavorite}>
            <div className='d-flex my-2'>
              <Form.Control
                type='text'
                className='outline-dark text-light bg-dark '
                placeholder='Would you like to add some comments?'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <Button
                variant='secondary'
                className='favorites-btn'
                type='submit'
              >
                submit
              </Button>
            </div>
          </Form>
        </Card.Body>
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
