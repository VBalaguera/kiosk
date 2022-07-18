import { Container, Button, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/* TODO! fix this */
/* import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'


import WeatherWidget from './components/WeatherWidget/WeatherWidget' */

/* auth */
import { AuthProvider } from './context/AuthContext'
import SignUp from './components/SignUp/SignUp'

/* routing */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
/* kiosk */
import Kiosk from './Kiosk'
import Work from './Work'

import Notes from './Notes'

import About from './components/About'

import Dashboard from './Dashboard'
import Login from './components/Login/Login'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'

import NavBar from './components/navigation/NavBar'
import Footer from './components/navigation/Footer'

function App() {
  return (
    <AuthProvider>
      <div className='App bg-dark'>
        <BrowserRouter>
          <Container className='pb-5' style={{ minHeight: '95vh' }}>
            <NavBar />
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route exact path='/signup' element={<SignUp />} />
              <Route
                exact
                path='/dashboard'
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path='/update-profile'
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path='/notes'
                element={
                  <PrivateRoute>
                    <Notes />
                  </PrivateRoute>
                }
              ></Route>
              <Route path='/kiosk' element={<Kiosk />} />
              {/* <Route path='/work' element={<Work />} /> */}
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
