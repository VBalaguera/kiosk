import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

export default function NavBar() {
  const [mySection, setMySection] = useState(true)
  const { currentUser } = useAuth()
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <span className='title'>kiosk</span>
          {currentUser ? (
            <>
              <Nav.Link>
                <span
                  className='link navbar-link'
                  onClick={() => setMySection('search')}
                >
                  search
                </span>
                <span
                  className='link navbar-link'
                  onClick={() => setMySection('about')}
                >
                  about
                </span>
              </Nav.Link>
            </>
          ) : (
            <span>nothing</span>
          )}
        </Container>
      </Navbar>
    </>
  )
}
