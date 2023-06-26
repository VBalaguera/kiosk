import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

import moment from 'moment'

import data from '../../../../data/nytMostPopular.json'

import { addDoc, collection, Timestamp, getDocs, q } from 'firebase/firestore'
import { db } from '../../../../firebase'

import { useAuth } from '../../../../context/AuthContext'

import SharingButtons from '../../../Sharing/SharingButtons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ToastContainer, toast } from 'react-toastify'
import SearchBar from '../../../Search/SearchBar'

export default function ArticleSearch() {
  const [wordEntered, setWordEntered] = useState('')
  const [posts, setPosts] = useState([])
  const [copied, setCopied] = useState(false)
  const [clicked, setClicked] = useState(false)

  const { currentUser } = useAuth()

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

  return (
    <div className='w-100'>
      <Card className='articles-search bg-dark text-light border-light'>
        <SearchBar
          setPosts={setPosts}
          data={data}
          wordEntered={wordEntered}
          setWordEntered={setWordEntered}
        />
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
                    Read more.
                  </a>
                </Button>
                <Button
                  className='btn read-more'
                  variant='btn btn-outline-light mx-2'
                  disabled={clicked}
                >
                  <span onClick={() => saveFavorite(post, currentUser)}>
                    Save as favorite.
                  </span>
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
