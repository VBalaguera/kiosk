import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'
export default function NavBar() {
  const [mySection, setMySection] = useState(true)
  /*   const [error, setError] = useState('') */
  const { currentUser, logout } = useAuth()
  const router = useRouter()
  async function handleLogOut() {
    /* setError('') */
    try {
      await logout()
      toast('bye')
      router.push('/')
    } catch {
      toast('error while logging out')
      /* setError('error while logging out') */
    }
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        className='fixed-top'
      >
        <Container>
          <div>
            <span className='title'>
              <Link className='myLink' href='/'>
                kiosk
              </Link>
            </span>
          </div>
          <div className='d-flex'>
            {currentUser ? (
              <>
                <span className='link navbar-link'>
                  <Link className='myLink' href='/dashboard'>
                    dashboard
                  </Link>
                </span>

                <span className='myLink hover' onClick={handleLogOut}>
                  logout
                </span>
              </>
            ) : null}
            {!currentUser ? (
              <span className='link navbar-link'>
                <Link className='myLink' href='/'>
                  login
                </Link>
              </span>
            ) : null}

            <span className='link navbar-link'>
              <Link className='myLink' href='/about'>
                about
              </Link>
            </span>
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
