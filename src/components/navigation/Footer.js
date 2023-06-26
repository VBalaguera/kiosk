import React from 'react'

export default function Footer() {
  var date = new Date().getFullYear()
  return (
    <footer className='text-center text-light text-lg-start bg-dark border-top border-light '>
      <div className='footer'>
        <div className='footer-left'>
          {date}.{' '}
          <a
            className='myLink'
            href='http://vbalaguera.com'
            target='_blank'
            rel='noreferrer'
          >
            Víctor Balaguera.
          </a>
        </div>

        <div className='footer-right'>
          <span>
            <a
              className='myLink'
              href='https://developer.nytimes.com/apis'
              target='_blank'
              rel='noreferrer'
            >
              Developed using NYT's API.{' '}
            </a>
            All copyrighted materials belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  )
}
