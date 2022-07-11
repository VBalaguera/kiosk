import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser && currentUser.email ? (
    children
  ) : (
    <Navigate to='/' replace />
  )
}

export default PrivateRoute
