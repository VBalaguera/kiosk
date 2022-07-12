# KIOSK

## 2022/07/12

- saving api results as favorites is a go;
- dashboard showing favorites filtered by id is a go;
- PROBLEM FIXED: https://stackoverflow.com/questions/72952947/function-in-react-js-needs-to-run-twice-to-work

TODO:

- revamp dashboard, order results by createdAt value;
- create an unique comp to save favorites between multiple news sections.
- revisit and polish code for said comp.

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
