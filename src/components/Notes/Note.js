import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'

import Modal from 'react-modal'
/* modal styles */
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0',
    width: '400px',
    color: 'black',
    transform: 'translate(-50%, -50%)',
  },
}

export default function Note({ note, index }) {
  const [title, setTitle] = useState(note.title)
  const [description, setDescription] = useState(note.description)
  const [content, setContent] = useState(note.content)

  const [editModal, setEditModal] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)

  function openEditModal() {
    setEditModal(true)
  }

  function closeEditModal() {
    setEditModal(false)
  }
  function openDeleteModal() {
    setDeleteModal(true)
  }

  function closeDeleteModal() {
    setDeleteModal(false)
  }

  const { currentUser } = useAuth()
  const notesCollectionRef = collection(
    db,
    'notes',
    currentUser.email,
    currentUser.uid
  )

  const handleUpdateNote = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(doc(notesCollectionRef, note.id), {
        title: title,
        description: description,
        content: content,
      })

      /* console.log(favorite) */
      window.location.reload(false)
      toast('updated')
    } catch (err) {
      /* console.log(err) */
      toast(err)
    }
  }

  const handleDeleteNote = async (id) => {
    try {
      setEditModal(false)
      setTimeout(await deleteDoc(doc(notesCollectionRef, id)), 2000)
      console.log('Entire Document has been deleted successfully.')
      toast(`Document with id ${id} has been deleted successfully.`)

      window.location.reload(false)
    } catch (err) {
      console.log(err)
      toast(err)
    }
  }
  return (
    <>
      <Card key={index} className='note bg-dark text-light border-light '>
        <div className='d-flex flex-column align-items-stretch'>
          <h2 className='section-title note-title'>{note.title}</h2>
          <div className='note-date-description'>
            <span className='note-date'>
              Written on:{' '}
              {moment.unix(note.created.seconds).format('MMMM DD, YYYY')}.
            </span>
            <span className='note-description'>{note.description}</span>
          </div>
          <div className='note-content'>
            <p>{note.content}</p>
          </div>
          <div>
            <Button
              variant='secondary'
              className='delete-btn mx-2'
              onClick={openEditModal}
            >
              Edit note.
            </Button>
            <Button
              variant='warning'
              className='favorites-btn mx-2'
              onClick={openDeleteModal}
            >
              Delete.
            </Button>
          </div>
        </div>
        {/* edit modal */}
        <Modal
          isOpen={editModal}
          onRequestClose={closeEditModal}
          style={customStyles}
        >
          <Card className='card bg-dark text-light border-light'>
            <Form onSubmit={handleUpdateNote}>
              <div className='notes-write-form'>
                <h1 className='section-title text-center'>Edit your note</h1>
                <Form.Control
                  type='text'
                  className='outline-dark text-light bg-dark my-2'
                  /* placeholder='title' */
                  defaultValue={note.title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Form.Control
                  className='form-control outline-dark text-light bg-dark my-2'
                  /* placeholder='description' */
                  defaultValue={note.description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <textarea
                  className='form-control outline-dark text-light bg-dark my-2'
                  /* placeholder='content' */
                  defaultValue={note.content}
                  onChange={(e) => setContent(e.target.value)}
                  rows='3'
                  required
                />
                <Button
                  variant='secondary'
                  className='favorites-btn my-2'
                  type='submit'
                >
                  Update note.
                </Button>
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
            </Form>
          </Card>
        </Modal>
        {/* delete modal */}
        <Modal
          isOpen={deleteModal}
          onRequestClose={closeDeleteModal}
          style={customStyles}
          contentLabel='Warning'
        >
          <Card className='card bg-dark text-light border-light'>
            <h1 className='section-title text-center'>Warning</h1>
            <div className='d-flex flex-column align-items-center'>
              <span>Are you sure you want to delete this item</span>
              <span>This action cannot be undone.</span>
            </div>
            <div className='d-flex my-2  justify-content-center'>
              <Button
                variant='secondary'
                className='delete-btn mx-2'
                onClick={closeDeleteModal}
              >
                Cancel.
              </Button>
              <Button
                variant='danger'
                className='delete-btn mx-2'
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete.
              </Button>
            </div>
          </Card>
        </Modal>
      </Card>
    </>
  )
}
