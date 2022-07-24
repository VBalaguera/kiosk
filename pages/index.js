import { Container } from 'react-bootstrap'

/* auth */
import { AuthProvider } from '../src/context/AuthContext'

/* routing */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute'
import PublicRoute from '../src/components/PublicRoute/PublicRoute'

/* pages */
import Kiosk from './kiosk'
import Work from './work'
import Notes from './notes'
import About from './about'
import Dashboard from './dashboard'

/* forms */
import SignUp from '../src/components/Forms/SignUp/SignUp'
import Login from '../src/components/Forms/Login/Login'
import ForgotPassword from '../src/components/Forms/ForgotPassword/ForgotPassword'
import UpdateProfile from '../src/components/Forms/UpdateProfile/UpdateProfile'

import Layout from '../src/components/layout'
const Home = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export default Home
