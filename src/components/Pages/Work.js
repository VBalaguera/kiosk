import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Select from 'react-select'

const options = [
  { value: 'es', label: 'es' },
  { value: 'us', label: 'us' },
  { value: 'fr', label: 'fr' },
]

export default function Work() {
  const [works, setWorks] = useState([])
  const [location, setLocation] = useState(null)

  function getNewsByCountry(e) {
    const location = e.target.value
    const adzunaUrl = `
https://newsapi.org/v2/top-headlines?country=${location}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`
    axios
      .get(adzunaUrl)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* useEffect(() => {
    const adzunaUrl = `
https://newsapi.org/v2/top-headlines?country=${location}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`
    axios
      .get(adzunaUrl)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []) */

  return (
    <div>
      <h1 className='text-light'>working</h1>
      {/* <Select value={location} onChange={getNewsByCountry} options={options} /> */}
      <button value='us' onClick={getNewsByCountry}>
        us
      </button>
      <button value='fr' onClick={getNewsByCountry}>
        fr
      </button>
      <button value='es' onClick={getNewsByCountry}>
        es
      </button>
    </div>
  )
}
