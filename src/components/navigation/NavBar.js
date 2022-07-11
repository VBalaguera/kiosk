import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [mySection, setMySection] = useState(true)
  const { currentUser } = useAuth()
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <span className='title'>
            <Link to='/'>kiosk</Link>
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
                  <Link to='/dashboard'>dashboard</Link>
                </span>
              </Nav.Link>
            </>
          ) : null}
          <Nav.Link>
            <span className='link navbar-link'>
              <Link to='/about'>about</Link>
            </span>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  )
}
