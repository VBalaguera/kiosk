import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
export default function NavBar() {
  const [mySection, setMySection] = useState(true)
  /*   const [error, setError] = useState('') */
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  async function handleLogOut() {
    /* setError('') */
    try {
      await logout()
      toast('bye')
      navigate('/')
    } catch {
      toast('error while logging out')
      /* setError('error while logging out') */
    }
  }
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <span className='title'>
            <Link className='myLink' to='/'>
              kiosk
            </Link>
          </span>
          <div className='d-flex'>
            {currentUser ? (
              <>
                <Nav.Link>
                  <span className='link navbar-link'>
                    <Link className='myLink' to='/dashboard'>
                      dashboard
                    </Link>
                  </span>
                </Nav.Link>
                <Nav.Link>
                  <span className='link navbar-link ' onClick={handleLogOut}>
                    <span className='myLink'>logout</span>
                  </span>
                </Nav.Link>
              </>
            ) : null}
            {!currentUser ? (
              <Nav.Link>
                <span className='link navbar-link'>
                  <Link className='myLink' to='/'>
                    login
                  </Link>
                </span>
              </Nav.Link>
            ) : null}
            <Nav.Link>
              <span className='link navbar-link'>
                <Link className='myLink' to='/about'>
                  about
                </Link>
              </span>
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
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
    </>
  )
}
