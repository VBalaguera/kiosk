import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { currentUser, updateEmail, updatePassword } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/kiosk')
      })
      .catch(() => {
        setError('failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })

    try {
      setError('')
      setLoading(true)

      console.log('info updated')
      navigate('/kiosk')
    } catch {
      setError('Error while updating account info')
    }
    setLoading(false)
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div style={{ minWidth: '400px' }}>
        <Card>
          <Card.Header>update profile</Card.Header>
          {error && <Alert variant='danger'>{error}</Alert>}
          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} type='submit'>
              update
            </Button>
          </Form>
          <div>
            Changed your mind? <Link to='/'>Cancel.</Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
