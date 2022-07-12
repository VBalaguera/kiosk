import React, { Component } from 'react'
/* firebase and firestore */
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { Card, Button } from 'react-bootstrap'
import SharingButtons from './Sharing/SharingButtons'
import moment from 'moment'

export class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.byline,
      date: this.props.post.published_date,
      description: this.props.post.abstract,
      section: this.props.post.section,
      title: this.props.post.title,
      url: this.props.post.url,
      user: this.props.user.multiFactor.user.uid,
    }
  }

  render() {
    const favoritesCollectionRef = collection(db, 'favorites')
    const saveFavorite = async (props) => {
      try {
        await addDoc(favoritesCollectionRef, {
          author: this.props.post.byline,
          date: this.props.post.published_date,
          createdAt: new Date(),
          description: this.props.post.abstract,
          section: this.props.post.section,
          title: this.props.post.title,
          url: this.props.post.url,
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
          <div className='title-card'>{this.props.post.title}</div>
          <div className='subtitle'>{this.props.post.abstract}</div>
          <Card.Text className='author-date'>
            <span>{this.props.post.byline}</span>{' '}
            <span>
              Published:{' '}
              {moment(this.props.post.published_date).format('MMMM d, YYYY')}
            </span>
          </Card.Text>
          <Button className='btn read-more' variant='btn btn-outline-light'>
            <a href={this.props.post.url} className='link'>
              read more
            </a>
          </Button>
          <Button className='btn read-more' variant='btn btn-outline-light'>
            <span onClick={() => saveFavorite(this.props)}>
              save favorite here
            </span>
          </Button>
        </Card.Body>

        <Card.Footer>
          <SharingButtons url={this.props.post.url} />
        </Card.Footer>
      </Card>
    )
  }
}

export default PostCard
