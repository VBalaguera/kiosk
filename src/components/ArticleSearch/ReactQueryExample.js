import React from 'react'

import { useQuery } from 'react-query'
import * as api from './articlesApi'

export default function ReactQueryExample({ setQuery }) {
  const { data, isLoading, isError, error } = useQuery('posts', api.getResults)

  if (isLoading) {
    return 'loading results...'
  }

  if (isLoading) {
    return 'Error!'
  }

  return (
    <div className='text-light'>
      <h1>react query example</h1>
      <ul>
        {data?.map((post) => (
          <li key={post._id}>{post.abstract}</li>
        ))}
      </ul>
    </div>
  )
}
