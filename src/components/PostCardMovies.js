import React, { Component } from 'react'
/* firebase and firestore */
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from './Sharing/SharingButtons'
import moment from 'moment'

export class PostCardMovies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.byline,
      date: this.props.post.publication_date,
      createdAt: new Date(),
      description: this.props.post.summary_short,
      section: 'movies',
      title: this.props.post.display_title,
      url: this.props.post.link.url,
      user: this.props.user.multiFactor.user.uid,
    }
  }

  render() {
    const favoritesCollectionRef = collection(db, 'favorites')
    const saveFavorite = async (props) => {
      try {
        await addDoc(favoritesCollectionRef, {
          author: this.props.post.byline,
          date: this.props.post.publication_date,
          createdAt: new Date(),
          description: this.props.post.summary_short,
          section: 'movies',
          title: this.props.post.display_title,
          url: this.props.post.link.url,
          user: this.props.user.multiFactor.user.uid,
        })
        console.log('favorite added')
        console.log(this.props.post.byline)
      } catch (err) {
        console.log(err)
      }
    }
    console.log(this.props.user.multiFactor.user.uid)
    return (
      <Card
        className='most-populars__card  card bg-dark text-light border-light'
        key={this.props.post.id}
      >
        <Card.Body>
          {' '}
          <div className='title-card'>{this.props.post.display_title}</div>
          {this.props.post.multimedia ? (
            <Card.Img
              className='img'
              src={this.props.post.multimedia.src}
              alt={this.props.post.headline}
            />
          ) : null}
          <div className='subtitle'>{this.props.post.summary_short}</div>
          <Card.Text className='author-date'>
            <span>By {this.props.post.byline}.</span>
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
              <a href={this.props.post.link.url} className='myLink'>
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
          <SharingButtons url={this.props.post.link.url} />
        </Card.Footer>
      </Card>
    )
  }
}

export default PostCardMovies
