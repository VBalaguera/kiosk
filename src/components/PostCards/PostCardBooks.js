import React, { Component } from 'react'
/* firebase and firestore */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from '../Sharing/SharingButtons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ToastContainer, toast } from 'react-toastify'

export class PostCardBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.author,
      publisher: this.props.post.publisher,
      createdAt: Timestamp.now(),
      description: this.props.post.description,
      section: 'books',
      title: this.props.post.title,
      url: this.props.post.amazon_product_url,
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
          author: this.props.post.author,
          publisher: this.props.post.publisher,
          createdAt: Timestamp.now(),
          description: this.props.post.description,
          section: 'books',
          title: this.props.post.title,
          url: this.props.post.amazon_product_url,
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
      (favorite) => favorite.title === this.props.post.title
    )

    const handleCopyLink = async () => {
      await this.setState({ copied: true })
      toast('link copied to clipboard')
    }

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
            <div className='subtitle'>{this.props.post.description}</div>
            <Card.Text className='author-date'>
              <span>By {this.props.post.author}.</span>
              <span>Publisher: {this.props.post.publisher}</span>
            </Card.Text>
            <div className='d-flex align-items-center justify-content-center'>
              <Button
                className='btn read-more'
                variant='btn btn-outline-light mx-2'
              >
                <a href={this.props.post.amazon_product_url} className='myLink'>
                  Amazon link
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
            <SharingButtons url={this.props.post.amazon_product_url} />
            <CopyToClipboard
              text={this.props.post.amazon_product_url}
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
}

export default PostCardBooks
