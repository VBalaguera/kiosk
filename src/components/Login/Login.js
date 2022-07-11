import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      console.log('logged in!')
      navigate('/kiosk')
    } catch {
      setError('Error while login')
    }
    setLoading(false)
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div style={{ minWidth: '400px' }}>
        <Card>
          <Card.Header>login</Card.Header>
          {error && <Alert variant='danger'>{error}</Alert>}
          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} type='submit'>
              sign up
            </Button>
          </Form>
          <div>
            Still don't have an account? <Link to='/signup'>get one</Link>
          </div>
          <div>
            <Link to='/forgot-password'>Forgot your password?</Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
