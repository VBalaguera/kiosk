# KIOSK

Resourceful docs: https://firebase.google.com/docs/reference/js/v8/firebase.User#delete
https://firebase.google.com/docs/rules/basics

## 2022/07/24

- nextjs conversion on route,

PROBLEM:

- Save as favorite button remains not disabled after clicking.

SOLUTION:

<code>
constructor(props) {
    super(props)
    this.state = {
      author: this.props.post.byline,
      date: this.props.post.published_date,
      createdAt: Timestamp.now(),
      description: this.props.post.abstract,
      section: this.props.post.section,
      title: this.props.post.title,
      url: this.props.post.url,
      user: this.props.user.multiFactor.user.uid,
      source: 'New York Times',
      comments: '',
      favorites: this.props.favorites,
      active: true,
    }
  }
  [...]
  const saveFavorite = async () => {
      try {
        await addDoc(favoritesCollectionRef, {
          author: this.props.post.byline,
          date: this.props.post.published_date,
          createdAt: Timestamp.now(),
          description: this.props.post.abstract,
          section: this.props.post.section,
          title: this.props.post.title,
          url: this.props.post.url,
          user: this.props.user.multiFactor.user.uid,
          source: 'New York Times',
          comments: '',
        })
        /* console.log('favorite added') */
        toast('favorite added')
        this.setState({
          active: false,
        })
        /* console.log(this.props.post.byline) */
      } catch (err) {
        /* console.log(err) */
        toast(err)
      }
    }

[...]

<Button
                className='btn read-more'
                variant='btn btn-outline-light mx-2'
                disabled={favoritedItem.length > 0 || !this.state.active} >
<span onClick={() => saveFavorite(this.props)}>
Save as favorite
</span>
.
</Button>

</code>

PROBLEM:

- users can add favorites multiple times

SOLUTION:

On PostCard and others, add this:

<code>
    let favoritedItem = this.props.favorites.filter(
      (favorite) => favorite.title === this.props.post.title
    )
    [...]
    <Button
                className='btn read-more'
                variant='btn btn-outline-light mx-2'
                disabled={favoritedItem.length > 0}
              >
                <span onClick={() => saveFavorite(this.props)}>
                  Save as favorite
                </span>
                .
              </Button>
    </code>

PROBLEM:

- when trying to use protected routes with currentUser from firebase and useAuth;

SOLUTION:

const router = useRouter()
useEffect(() => {
if (currentUser) {
console.log('signed in!')
} else if (currentUser == null) {
router.push('/')
}
}, [currentUser])

if (!currentUser) {
return null
}

## 2022/07/19

- daily backup
- updated security settings on firebase to prod standards:
- fixed some errors at TechTopStories.js
  <code>
  rules_version = '2';
  service cloud.firestore {
  match /databases/{database}/documents {
  match /{document=\*\*} {
  allow read, write, create: if request.auth != null;
  allow update, delete: if request.auth.uid == resource.data.user;
  }
  }
  }
  </code>
- minor styles tweaking: mostly letters-spacing and font-weight; also: navbar-link, and dashboard
- minor date tweaking
- deleted Routes for Notes; profile, notes and favorites are under dashboard. thinking about setting each of these into separated routes.
- Users can update and delete notes.
- responsive styling
- if user doesn't have notes, app will notify the user

## 2022/07/18

NOTES BRANCH CREATED FOR STUDYING CRUD FUNCTIONS IN FIREBASE

- notes collection created; a basic text/description/date collection on firebase;
- Notes.js created:
  - users can write notes
- .vscode no longer needed
- src/hooks no longer needed
- better folder organization
- search works way better now; also, responsive overhaul.

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
- about page updated
- footer info updated with portfolio link.
- Date().toLocaleString() replaced with Timestamp.now()

TODO:

- USING NOTES.JS as starting point, try to stop using Class comps in any PostCards!!!
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
