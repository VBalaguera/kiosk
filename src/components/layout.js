import React from 'react'
import NavBar from './navigation/NavBar'
import Footer from './navigation/Footer'

import { Container } from 'react-bootstrap'

export default function Layout({ children }) {
  return (
    <div className='App bg-dark  mt-5'>
      <Container className='pb-5' style={{ minHeight: '95vh' }}>
        <NavBar />
        <main>
          <div>{children}</div>
        </main>
      </Container>
      <Footer />
    </div>
  )
}
