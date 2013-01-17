kumite-js
=========

Javascript library for interacting with the PHP split testing library, kumite


#### Usage
- Requires jQuery 1.5+
- Include `Kumite.js`
- Create Kumite instance, passing url to endpoint where `Kumite::serveJs($post)` is hosted

#### Kumite Methods

##### `start(testKey, variant)`
Used to join a test from javascript. Posts to the server side endpoint.

##### `variant(testKey)`
Used to vary content via javascript. Unlike on the server, only the variant key is available.

##### `event(testKey, eventKey, metadata)`
Used to log an event from javascript. Posts to the server side endpoint.
