import React, { Component } from 'react'
/* firebase and firestore */
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from './Sharing/SharingButtons'

import { ToastContainer, toast } from 'react-toastify'

export class PostCardBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.author,
      publisher: this.props.post.publisher,
      createdAt: new Date(),
      description: this.props.post.description,
      section: 'books',
      title: this.props.post.title,
      url: this.props.post.amazon_product_url,
      user: this.props.user.multiFactor.user.uid,
    }
  }

  render() {
    const favoritesCollectionRef = collection(
      db,
      'favorites',
      this.props.user.multiFactor.user.email,
      this.props.user.multiFactor.user.uid
    )
    const saveFavorite = async (props) => {
      try {
        await addDoc(favoritesCollectionRef, {
          author: this.props.post.author,
          publisher: this.props.post.publisher,
          createdAt: new Date(),
          description: this.props.post.description,
          section: 'books',
          title: this.props.post.title,
          url: this.props.post.amazon_product_url,
          user: this.props.user.multiFactor.user.uid,
        })
        /* console.log('favorite added')
        console.log(this.props.post.byline) */
        toast('favorite added')
      } catch (err) {
        /* console.log(err) */
        toast(err)
      }
    }
    console.log(this.props.user.multiFactor.user.uid)
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
        </Card>
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
      </>
    )
  }
}

export default PostCardBooks
