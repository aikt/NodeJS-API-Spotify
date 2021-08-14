const { Router } = require("express");
const router = Router();
const spotifyApi = require("../spotify/spotify.js");
const Search = require("../models/Search.js");

router.get('/artist', (req, res) => {
  spotifyApi.setAccessToken(process.env.TOKEN_SPOTIFY_USER);
  var artist = req.query.q;
  if(typeof artist == "undefined"){
    res.json({ error: "No se encontro la query 'q'"});
    return;
  }
  if(!artist || artist.lengt === 0){
    res.json({ error: "Favor de agregarle un valor a la query 'q'"});
    return;
  }

  spotifyApi.searchArtists(artist)
  .then(function(data) {
     var artists = data.body.artists.items;
     if(artists.length > 0){
       var idArtist = artists[0].id;
       spotifyApi.getArtistAlbums(idArtist)
       .then(function(data) {
          var albumsJson = [];
          data.body.items.forEach(element => {
            addToAlbumJson(
              albumsJson,
              element.name,
              {
                album_name: element.name,
                total_tracks: element.total_tracks,
                release_date: element.release_date
              }
            );
          });

          const searchObj = new Search({
            query: artist,
            count: 0,
          });

          searchObj.save((err,document) => {
            if(err){
              Search.findOne({ query: artist }).lean().exec(function (err, queries) {
                var countIncrement = queries.count + 1;
                Search.update(
                  { query : artist },
                  { count: countIncrement},
                  { upsert: false },
                  function(err, doc){}
                );
              });

            }
          });
          res.json(albumsJson)
          return;
       }, function(err) {
        console.error(err);
       });
     }else{
       res.json({ error: 'No se encontraron artistas'});
     }
  }, function(err) {
    console.error(err);
  });

});

function addToAlbumJson(arrToSearch, name, arrToAdd) {
  const { length } = arrToSearch;
  const id = length + 1;
  const found = arrToSearch.some(el => el.album_name === name);
  if (!found) arrToSearch.push(arrToAdd);
  return arrToSearch;
}
module.exports = router;
