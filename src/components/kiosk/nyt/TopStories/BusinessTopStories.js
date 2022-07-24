import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

import moment from 'moment'
import { useAuth } from '../../../../context/AuthContext'
import PostCard from '../../../PostCard'

import SharingButtons from '../../../Sharing/SharingButtons'

import data from '../../../../data/nytBusiness.json'

const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function BusinnessTopStories() {
  const [posts, setPosts] = useState([])
  const { currentUser } = useAuth()
  useEffect(() => {
    /* top stories */
    axios
      .get(nytTopStoriesUrl)
      .then((response) => {
        /*  console.log(response.data.results) */
        setPosts(response.data.results)
      })
      .catch((err) => {
        /* console.log(err) */
        setPosts(data)
      })
  }, [])
  return (
    <div>
      <div className='top-stories grid-example'>
        {posts.map((post, index) => (
          <>
            <PostCard post={post} user={currentUser} />
          </>
        ))}
      </div>
    </div>
  )
}
