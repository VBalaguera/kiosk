import { useState, useEffect } from 'react'

import Layout from '../../src/components/layout'
import { useAuth } from '../../src/context/AuthContext'

import { useRouter } from 'next/router'

/* nyt api */

import ArticleSearch from '../../src/components/kiosk/nyt/ArticleSearch/ArticleSearch'

import MostPopular from '../../src/components/kiosk/nyt/MostPopular'
import MovieReviews from '../../src/components/kiosk/nyt/MovieReviews'
import Books from '../../src/components/kiosk/nyt/Books'
import PoliticsTopStories from '../../src/components/kiosk/nyt/TopStories/PoliticsTopStories'
import OpinionTopStories from '../../src/components/kiosk/nyt/TopStories/OpinionTopStories'
import ArtTopStories from '../../src/components/kiosk/nyt/TopStories/ArtTopStories'
import SportsTopStories from '../../src/components/kiosk/nyt/TopStories/Sports'
import BusinessTopStories from '../../src/components/kiosk/nyt/TopStories/BusinessTopStories'
import UsTopStories from '../../src/components/kiosk/nyt/TopStories/UsTopStories'
import WorldTopStories from '../../src/components/kiosk/nyt/TopStories/WorldTopStories'
import TechnologyTopStories from '../../src/components/kiosk/nyt/TopStories/TechTopStories'

/* miscellaneous */
import Welcome from '../../src/components/Welcome/Welcome'
import Sections from '../../src/components/navigation/Sections'

export default function Kiosk() {
  const { currentUser } = useAuth()
  const [mySection, setMySection] = useState(undefined)

  const router = useRouter()
  useEffect(() => {
    if (currentUser && currentUser.email) {
    } else if (currentUser == null) {
      router.push('/')
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

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

  return (
    <Layout>
      <Sections sections={sections} setMySection={setMySection} />
      <div className='index'>
        {/* <WeatherWidget /> */}
        <h1 className='section-title text-light '>{mySection}</h1>
        {mySection === undefined && (
          <Welcome sections={sections} setMySection={setMySection} />
        )}

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
        {mySection === 'search' && <ArticleSearch />}
      </div>
    </Layout>
  )
}
