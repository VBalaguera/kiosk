import { useState, useEffect } from 'react'

import * as api from './articlesApi'

const useFetch = () => {
  const [data, setData] = useState({
    slug: '',
    results: [],
  })

  useEffect(() => {
    if (data.slug !== '') {
      const timeoutId = setTimeout(() => {
        // ...
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [data.slug])

  return
}

export default useFetch
