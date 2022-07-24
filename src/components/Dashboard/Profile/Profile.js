import React from 'react'
import { Card, Button, Nav } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'

import moment from 'moment'
export default function Profile() {
  const router = useRouter()
  const { currentUser, logout } = useAuth()

  return (
    <>
      <h2 className='section-title'>profile</h2>
      <Card className='profile card bg-dark text-light border-light'>
        <Card.Body>
          {/* {error && <Alert variant='danger'>{error}</Alert>}
           */}
          <div className='profile-info'>
            <div className='profile-info-top'>
              <span>
                Created on:{' '}
                {moment(currentUser.metadata.creationTime).format(
                  'MMMM DD, YYYY'
                )}
                .
              </span>

              <span>
                Last login on:{' '}
                {moment(currentUser.metadata.lastSignInTime).format(
                  'MMMM DD, YYYY'
                )}
                .
              </span>
            </div>
            <div className='profile-info-bottom'>
              <span>Email: {currentUser.email}</span>
              <Link className='myLink' href='/update-profile'>
                Update profile.
              </Link>
            </div>
          </div>
        </Card.Body>
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
      </Card>
    </>
  )
}
