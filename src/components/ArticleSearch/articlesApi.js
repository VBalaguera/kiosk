import axios from 'axios'

/* https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_NYT_API_KEY} */

const api = axios.create({
  baseURL: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=',
})

export const getResults = (query) =>
  api
    .get(`${query}&api-key=${process.env.REACT_APP_NYT_API_KEY}`)
    .then((response) => response.data.response.docs)
