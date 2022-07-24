import React, { useRef, useState, useEffect } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

import { ToastContainer, toast } from 'react-toastify'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  /* const [error, setError] = useState('') */
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { login, currentUser } = useAuth()

  /* this replaces PublicRoute from react versions */
  useEffect(() => {
    if (currentUser) {
      router.push('/kiosk')
    } else {
      router.push('/')
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      /* setError('') */
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      /* console.log('logged in!') */
      toast('welcome back!')
      router.push('/kiosk')
    } catch {
      /* setError('Error while login') */
      toast('Error while login')
    }
    setLoading(false)
  }

  return (
    <div className='forms'>
      <div className='w-100' style={{ maxWidth: '800px' }}>
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
              <Link className='myLink' href='/signup'>
                get one
              </Link>
              .
            </div>

            <div>
              <Link className='myLink' href='/forgot-password'>
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
