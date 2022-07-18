import React, { useRef, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  /*   const [error, setError] = useState('') */
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
        navigate('/kiosk')
      })
      .catch(() => {
        /*     setError('failed to update account') */
        toast('failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })

    try {
      /*       setError('') */
      setLoading(true)

      console.log('info updated')
      navigate('/kiosk')
    } catch {
      /*       setError('Error while updating account info') */
      toast('Error while updating account info')
    }
    setLoading(false)
  }

  function handleDeleteUser(uid) {
    try {
      setLoading(true)
      deleteUser(uid)
      toast('bye :(')
      console.log('user with uid', { uid }, ' deleted')
      navigate('/')
    } catch {
      toast('Error when deleting user')
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div style={{ minWidth: '400px' }}>
        <Card>
          <Card.Header>
            <span className='section-title text-dark'>update profile</span>
          </Card.Header>
          {/*  {error && <Alert variant='danger'>{error}</Alert>} */}
          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

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
            <Link className='myLink' to='/'>
              Cancel
            </Link>
            .
          </div>
          <Button
            variant='secondary'
            className='delete-btn'
            onClick={() => handleDeleteUser(currentUser.uid)}
          >
            delete user
          </Button>
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
