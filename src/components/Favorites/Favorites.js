import React from 'react'
import Favorite from './Favorite'

import { Link } from 'react-router-dom'

export default function Favorites({ favorites }) {
  console.log(favorites)
  return (
    <>
      {favorites.length > 0 ? (
        <>
          {favorites.map((favorite, index) => {
            /* console.log(favorite) */
            return (
              <>
                <Favorite favorite={favorite} index={index} />
              </>
            )
          })}
        </>
      ) : (
        <div className='mt-4'>
          <>
            <span>
              You have no favorites yet. C'mon,{' '}
              <Link className='myLink' to='/kiosk'>
                add some
              </Link>
              .
            </span>
          </>
        </div>
      )}
    </>
  )
}
