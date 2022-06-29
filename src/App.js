import { useState } from 'react'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/* nyt api */

import ArticleSearch from './components/ArticleSearch/ArticleSearch'

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

import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'

/* weather widget */
import WeatherWidget from './components/WeatherWidget/WeatherWidget'

import Footer from './components/navigation/Footer'

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
  ]

  const [mySection, setMySection] = useState(true)

  return (
    <div className='App bg-dark'>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <span className='title'>kiosk</span>

          {/* <Navbar.Toggle aria-controls='responsive-navbar-nav' />
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
          </Navbar.Collapse> */}
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
        </Container>
      </Navbar>
      <Container className='mt-2 pb-5'>
        <div className='d-flex flex-wrap flex-row mb-5'>
          {sections.map((section, index) => (
            <Nav.Link key={index} className='px-1 py-1 '>
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
        </div>
        <div className='index min-vh-100 w-100'>
          {/* <WeatherWidget /> */}
          <h1 className='section-title text-light '>{mySection}</h1>

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
          {mySection === 'search' && <ArticleSearch />}
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default App
