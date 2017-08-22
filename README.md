`Requires valid Google Maps API Key to be set at components/Map/index.js`

### Features:

- based on `react-boilerplate`, uses react-leaflet and some extensions
- locale the user on the map - leveraging HTML5 location API
- add areas by drawing them on the map
- edit area names
- delete areas
- save state on each change. It will restored from localStorage
- code split in multiple React component following best practices for data flow
- some tests (see app/containers/FeatureContainer/tests/lib.test.js)

> Tested in Chrome (58.0) on Linux Debian 8.8

### How to:
- run: `yarn && yarn start` (or npm install && npm start)
- run tests: `yarn test` (or `npm t`)