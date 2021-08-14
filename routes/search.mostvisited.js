const { Router } = require("express");
const router = Router();
const spotifyApi = require("../spotify/spotify.js");
const Search = require("../models/Search.js");

router.get('/search/mostvisited', (req, res) => {
  Search.find({},[],{sort:{ count: -1 }}).lean().exec(function (err, queries) {
    var searchJson = [];
    queries.forEach(element => {
      var searchItem = {
        query: element.query,
        count: element.count
      }
      searchJson.push(searchItem);
    });
    res.json(searchJson);
    return;
  });
});

module.exports = router;
