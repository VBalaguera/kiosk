import { useState, useEffect } from 'react'
import { Card, Button, Form } from 'react-bootstrap'

import {
  addDoc,
  getDocs,
  query,
  collection,
  orderBy,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db } from '../../src/firebase'
import { useAuth } from '../../src/context/AuthContext'

import Note from '../../src/components/Notes/Note'

import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'

export default function Notes() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

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

    const notes = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      user: currentUser.uid,
    }))
    /* desc order: from newest to oldest */
    const sortedAsc = notes.sort(
      (objA, objB) =>
        Number(objA.created.seconds) - Number(objB.created.seconds)
    )
    setNotes(sortedAsc)
  }

  /* writing notes */

  const handleWriteNote = async (e) => {
    e.preventDefault()
    try {
      await addDoc(notesCollectionRef, {
        title: title,
        description: description,
        content: content,
        created: Timestamp.now(),
        user: currentUser.uid,
      })

      /* console.log(favorite) */
      /* TOOD: find alternatives! */
      window.location.reload(false)
      toast('note created')
    } catch (err) {
      /* console.log(err) */
      toast(err)
      console.log(err)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>
      <div>
        <div className='notes-read'>
          <h1 className='section-title'>notes</h1>

          <>
            {notes.length > 0 ? (
              <>
                return (
                <>
                  <div className='grid-example'>
                    {notes.map((note, index) => (
                      /* TODO: I should use the same Favorites/Favorite approach, props and everything; CRUD will be easier then */
                      <>
                        <Note note={note} index={index} />
                      </>
                    ))}
                  </div>
                </>
                )
              </>
            ) : (
              <div className='mt-4'>
                <>
                  <span className='text-light'>
                    You have no notes yet. Take your time.
                  </span>
                </>
              </div>
            )}
          </>
        </div>
        <div className='notes-write my-3'>
          <h1 className='section-title'>write a note</h1>
          <Form onSubmit={handleWriteNote}>
            <div className='notes-write-form'>
              <Form.Control
                type='text'
                className='outline-dark text-light bg-dark my-1'
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Form.Control
                className='form-control outline-dark text-light bg-dark my-1'
                placeholder='description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <textarea
                className='form-control outline-dark text-light bg-dark my-1'
                placeholder='content'
                onChange={(e) => setContent(e.target.value)}
                value={content}
                rows='3'
              />
              <Button
                variant='secondary'
                className='favorites-btn my-1'
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
