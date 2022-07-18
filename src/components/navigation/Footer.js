import React from 'react'

export default function Footer() {
  return (
    <footer className='text-center text-light text-lg-start bg-dark border-top border-light '>
      <div className='footer'>
        <div className='footer-left'>
          2022.{' '}
          <a
            className='myLink'
            href='http://vbalaguera.com'
            target='_blank'
            rel='noreferrer'
          >
            Víctor Balaguera
          </a>
          .
        </div>

        <div className='footer-right'>
          <span>
            All copyrighted materials belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  )
}
