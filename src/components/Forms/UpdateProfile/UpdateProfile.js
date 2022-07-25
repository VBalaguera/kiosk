import React, { useRef, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

export default function UpdateProfile() {
  /* modal */
  const [modal, setModal] = useState(false)

  function openModal() {
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  /*   const [error, setError] = useState('') */
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { currentUser, updateEmail, updatePassword, deleteUser } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return toast('passwords do not match')
    }

    const promises = []
    setLoading(true)
    /*     setError('') */
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        toast('account updated successfully')
        router.push('/kiosk')
      })
      .catch(() => {
        /*     setError('failed to update account') */
        toast('failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })

    try {
      setLoading(true)

      toast('info updated')
      router.push('/kiosk')
    } catch {
      toast('Error while updating account info')
    }
    setLoading(false)
  }

  function handleDeleteUser(uid) {
    try {
      setModal(false)
      setLoading(true)
      deleteUser(uid)
      toast('bye :(')
      toast('user with uid', { uid }, ' deleted')
      router.push('/')
    } catch {
      toast('Error when deleting user')
    }
  }

  return (
    <div className='forms'>
      <div className='w-100' style={{ maxWidth: '800px' }}>
        <Card>
          <Card.Header>
            <span className='section-title text-dark'>update profile</span>
          </Card.Header>

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='m-2'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password' className='m-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='confirmPassword' className='m-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} type='submit'>
              update
            </Button>
          </Form>
          <div className='m-2'>
            Changed your mind?{' '}
            <Link className='myLink' href='/'>
              Cancel
            </Link>
            .
          </div>
          <Button variant='danger' className='delete-btn' onClick={openModal}>
            delete user
          </Button>
          <Modal
            isOpen={modal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Warning'
          >
            <div className='d-flex flex-column align-items-center'>
              <span>Are you sure you want to delete your account?</span>
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
                onClick={() => handleDeleteUser(currentUser.uid)}
              >
                delete user
              </Button>
            </div>
          </Modal>
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
      </div>
    </div>
  )
}
