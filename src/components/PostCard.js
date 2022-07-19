import React, { Component } from 'react'
/* firebase and firestore */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from './Sharing/SharingButtons'
import moment from 'moment'

/* toast */
import { ToastContainer, toast } from 'react-toastify'

export class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.byline,
      date: this.props.post.published_date,
      createdAt: Timestamp.now(),
      description: this.props.post.abstract,
      section: this.props.post.section,
      title: this.props.post.title,
      url: this.props.post.url,
      user: this.props.user.multiFactor.user.uid,
      source: 'New York Times',
      comments: '',
    }
  }

  render() {
    /* console.log(this.props)
    console.log(this.props.user.multiFactor.user) */
    const favoritesCollectionRef = collection(
      db,
      'favorites',
      this.props.user.multiFactor.user.email,
      /* 'New York Times' */
      this.props.user.multiFactor.user.uid
    )
    const saveFavorite = async (props) => {
      try {
        await addDoc(favoritesCollectionRef, {
          author: this.props.post.byline,
          date: this.props.post.published_date,
          createdAt: Timestamp.now(),
          description: this.props.post.abstract,
          section: this.props.post.section,
          title: this.props.post.title,
          url: this.props.post.url,
          user: this.props.user.multiFactor.user.uid,
          source: 'New York Times',
          comments: '',
        })
        /* console.log('favorite added') */
        toast('favorite added')
        /* console.log(this.props.post.byline) */
      } catch (err) {
        /* console.log(err) */
        toast(err)
      }
    }
    /*  console.log(this.props.user.multiFactor.user.uid) */
    return (
      <>
        <Card
          className='most-populars__card  card bg-dark text-light border-light'
          key={this.props.post.id}
        >
          <Card.Body>
            {' '}
            <div className='title-card'>{this.props.post.title}</div>
            {this.props.post.multimedia ? (
              <Card.Img
                className='img'
                src={this.props.post.multimedia[0].url}
                alt={this.props.post.caption}
              />
            ) : null}
            {this.props.post.book_image ? (
              <Card.Img
                className='img book-img'
                src={this.props.post.book_image}
                alt={this.props.post.description}
              />
            ) : null}
            <div className='subtitle'>{this.props.post.abstract}</div>
            <Card.Text className='author-date'>
              <span>{this.props.post.byline}</span>{' '}
              <span>
                Published:{' '}
                {moment(this.props.post.published_date).format('MMMM d, YYYY')}
              </span>
            </Card.Text>
            <div className='d-flex align-items-center justify-content-center'>
              <Button
                className='btn read-more'
                variant='btn btn-outline-light mx-2'
              >
                <a href={this.props.post.url} className='myLink'>
                  Read more
                </a>
                .
              </Button>
              <Button
                className='btn read-more'
                variant='btn btn-outline-light mx-2'
              >
                <span onClick={() => saveFavorite(this.props)}>
                  Save as favorite
                </span>
                .
              </Button>
            </div>
          </Card.Body>

          <Card.Footer>
            <SharingButtons url={this.props.post.url} />
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
}

export default PostCard
