import { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'

import moment from 'moment'

import data from '../../../../data/nytMostPopular.json'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../../../firebase'

import { useAuth } from '../../../../context/AuthContext'

import SharingButtons from '../../../Sharing/SharingButtons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ToastContainer, toast } from 'react-toastify'

export default function ArticleSearch() {
  const [wordEntered, setWordEntered] = useState('')
  const [posts, setPosts] = useState([])
  const [copied, setCopied] = useState(false)
  const [clicked, setClicked] = useState(false)

  const { currentUser } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    const query = wordEntered
    setWordEntered(query)

    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
      )
      .then((response) => {
        /* console.log(response.data.response.docs) */
        setPosts(response.data.response.docs)
      })
      .catch((err) => {
        /* console.log(err) */
        setPosts(data)
      })
  }

  const clearInput = () => {
    setPosts([])
    setWordEntered('')
  }

  const handleCopyLink = () => {
    setCopied(true)
    toast('link copied to clipboard')
  }

  const favoritesCollectionRef = collection(
    db,
    'favorites',
    currentUser.multiFactor.user.email,
    currentUser.multiFactor.user.uid
  )
  const saveFavorite = async (post, currentUser) => {
    try {
      await addDoc(favoritesCollectionRef, {
        author: post.byline,
        date: post.pub_date,
        createdAt: Timestamp.now(),
        description: post.abstract,
        section: post.section_name,
        title: post.headline.main,
        url: post.web_url,
        user: currentUser.multiFactor.user.uid,
        source: 'New York Times',
        comments: '',
      })

      toast('favorite added')
      setClicked(true)
    } catch (err) {
      toast(err)
    }
  }
  console.log(currentUser)
  console.log(posts)

  return (
    <div className='w-100'>
      <Card className='articles-search bg-dark text-light border-light'>
        <div className=''>
          <Form onSubmit={handleSearch}>
            <div className='articles-search__form'>
              <Form.Control
                type='text'
                className='articles-search__form-input'
                placeholder='what would you like to know?'
                onChange={(e) => setWordEntered(e.target.value)}
                value={wordEntered}
                aria-label='what would you like to know?'
              ></Form.Control>
              <div className='articles-search__form-buttons'>
                <Button
                  type='submit'
                  variant='secondary'
                  className='btn btn-outline-light search-btn ms-1'
                >
                  Search
                </Button>
                <Button
                  className='btn btn-outline-light search-btn ms-1'
                  variant='secondary'
                  onClick={clearInput}
                >
                  delete
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className='articles-search-searchbar input-group mb-4'></div>

        {posts.map((post) => (
          <div className='w-100'>
            <Card
              className='articles-search__card bg-dark card text-light border-light'
              key={post._id}
            >
              <Card.Body>
                {' '}
                <div className='title-card'>{post.headline.main}</div>
                <div className='subtitle'>{post.abstract}</div>
                <Card.Text className='author-date'>
                  <span>{post.byline.original}</span>{' '}
                  <span>
                    Published: {moment(post.pub_date).format('MMMM DD, YYYY')}
                  </span>
                </Card.Text>
                <div className='lead-paragraph'>{post.lead_paragraph}</div>
                <Button
                  className='btn read-more'
                  variant='btn btn-outline-light'
                >
                  <a href={post.web_url} className='link'>
                    read more
                  </a>
                </Button>
                <Button
                  className='btn read-more'
                  variant='btn btn-outline-light mx-2'
                  disabled={setClicked}
                >
                  <span onClick={() => saveFavorite(post, currentUser)}>
                    Save as favorite
                  </span>
                  .
                </Button>
              </Card.Body>
              <Card.Footer className='d-flex align-items-center justify-content-center'>
                <SharingButtons url={post.web_url} />
                <CopyToClipboard
                  text={post.web_url}
                  onCopy={() => handleCopyLink()}
                >
                  <img
                    src='../assets/icons/clipboard.svg'
                    alt='read more'
                    className='sharing-icon'
                  />
                </CopyToClipboard>
              </Card.Footer>
            </Card>
          </div>
        ))}
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
    </div>
  )
}
