import requests
import json

# api calls
nytMostPopular = requests.get(
    "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()
nytTopStoriesUrl = requests.get(
    "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()
nytMovieReviews = requests.get(
    "https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()
nytBooks = requests.get(
    "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw").json()

nytArt = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytBusiness = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytOpinion = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytPolitics = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytSports = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytTech = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytUs = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()

nytWorld = requests.get(
    'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=Z3K5g1YWERI2kAHq7cmPNU96RXvxiCsw').json()


# creating jsons

with open('nytMostPopular.json', 'w') as json_file:
    json.dump(nytMostPopular['results'], json_file)

with open('nytTopStories.json', 'w') as json_file:
    json.dump(nytTopStoriesUrl['results'], json_file)

with open('nytMovieReviews.json', 'w') as json_file:
    json.dump(nytMovieReviews['results'], json_file)

with open('nytBooks.json', 'w') as json_file:
    json.dump(nytBooks['results']['books'], json_file)

with open('nytArt.json', 'w') as json_file:
    json.dump(nytArt['results'], json_file)

with open('nytBusiness.json', 'w') as json_file:
    json.dump(nytBusiness['results'], json_file)

with open('nytOpinion.json', 'w') as json_file:
    json.dump(nytOpinion['results'], json_file)

with open('nytPolitics.json', 'w') as json_file:
    json.dump(nytPolitics['results'], json_file)

with open('nytSports.json', 'w') as json_file:
    json.dump(nytSports['results'], json_file)

with open('nytTech.json', 'w') as json_file:
    json.dump(nytTech['results'], json_file)

with open('nytUs.json', 'w') as json_file:
    json.dump(nytUs['results'], json_file)

with open('nytWorld.json', 'w') as json_file:
    json.dump(nytWorld['results'], json_file)
