const { Router } = require("express");
const router = Router();
const spotifyApi = require("../spotify/spotify.js");
const User = require("../models/User.js");

router.get('/me', (req, res) => {
  spotifyApi.setAccessToken(process.env.TOKEN_SPOTIFY_USER);
  spotifyApi.getMe()
  .then(function(data) {
    var userData = data.body;

    const userObj = new User({
      display_name: userData.display_name,
      country: userData.country,
      n_followers: userData.followers.total,
      email: userData.email,
      type_user: userData.type
    });

    userObj.save((err,document) => {
      if(err){
        res.json({ error: "Este correo ya existe" });
        return;
      }
      res.json(userObj);
    });

  }, function(err) {
    console.log('Algo esta mal!', err);
  });

});

module.exports = router;
