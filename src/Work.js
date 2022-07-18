import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_API_KEY}`

export default function Work() {
  const [works, setWorks] = useState([])

  useEffect(() => {
    axios
      .get(adzunaUrl)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return <div>Work</div>
}
