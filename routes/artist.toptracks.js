const { Router } = require("express");
const router = Router();
const spotifyApi = require("../spotify/spotify.js");

router.get('/artist/toptracks', (req, res) => {
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
       spotifyApi.getArtistTopTracks(idArtist, 'GB')
       .then(function(data) {
        var tracksJson = [];
        data.body.tracks.forEach(element => {
          var track = {
            name: element.name,
            release_date: element.album.release_date,
            total_tracks: element.album.total_tracks
          }
          tracksJson.push(track);
        });
        res.json(tracksJson);
       }, function(err) {
        console.log(err);
      });
     }else{
       res.json({ error: 'No se encontraron artistas'});
     }
  }, function(err) {
    console.error(err);
  });

});
module.exports = router;
