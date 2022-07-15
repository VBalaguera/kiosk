import React from 'react'
import Favorite from './Favorite'

export default function Favorites({ favorites }) {
  return (
    <>
      {favorites ? (
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
        <>
          <span>you have no favorites yet</span>
        </>
      )}
    </>
  )
}
