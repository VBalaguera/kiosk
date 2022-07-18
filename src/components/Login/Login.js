import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  /* const [error, setError] = useState('') */
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      /* setError('') */
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      /* console.log('logged in!') */
      toast('welcome back!')
      navigate('/kiosk')
    } catch {
      /* setError('Error while login') */
      toast('Error while login')
    }
    setLoading(false)
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div style={{ minWidth: '400px' }}>
        <Card>
          <Card.Header>
            <span className='section-title text-dark'>login</span>
          </Card.Header>
          {/* {error && <Alert variant='danger'>{error}</Alert>} */}
          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='m-2'>
              <Form.Label className='m-2'>Email address</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group className='m-2' id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Button
              className='m-2'
              variant='secondary'
              disabled={loading}
              type='submit'
            >
              sign up
            </Button>
          </Form>
          <div className='m-2'>
            <div>
              Still don't have an account?{' '}
              <Link className='myLink' to='/signup'>
                get one
              </Link>
              .
            </div>
            <div>
              <Link className='myLink' to='/forgot-password'>
                Forgot your password?
              </Link>
            </div>
          </div>
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
