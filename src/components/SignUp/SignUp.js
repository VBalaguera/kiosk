import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { signup } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        displayNameRef.current.value
      )
      console.log('account created!')
      navigate('/kiosk')
    } catch {
      setError('Error while creating an account')
    }
    setLoading(false)
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div style={{ minWidth: '400px' }}>
        <Card>
          <Card.Header>sign up</Card.Header>
          {error && <Alert variant='danger'>{error}</Alert>}
          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='displayName' className='m-2'>
              <Form.Label>Display name</Form.Label>
              <Form.Control type='displayName' ref={displayNameRef} required />
            </Form.Group>
            <Form.Group id='email' className='m-2'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
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
              sign up
            </Button>
          </Form>
          <div className='m-2'>
            Already have an account?{' '}
            <Link className='myLink' to='/'>
              Let's go.
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
