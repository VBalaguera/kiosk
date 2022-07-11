import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return !currentUser && !currentUser.email ? (
    children
  ) : (
    <Navigate to='/kiosk' replace />
  )
}

export default PublicRoute
