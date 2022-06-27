import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const nytMostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`

const nytTopStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
/* allowed values: arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world */

const nytMovieReviewsUrl = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${process.env.REACT_APP_NYT_API_KEY}`

/* const nytMovieReviewsUrl = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?query=godfather&api-key=${process.env.REACT_APP_NYT_API_KEY}`
 */

const nytBooksUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`

function App() {
  const sections = ['most popular', 'top stories', 'movie reviews', 'books']
  const [mostPopulars, setMostPopulars] = useState([])
  const [posts, setPosts] = useState([])
  const [reviews, setReviews] = useState([])
  const [books, setBooks] = useState([])

  const [mySection, setMySection] = useState(true)

  useEffect(() => {
    /* most popular */
    axios.get(nytMostPopularUrl).then((response) => {
      console.log(response.data.results)
      setMostPopulars(response.data.results)
    })

    /* top stories */
    axios.get(nytTopStoriesUrl).then((response) => {
      console.log(response.data.results)
      setPosts(response.data.results)
    })

    /* movie reviews */
    axios.get(nytMovieReviewsUrl).then((response) => {
      console.log(response.data.results)
      setReviews(response.data.results)
    })

    /* books */
    axios.get(nytBooksUrl).then((response) => {
      console.log(response.data.results.books)
      setBooks(response.data.results.books)
    })
  }, [])

  return (
    <div className='App'>
      <Container>
        {sections.map((section) => (
          <Button
            variant='primary'
            type='button'
            key={section}
            onClick={() => setMySection(section)}
          >
            {section}
          </Button>
        ))}
        <div className='most-popular'>
          <h1>{mySection}</h1>
          {mySection === 'most popular' && (
            <div className='most-populars'>
              {mostPopulars.map((post, index) => (
                <Card className='most-populars__card' index={index}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>

                    <Card.Text>
                      <span>{post.updated}</span>
                    </Card.Text>

                    <Button variant='primary'>
                      <a href={post.url} className='link'>
                        read more
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          {mySection === 'top stories' && (
            <div className='top-stories'>
              {posts.map((post, index) => (
                <Card className='top-stories__card' index={index}>
                  <Card.Body>
                    {' '}
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.updated}</Card.Text>
                    <Button variant='primary'>
                      <a href={post.url} className='link'>
                        read more
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          {mySection === 'movie reviews' && (
            <div className='movie-reviews'>
              {reviews.map((post, index) => (
                <Card index={index} className='movie-reviews__card'>
                  <Card.Body>
                    <Card.Title>{post.display_title}</Card.Title>

                    <Card.Img
                      className='img movie-reviews__img'
                      src={post.multimedia.src}
                      alt={post.display_title}
                    />

                    <Card.Text>
                      <span>Opens on: {post.opening_date}</span>
                      <span>Published on: {post.publication_date}</span>
                      <span>{post.summary_short}</span>
                      <span>MPAA Rating: {post.mpaa_rating}</span>
                    </Card.Text>

                    <Button variant='primary'>
                      {' '}
                      <a
                        href={post.link.url}
                        alt={post.headline}
                        className='link'
                      >
                        read more
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          {mySection === 'books' && (
            <div className='books'>
              {books.map((post, index) => (
                <Card className='books__card' index={index}>
                  <Card.Body>
                    {' '}
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Img
                      className='img books__img'
                      src={post.book_image}
                      alt={post.title}
                    />
                    <Card.Text>
                      <span>By: {post.author}</span>
                    </Card.Text>
                    <Button variant='primary'>
                      <a href={post.url} className='link'>
                        read more
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default App
