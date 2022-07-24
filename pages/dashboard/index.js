import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import { useAuth } from '../../src/context/AuthContext'

import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify'

import Favorites from '../../src/components/Dashboard/Favorites/Favorites'
import Profile from '../../src/components/Dashboard/Profile/Profile'
import Notes from '../notes'

import Layout from '../../src/components/layout'

export default function Dashboard() {
  const { currentUser, logout } = useAuth()

  const router = useRouter()
  useEffect(() => {
    if (currentUser && currentUser.email) {
    } else if (currentUser == null) {
      router.push('/')
    }
  }, [])

  if (!currentUser) {
    return null
  }

  const sections = ['favorites', 'profile', 'notes']

  async function handleLogOut() {
    /* setError('') */
    try {
      await logout()
      toast('bye')
      router.push('/')
    } catch {
      /* setError('error while logging out') */
      toast('error while logging out')
    }
  }

  /* console.log('favoritesSection', favoritesSection)
  console.log('allSections', allSections) */

  return (
    <>
      <Layout>
        {' '}
        <h1 className='page-title'>dashboard</h1>
        <Favorites />
        <br />
        <Profile />
        <br />
        <Notes />
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
      </Layout>
    </>
  )
}
