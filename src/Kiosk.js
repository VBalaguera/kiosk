import { useState } from 'react'
import { Button, Nav } from 'react-bootstrap'

/* nyt api */

import ArticleSearch from './components/ArticleSearch/ArticleSearch'

import MostPopular from './components/kiosk/nyt/MostPopular'
import MovieReviews from './components/kiosk/nyt/MovieReviews'
import Books from './components/kiosk/nyt/Books'
import PoliticsTopStories from './components/kiosk/nyt/TopStories/PoliticsTopStories'
import OpinionTopStories from './components/kiosk/nyt/TopStories/OpinionTopStories'
import ArtTopStories from './components/kiosk/nyt/TopStories/ArtTopStories'
import SportsTopStories from './components/kiosk/nyt/TopStories/Sports'
import BusinessTopStories from './components/kiosk/nyt/TopStories/BusinessTopStories'
import UsTopStories from './components/kiosk/nyt/TopStories/UsTopStories'
import WorldTopStories from './components/kiosk/nyt/TopStories/WorldTopStories'
import TechnologyTopStories from './components/kiosk/nyt/TopStories/TechTopStories'

/* miscellaneous */
import About from './components/About'

export default function Kiosk() {
  const sections = [
    'most popular',
    'us',
    'world',
    'politics',
    'business',
    'tech',
    'movie reviews',
    'books',
    'opinion',
    'sports',
    'art',
    'search',
  ]

  const [mySection, setMySection] = useState(true)
  return (
    <div>
      <div className='d-flex justify-content-between flex-wrap flex-row mb-5'>
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
      <div className='index'>
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
    </div>
  )
}
