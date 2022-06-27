import requests
import json

# api calls
# nytMostPopular = requests.get("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()
# nytTopStoriesUrl = requests.get("https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()
# nytMovieReviews = requests.get("https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()
nytBooks = requests.get(
    "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()


# creating jsons
with open('nytBooks.json', 'w') as json_file:
    json.dump(nytBooks['results']['books'], json_file)
