import { useState, useEffect } from 'react'
import { Card, Button, Form } from 'react-bootstrap'

import {
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'

export default function Notes() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [notes, setNotes] = useState([])

  const { currentUser } = useAuth()
  const notesCollectionRef = collection(
    db,
    'notes',
    currentUser.email,
    currentUser.uid
  )

  /* getting notes */
  const q = query(
    notesCollectionRef,
    where('user', '==', String(currentUser.uid))
  )
  /* TODO: revisit and polish this code asap */

  const getNotes = async () => {
    const data = await getDocs(q)
    /*       console.log(currentUser.uid) */
    setNotes(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        user: currentUser.uid,
      }))
    )
  }

  /* writing notes */

  const handleUpdateFavorite = async (e) => {
    e.preventDefault()
    try {
      await addDoc(notesCollectionRef, {
        title: title,
        description: description,
        created: Timestamp.now(),
        user: currentUser.uid,
      })

      /* console.log(favorite) */
      /* window.location.reload(false) */
      toast('note created')
    } catch (err) {
      /* console.log(err) */
      toast(err)
      console.log(err)
    }
  }

  useEffect(() => {
    getNotes()
    console.log(notes)
  }, [])

  return (
    <>
      <div>
        <div className='notes-read'>
          <h1>notes</h1>
          {notes.map((note, index) => (
            /* TODO: I should use the same Favorites/Favorite approach, props and everything; CRUD will be easier then */
            <Card key={index} className='bg-dark text-light border-light'>
              <h2>{note.title}</h2>
              <span>{note.description}</span>
              <span>
                Written on:{' '}
                {moment.unix(note.created.seconds).format('MMMM DD, YYYY')}.
              </span>
            </Card>
          ))}
        </div>
        <div className='notes-write'>
          <h1>write a note</h1>
          <Form onSubmit={handleUpdateFavorite}>
            <div className='d-flex my-2'>
              <Form.Control
                type='text'
                className='outline-dark text-light bg-dark '
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Form.Control
                type='text'
                className='outline-dark text-light bg-dark '
                placeholder='description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
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
        </div>
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
      </div>
    </>
  )
}
