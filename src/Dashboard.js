import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  async function handleLogOut() {
    setError('')
    try {
      await logout()
      navigate('/')
    } catch {
      setError('error while logging out')
    }
  }
  return (
    <>
      <h1>dashboard</h1>
      <Card>
        <Card.Body>
          <h2>profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div>
            <span>email: {currentUser.email}</span>
            <Link to='/update-profile'>update profile</Link>
          </div>
        </Card.Body>
      </Card>
      <div>
        <Button variant='link' onClick={handleLogOut}>
          log out
        </Button>
      </div>
    </>
  )
}
