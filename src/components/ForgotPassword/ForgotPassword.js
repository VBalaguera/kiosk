import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('check your recovery email')
    } catch {
      setError('Error while login')
    }
    setLoading(false)
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div style={{ minWidth: '400px' }}>
        <Card>
          <Card.Header>forgot password</Card.Header>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}

          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} type='submit'>
              Reset password
            </Button>
          </Form>
          <div>
            Still don't have an account? <Link to='/signup'>get one</Link>
          </div>
          <div>
            <Link to='/'>log in?</Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
