# Kiosk

A simple news API project. At this moment, uses the New York Times API only as a source of
external content.
Implemented functions such as:

- auth (using Firebase).
- multiple news sections.
- news search.
- responsive version.
- sharing options through email, telegram, copying the link to the clipboard, and other venues.
- CRUD capabilities using Firebase:
  - save any news articles into your favorites.
    - filter favorites by sections.
  - users can create notes on their dashboard page.
- daily backups of all main news sections by using python (in case the API has reached its maximum number of daily calls, searching will only display a random news section)

Created by [Víctor Balaguera](http://vbalaguera.com). More to come.
