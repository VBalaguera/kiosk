import React from 'react'
import NavBar from './navigation/NavBar'
import Footer from './navigation/Footer'
import Head from 'next/head'

import { NextSeo } from 'next-seo'

import { Container } from 'react-bootstrap'

export default function Layout({ children }) {
  return (
    <div className='App bg-dark  mt-5'>
      <Head>
        <title>kiosk</title>
        <meta charSet='utf-8' />
        <meta
          name='keywords'
          content='news, frontend, yay, api, next.js, firebase'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='author' content='Víctor Balaguera' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <NextSeo
        title='kiosk'
        description='A simple news API project. At this moment, uses the New York Times API only as a source of external content.'
        canonical='https://kiosk-vbalaguera.vercel.app/'
        openGraph={{
          url: 'https://kiosk-vbalaguera.vercel.app/',
          title: 'kiosk',
          description:
            'A simple news API project. At this moment, uses the New York Times API only as a source of external content.',
          images: [
            {
              url: 'https://i.ibb.co/6bWWcb0/android-chrome-512x512.png',
              width: 800,
              height: 600,
              alt: 'kiosk',
              type: 'image/jpeg',
            },
            {
              url: 'https://i.ibb.co/6bWWcb0/android-chrome-512x512.png',
              width: 900,
              height: 800,
              alt: 'kiosk',
              type: 'image/jpeg',
            },
          ],
          site_name: 'kiosk',
        }}
      />
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
