import { useState } from 'react'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/* nyt api */
import MostPopular from './components/MostPopular'
import TopStories from './components/TopStories'
import MovieReviews from './components/MovieReviews'
import Books from './components/Books'
import PoliticsTopStories from './components/PoliticsTopStories'
import OpinionTopStories from './components/OpinionTopStories'

import About from './components/About'

function App() {
  const sections = [
    'most popular',
    'politics',
    'movie reviews',
    'books',
    'opinion',
    'arts',
    'about',
  ]

  const [mySection, setMySection] = useState(true)

  return (
    <div className='App'>
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
                <Nav.Link className='px-1 py-0'>
                  <Button
                    variant='btn btn-outline-light button p-1 fs-6'
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
        </Container>
      </Navbar>
      <Container className='mt-2'>
        <div className='index'>
          <h1>{mySection}</h1>
          {mySection === 'most popular' && <MostPopular />}
          {mySection === 'top stories' && <TopStories />}
          {mySection === 'movie reviews' && <MovieReviews />}
          {mySection === 'books' && <Books />}
          {mySection === 'opinion' && <OpinionTopStories />}
          {mySection === 'politics' && <PoliticsTopStories />}
          {mySection === 'about' && <About />}
        </div>
      </Container>
    </div>
  )
}

export default App
