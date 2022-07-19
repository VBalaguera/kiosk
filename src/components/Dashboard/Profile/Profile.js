import React from 'react'
import { Card, Button, Nav } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import moment from 'moment'
export default function Profile() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  return (
    <>
      <Card className='profile card bg-dark text-light border-light'>
        <Card.Body>
          <h2 className='section-title'>profile</h2>
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
              <Link className='myLink' to='/update-profile'>
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
