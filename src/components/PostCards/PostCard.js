import React, { useState } from 'react'
/* firebase and firestore */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from '../Sharing/SharingButtons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'

/* toast */
import { ToastContainer, toast } from 'react-toastify'

export default function PostCard({ post, user, favorites }) {
  const [clicked, setClicked] = useState(false)
  const [copied, setCopied] = useState(false)
  const favoritesCollectionRef = collection(
    db,
    'favorites',
    user.multiFactor.user.email,
    /* 'New York Times' */
    user.multiFactor.user.uid
  )
  const saveFavorite = async (post, user) => {
    try {
      await addDoc(favoritesCollectionRef, {
        author: post.byline,
        date: post.published_date,
        createdAt: Timestamp.now(),
        description: post.abstract,
        section: post.section,
        title: post.title,
        url: post.url,
        user: user.multiFactor.user.uid,
        source: 'New York Times',
        comments: '',
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

  const handleCopyLink = async () => {
    await setCopied(true)
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
          <div className='subtitle'>{post.abstract}</div>
          <Card.Text className='author-date'>
            <span>{post.byline}</span>{' '}
            <span>
              Published: {moment(post.published_date).format('MMMM DD, YYYY')}
            </span>
          </Card.Text>
          <div className='d-flex align-items-center justify-content-center'>
            <Button
              className='btn read-more'
              variant='btn btn-outline-light mx-2'
            >
              <a href={post.url} className='myLink'>
                Read more
              </a>
              .
            </Button>

            <Button
              className='btn read-more'
              variant='btn btn-outline-light mx-2'
              disabled={favoritedItem.length > 0 || !setClicked}
            >
              <span onClick={() => saveFavorite(post, user)}>
                Save as favorite
              </span>
              .
            </Button>
          </div>
        </Card.Body>

        <Card.Footer className='d-flex align-items-center justify-content-center'>
          <SharingButtons url={post.url} />
          <CopyToClipboard text={post.url} onCopy={() => handleCopyLink()}>
            <img
              src='../assets/icons/clipboard.svg'
              alt='read more'
              className='sharing-icon'
            />
          </CopyToClipboard>
        </Card.Footer>
        <div></div>
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
