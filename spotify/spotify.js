const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENTID_SPOTIFY,
  clientSecret: process.env.CLIENTSECRET_SPOTIFY,
  redirectUri: 'http://buendia:).co'
});


module.exports = spotifyApi;
