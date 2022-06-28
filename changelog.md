# KIOSK

## 2022/06/28

- search functionality from nyt api.
- navbar revamped
- footer improved
- about improved

TODO:

- fix all dates using moment
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
