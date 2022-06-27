import { useState } from 'react'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/* nyt api */
import MostPopular from './components/MostPopular'
import MovieReviews from './components/MovieReviews'
import Books from './components/Books'
import PoliticsTopStories from './components/TopStories/PoliticsTopStories'
import OpinionTopStories from './components/TopStories/OpinionTopStories'
import ArtTopStories from './components/TopStories/ArtTopStories'
import SportsTopStories from './components/TopStories/Sports'
import BusinessTopStories from './components/TopStories/BusinessTopStories'
import UsTopStories from './components/TopStories/UsTopStories'
import WorldTopStories from './components/TopStories/WorldTopStories'
import TechnologyTopStories from './components/TopStories/TechTopStories'

/* miscellaneous */
import About from './components/About'

function App() {
  const sections = [
    'most popular',
    'us',
    'world',
    'politics',
    'business',
    'technology',
    'movie reviews',
    'books',
    'opinion',
    'sports',
    'art',
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
        <div className='d-flex flex-wrap flex-row'>
          {sections.map((section) => (
            <Nav.Link className='px-1 py-1 '>
              <Button
                variant='btn btn-outline-dark button p-1 fs-6'
                type='button'
                key={section}
                onClick={() => setMySection(section)}
              >
                {section}
              </Button>
            </Nav.Link>
          ))}
        </div>
        <div className='index'>
          <h1>{mySection}</h1>

          {mySection === 'most popular' && <MostPopular />}
          {mySection === 'art' && <ArtTopStories />}
          {mySection === 'movie reviews' && <MovieReviews />}
          {mySection === 'books' && <Books />}
          {mySection === 'opinion' && <OpinionTopStories />}
          {mySection === 'politics' && <PoliticsTopStories />}
          {mySection === 'business' && <BusinessTopStories />}
          {mySection === 'sports' && <SportsTopStories />}
          {mySection === 'us' && <UsTopStories />}
          {mySection === 'world' && <WorldTopStories />}
          {mySection === 'technology' && <TechnologyTopStories />}
          {mySection === 'about' && <About />}
        </div>
      </Container>
    </div>
  )
}

export default App
