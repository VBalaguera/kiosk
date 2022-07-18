# KIOSK

Resourceful docs: https://firebase.google.com/docs/reference/js/v8/firebase.User#delete

## 2022/07/18
AUTH BRANCH MERGED WITH MAIN

- Users can delete their own favorites.
- FIXED DATE PROBLEM AT FAVORITE.js
- overhaul on signup/forgot password/log in/update forms
- fixed footer and navbar
- responsive overhaul
- incorporated comments into dashboard/favorites atm
- using and testing newsapi on newly created Work comp; not sure if it's worth all the effort atm to incorporate this.
- added source field to favorites (ie: source: 'New York Times');
- replacing this.props.user.multiFactor.user.uid with the favorite's source (ie: 'New York Times')
- minor tweakings on all PostCards.
- warning modals when deleting accounts and favorites
- minor code cleaning

TODO:

- the question is: different apis used different fields and results, so when dealing with saving/showing favorites I should create similar comps for each api source (ie: nyt postcard/favorite comps). This also includes all api/firestore calls, filtering them by source.
- explore api lists here: https://github.com/VBalaguera/public-apis and USE IT TO CREATE MORE CONTENT!
- explore CRUD options for Favorites!

## 2022/07/16

Done:

- initial responsive styling;

## 2022/07/15

Deployed this version for testing at https://kiosk-q6k5iejxi-vbalaguera.vercel.app/kiosk

TODO:

- FIX DATE PROBLEM AT FAVORITE.js
- explore api lists here: https://github.com/VBalaguera/public-apis and USE IT TO CREATE MORE CONTENT!
- explore CRUD options for Favorites!

DONE:

- users can delete their accounts
- improved how users can save favorites:
  - before:
    <code>
    const favoritesCollectionRef = collection(db, 'favorites')
    </code>
  - now:
    <code>
    const favoritesCollectionRef = collection(
    db,
    'favorites',
    this.props.user.multiFactor.user.email,
    this.props.user.multiFactor.user.uid
    )
    </code>
- daily api-search.py backup
- incorporated favorite saving functions into:
  - arttopstories
  - businessstories
  - opiniontopstories
  - politicstopstories
  - sportstories
  - techtopstories
  - ustopstories
  - worldtopstories
  - Books (including PostCardBooks)
  - MovieReviews (including PostCardMovies)
- logout incorporated into navbar
- using slice(1) on worldtopstories due to a bug in nyt api where it shows incomplete information on the first result;
- link styling overhaul;
- dashboard overhaul:
  - profile info updated showing createdon, lastlogin, email, and update profile button
  - favorites style overhaul: cards including title, date and read more button;
- dashboard includes now filtering by sections; it's a good start, still unfinished
- fixed problems with Saved on dates on favorites;
- added react-toastify for notifications
- added ternary ops at Favorite.js to avoid crashing when testing old createdAt entries format

## 2022/07/12

TODO:

- saving api results as favorites is a go;
- dashboard showing favorites filtered by id is a go;
- PROBLEM FIXED: https://stackoverflow.com/questions/72952947/function-in-react-js-needs-to-run-twice-to-work

TODO:

- PostCard.js: adapt it to create an unique comp to save favorites between multiple news sections:
  - /TopStories: no changes
  - Books.js: changes:
    - {post.author} instead of {post.byline}
    - adds {post.publisher}
    - {post.amazon_product_url} instead of {post.url}
    - {post.description} instead of {post.abstract}
  - MovieReviews.js:
    - {post.link.url} instead of {post.url}
    - {post.summary_short} instead of {post.abstract}
    - {post.display_title} instead of {post.title}
- revamp dashboard, order results by createdAt value;
- have a better folder/comp organization; I can do better
- revisit all TODO:
- overall styling

## 2022/07/11

- now I'm auth from Firebase.

## 2022/07/07

- api-search moved to src/data;

## 2022/06/28

- daily backup of all jsons;
- new card styles;
- code cleaning
- DarkModeToggle implemented but not using. Need to override bootstrap styles first. Worth it?

## 2022/06/28

- search functionality from nyt api.
- backups updated and implemented.
- search bar improved
- fixed all dates using moment
- navbar revamped
- footer improved
- about improved
- meta and manifest.json updated
- fonts updated
- favicon updated

TODO:

- add more sections from different apis;
- do daily backups of every api call using api-search.py
- overall styling

## 2022/06/27

- Project created;
- using json-server
- package.json: created "server": "json-server --watch db.json --port 5000" script
- created db.json: mock db.
- installed axios
- using bootstrap and react-bootstrap
- using apy.search.py to backup api call results;
- backup those results at /src/backup
- responsive
- fixed navbar
- added about section
- using secrets and env vars
- using react-share for sharing https://www.npmjs.com/package/react-share
- added footer

NOTES:

- error autoprefixer: Replace color-adjust to print-color-adjust. The color-adjust shorthand is currently deprecated. Fixed with: npm install autoprefixer@10.4.5
- netlify: error while deploying; solved by editing npm run build to CI= npm run build in deployment options.
