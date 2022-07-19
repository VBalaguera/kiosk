import React, { useState, useEffect } from 'react'
import { Card, Button, Nav } from 'react-bootstrap'

import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'

import Favorites from '../Dashboard/Favorites/Favorites'
import Profile from '../Dashboard/Profile/Profile'
import Notes from './Notes'

export default function Dashboard() {
  /*   const [error, setError] = useState('') */
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const sections = ['favorites', 'profile', 'notes']

  const [mySection, setMySection] = useState(true)

  async function handleLogOut() {
    /* setError('') */
    try {
      await logout()
      toast('bye')
      navigate('/')
    } catch {
      /* setError('error while logging out') */
      toast('error while logging out')
    }
  }

  /* console.log('favoritesSection', favoritesSection)
  console.log('allSections', allSections) */

  return (
    <>
      <h1 className='section-title'>dashboard</h1>
      {/* <div className='d-flex justify-content-center flex-wrap flex-row mb-3'>
        {sections.map((section, index) => (
          <Nav.Link key={index} className='px-1 py-1 '>
            <Button
              variant='btn btn-outline-light button p-1 kiosk'
              type='button'
              key={section}
              onClick={() => setMySection(section)}
            >
              {section}
            </Button>
          </Nav.Link>
        ))}
      </div> */}

      <Favorites />
      <br />
      <Profile />
      <br />
      <Notes />
      {/* {mySection === 'favorites' && <Favorites />}
      {mySection === 'profile' && <Profile />}
      {mySection === 'notes' && <Notes />} */}

      <div>
        <Button
          className='logout-btn'
          variant='secondary'
          onClick={handleLogOut}
        >
          log out
        </Button>
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
    </>
  )
}
