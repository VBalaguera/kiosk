import { useState } from 'react'
import { Button, Nav } from 'react-bootstrap'

/* nyt api */

import ArticleSearch from '../kiosk/nyt/ArticleSearch/ArticleSearch'

import MostPopular from '../kiosk/nyt/MostPopular'
import MovieReviews from '../kiosk/nyt/MovieReviews'
import Books from '../kiosk/nyt/Books'
import PoliticsTopStories from '../kiosk/nyt/TopStories/PoliticsTopStories'
import OpinionTopStories from '../kiosk/nyt/TopStories/OpinionTopStories'
import ArtTopStories from '../kiosk/nyt/TopStories/ArtTopStories'
import SportsTopStories from '../kiosk/nyt/TopStories/Sports'
import BusinessTopStories from '../kiosk/nyt/TopStories/BusinessTopStories'
import UsTopStories from '../kiosk/nyt/TopStories/UsTopStories'
import WorldTopStories from '../kiosk/nyt/TopStories/WorldTopStories'
import TechnologyTopStories from '../kiosk/nyt/TopStories/TechTopStories'

/* miscellaneous */
import About from './About'

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
      <div className='d-flex justify-content-center flex-wrap flex-row mb-3'>
        {sections.map((section, index) => (
          <Nav.Link key={index} className='px-1 py-1 '>
            <Button
              variant='btn btn-outline-light button p-1 kiosk'
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
        {mySection === 'tech' && <TechnologyTopStories />}
        {mySection === 'about' && <About />}
        {mySection === 'search' && <ArticleSearch />}
      </div>
    </div>
  )
}
