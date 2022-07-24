import React, { useRef, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
export default function ForgotPassword() {
  const emailRef = useRef()

  /*   const [error, setError] = useState('') */
  const [loading, setLoading] = useState(false)
  /*   const [message, setMessage] = useState('') */

  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      /* setMessage('')
      setError('') */
      setLoading(true)
      await resetPassword(emailRef.current.value)
      toast('Check your recovery email.')
    } catch {
      toast('Error while trying to reset password.')
    }
    setLoading(false)
  }

  return (
    <div className='forms'>
      <div className='w-100' style={{ maxWidth: '800px' }}>
        <Card>
          <Card.Header>
            <span className='section-title text-dark'>
              forgot your password?
            </span>
          </Card.Header>
          {/* {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
 */}
          {/* {JSON.stringify(currentUser)} */}
          {/*  { currentUser &&   currentUser.email} */}
          {/* firebase uses localstorage; also an initial loading state */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='m-2'>
              <Form.Label className='m-2'>Email address</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Button className='m-2' disabled={loading} type='submit'>
              Reset password
            </Button>
          </Form>
          <div className='m-2'>
            Still don't have an account?{' '}
            <Link className='myLink' href='/signup'>
              Get one
            </Link>
            .
          </div>
          <div>
            <Link className='myLink' href='/'>
              False alarm? Log in
            </Link>
            .
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
