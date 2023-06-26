import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'

const SearchBar = ({ setPosts, data, setWordEntered, wordEntered }) => {
  const [loading, setLoading] = useState(false)
  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    const query = wordEntered
    setWordEntered(query)

    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
      )
      .then((response) => {
        setPosts(response.data.response.docs)
        setLoading(false)
      })
      .catch((err) => {
        setPosts(data)
        setLoading(false)
      })
  }

  const clearInput = () => {
    setPosts([])
    setWordEntered('')
  }

  return (
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
          />
          <div className='articles-search__form-buttons'>
            <Button
              type='submit'
              variant='secondary'
              className='btn btn-outline-light search-btn ms-1'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Search'}
            </Button>
            <Button
              className='btn btn-outline-light search-btn ms-1'
              variant='secondary'
              onClick={clearInput}
              disabled={loading}
            >
              Erase
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default SearchBar
