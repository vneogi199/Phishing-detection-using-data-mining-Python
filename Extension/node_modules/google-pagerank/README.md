# google-pagerank ** This project NO LONGER WORKS because Google removed the PageRank API.

This [npm module](https://www.npmjs.com/package/google-pagerank) fetches Google PageRank.

It accomplishes this by implementing the Jenkins hash in Javascript and using
the Google Toolbar endpoint to grab pagerank for any url.

`npm install google-pagerank`

## Node module

Install with `npm install google-pagerank` or include `google-pagerank` in your module's package.json.

    var pagerank = require('google-pagerank');

    pagerank('http://ianww.com', function(err, rank) {
      console.log('Got pagerank', rank);
    });

    ==> Got pagerank 3

## Command line

    node index.js "http://ianww.com"
    ==> 3

## Demo

Example repo at
[typpo/pagerank-checker](http://github.com/typpo/pagerank-checker), or see it
live at [http://ianww.com/pagerank](http://ianww.com/pagerank)
