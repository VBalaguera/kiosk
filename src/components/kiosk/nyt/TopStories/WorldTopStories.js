import { useState, useEffect } from 'react'

import axios from 'axios'
import PostCard from '../../../PostCard'
import { useAuth } from '../../../../context/AuthContext'

import data from '../../../../data/nytWorld.json'
const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

export default function WorldTopStories() {
  const [posts, setPosts] = useState([])
  const { currentUser } = useAuth()
  useEffect(() => {
    /* top stories */
    axios
      .get(nytTopStoriesUrl)
      .then((response) => {
        /*      console.log(response.data.results) */
        setPosts(response.data.results.slice(2))
      })
      .catch((err) => {
        /*  console.log(err) */
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
