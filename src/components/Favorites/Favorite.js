import React from 'react'
import { Card } from 'react-bootstrap'

import moment from 'moment'

export default function Favorite({ favorite, index }) {
  return (
    <>
      <Card key={index} className='card bg-dark text-light border-light'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            {favorite.title}
            <div className='d-flex justify-content-between'>
              <div className='d-flex flex-column align-items-end justify-content-end mx-2'>
                {' '}
                <span className='mx-2'>
                  Published on: {String(favorite.date).slice(0, 10)}.
                </span>
                <span className='mx-2'>
                  <>
                    Saved on:{' '}
                    {moment
                      .utc(favorite.createdAt.seconds)
                      .format()
                      .slice(0, 10)}
                  </>

                  {/* <>{moment.utc(favorite.createdAt.seconds).format()}</>
                  {moment(favorite.createdAt.seconds).format('MMMM d, YYYY')}. */}
                  {/* TODO: FIX THIS */}
                </span>
              </div>
              <div className='d-flex flex-column align-items-end justify-content-end mx-2'>
                <span>Section: {favorite.section}.</span>
                <a href={favorite.url} className='myLink'>
                  Read more.
                </a>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
