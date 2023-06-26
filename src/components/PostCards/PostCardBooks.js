import React, { useState } from 'react'
/* firebase and firestore */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from '../Sharing/SharingButtons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ToastContainer, toast } from 'react-toastify'

export default function PostCarBooks({ post, user, favorites }) {
  const [clicked, setClicked] = useState(false)
  const [copied, setCopied] = useState(false)
  const favoritesCollectionRef = collection(
    db,
    'favorites',
    user.multiFactor.user.email,
    /* 'New York Times' */
    user.multiFactor.user.uid
  )
  const saveFavorite = async (props) => {
    try {
      await addDoc(favoritesCollectionRef, {
        author: post.author,
        publisher: post.publisher,
        createdAt: Timestamp.now(),
        description: post.description,
        section: 'books',
        title: post.title,
        url: post.amazon_product_url,
        user: user.multiFactor.user.uid,
        source: 'New York Times',
      })

      toast('favorite added')
      setClicked(true)
    } catch (err) {
      toast(err)
    }
  }
  let favoritedItem = favorites.filter(
    (favorite) => favorite.title === post.title
  )

  const handleCopyLink = () => {
    setCopied(true)
    toast('link copied to clipboard')
  }

  return (
    <>
      <Card
        className='most-populars__card  card bg-dark text-light border-light'
        key={post.id}
      >
        <Card.Body>
          {' '}
          <div className='title-card'>{post.title}</div>
          {post.multimedia ? (
            <Card.Img
              className='img'
              src={post.multimedia[0].url}
              alt={post.caption}
            />
          ) : null}
          {post.book_image ? (
            <Card.Img
              className='img book-img'
              src={post.book_image}
              alt={post.description}
            />
          ) : null}
          <div className='subtitle'>{post.description}</div>
          <Card.Text className='author-date'>
            <span>By {post.author}.</span>
            <span>Publisher: {post.publisher}</span>
          </Card.Text>
          <div className='d-flex align-items-center justify-content-center'>
            <Button
              className='btn read-more'
              variant='btn btn-outline-light mx-2'
            >
              <a href={post.amazon_product_url} className='myLink'>
                Amazon link
              </a>
              .
            </Button>
            <Button
              className='btn read-more'
              variant='btn btn-outline-light mx-2'
              disabled={favoritedItem.length > 0 || clicked}
            >
              <span onClick={() => saveFavorite(post, user)}>
                Save as favorite.
              </span>
            </Button>
          </div>
        </Card.Body>

        <Card.Footer className='d-flex align-items-center justify-content-center'>
          <SharingButtons url={post.amazon_product_url} />
          <CopyToClipboard
            text={post.amazon_product_url}
            onCopy={() => handleCopyLink()}
          >
            <img
              src='../assets/icons/clipboard.svg'
              alt='read more'
              className='sharing-icon'
            />
          </CopyToClipboard>
        </Card.Footer>
        <ToastContainer
          position='bottom-right'
          type='info'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme='dark'
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Card>
    </>
  )
}
