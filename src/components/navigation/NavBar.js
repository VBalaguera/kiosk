import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const [mySection, setMySection] = useState(true)
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
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <span className='title'>
            <Link className='myLink' to='/'>
              kiosk
            </Link>
          </span>
          {currentUser ? (
            <>
              <Nav.Link>
                <span
                  className='link navbar-link'
                  onClick={() => setMySection('search')}
                >
                  search
                </span>
              </Nav.Link>
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
          <Nav.Link>
            <span className='link navbar-link'>
              <Link className='myLink' to='/about'>
                about
              </Link>
            </span>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  )
}
