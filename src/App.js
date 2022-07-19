import { Container } from 'react-bootstrap'
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/* auth */
import { AuthProvider } from './context/AuthContext'

/* routing */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'

/* pages */
import Kiosk from './components/Pages/Kiosk'
import Work from './components/Pages/Work'
import Notes from './components/Pages/Notes'
import About from './components/Pages/About'
import Dashboard from './components/Pages/Dashboard'

/* forms */
import SignUp from './components/Forms/SignUp/SignUp'
import Login from './components/Forms/Login/Login'
import ForgotPassword from './components/Forms/ForgotPassword/ForgotPassword'
import UpdateProfile from './components/Forms/UpdateProfile/UpdateProfile'

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
