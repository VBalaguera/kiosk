import React, { Component } from 'react'
/* firebase and firestore */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from '../Sharing/SharingButtons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify'
export class PostCardMovies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.byline,
      date: this.props.post.publication_date,
      createdAt: Timestamp.now(),
      description: this.props.post.summary_short,
      section: 'movies',
      title: this.props.post.display_title,
      url: this.props.post.link.url,
      user: this.props.user.multiFactor.user.uid,
      source: 'New York Times',
      favorites: this.props.favorites,
      active: true,
      copied: false,
    }
  }

  render() {
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
          date: this.props.post.publication_date,
          createdAt: Timestamp.now(),
          description: this.props.post.summary_short,
          section: 'movies',
          title: this.props.post.display_title,
          url: this.props.post.link.url,
          user: this.props.user.multiFactor.user.uid,
          source: 'New York Times',
        })

        toast('favorite added')
        this.setState({
          active: false,
        })
      } catch (err) {
        toast(err)
      }
    }

    let favoritedItem = this.props.favorites.filter(
      (favorite) => favorite.title === this.props.post.display_title
    )

    return (
      <>
        <Card
          className='most-populars__card  card bg-dark text-light border-light'
          key={this.props.post.id}
        >
          <Card.Body>
            {' '}
            <div className='title-card'>{this.props.post.display_title}</div>
            {this.props.post.multimedia ? (
              <Card.Img
                className='img-movies'
                src={this.props.post.multimedia.src}
                alt={this.props.post.headline}
              />
            ) : null}
            <div className='subtitle'>{this.props.post.summary_short}</div>
            <Card.Text className='author-date'>
              <span>By {this.props.post.byline}.</span>
              <span>
                Published:{' '}
                {moment(this.props.post.published_date).format('MMMM DD, YYYY')}
              </span>
            </Card.Text>
            <div className='d-flex align-items-center justify-content-center'>
              <Button
                className='btn read-more btn-outline-light mx-2'
                variant='link'
              >
                <a href={this.props.post.link.url} className='myLink'>
                  Read more
                </a>
                .
              </Button>
              <Button
                className='btn read-more'
                variant='btn btn-outline-light mx-2'
                disabled={favoritedItem.length > 0 || !this.state.active}
              >
                <span onClick={() => saveFavorite(this.props)}>
                  Save as favorite
                </span>
                .
              </Button>
            </div>
          </Card.Body>

          <Card.Footer className='d-flex align-items-center justify-content-center'>
            <SharingButtons url={this.props.post.link.url} />
            <CopyToClipboard
              text={this.props.post.link.url}
              onCopy={() => this.setState({ copied: true })}
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
}

export default PostCardMovies