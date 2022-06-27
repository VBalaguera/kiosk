import { useState } from 'react'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import MostPopular from './components/MostPopular'
import TopStories from './components/TopStories'
import MovieReviews from './components/MovieReviews'
import Books from './components/Books'
import About from './components/About'

function App() {
  const sections = [
    'most popular',
    'top stories',
    'movie reviews',
    'books',
    'about',
  ]

  const [mySection, setMySection] = useState(true)

  return (
    <div className='App'>
      {/* <Navbar fluid expand='lg' fixed='top' className='justify-space-between'>
        <Navbar.Brand>kiosk</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='d-flex justify-content-end'
        >
          <Nav
            className=' my-2 my-lg-0'
            style={{ maxHeight: '400px' }}
            navbarScroll
          >
            {sections.map((section) => (
              <Nav.Link>
                <Button
                  variant='primary'
                  type='button'
                  key={section}
                  onClick={() => setMySection(section)}
                >
                  {section}
                </Button>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>kiosk</Navbar.Brand>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-end'
          >
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              {sections.map((section) => (
                <Nav.Link>
                  <Button
                    variant='btn btn-outline-light'
                    type='button'
                    key={section}
                    onClick={() => setMySection(section)}
                  >
                    {section}
                  </Button>
                </Nav.Link>
              ))}
            </Nav>
            {/* <Nav className='me-auto '>
              {sections.map((section) => (
                <Nav.Link>
                  <Button
                    variant='btn btn-outline-light'
                    type='button'
                    key={section}
                    onClick={() => setMySection(section)}
                  >
                    {section}
                  </Button>
                </Nav.Link>
              ))}
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-5 pt-4'>
        <div className='most-popular'>
          <h1>{mySection}</h1>
          {mySection === 'most popular' && <MostPopular />}
          {mySection === 'top stories' && <TopStories />}
          {mySection === 'movie reviews' && <MovieReviews />}
          {mySection === 'books' && <Books />}
          {mySection === 'about' && <About />}
        </div>
      </Container>
    </div>
  )
}

export default App
