const { Router } = require("express");
const router = Router();
const spotifyApi = require("../spotify/spotify.js");
const User = require("../models/User.js");

router.post('/meupdate', (req, res) => {
  display_name = req.body.display_name;
  country = req.body.country;
  if(typeof display_name != "string" || typeof country != "string"){
    res.json({ error: 'Falta agregar los campos display_name o country '});
    return;
  }
  if((!display_name || display_name.length === 0) || (!country || country.length === 0)){
    res.json({ error: 'display_name o country estan vacíos, rellenar los campos'});
    return;
  }
  spotifyApi.setAccessToken(process.env.TOKEN_SPOTIFY_USER);
  spotifyApi.getMe()
  .then(function(data) {
    var userData = data.body;
    var emailUser = userData.email;

    const userUpdate = User.update(
      { email : emailUser },
      { display_name: display_name, country: country },
      { upsert: false },
      function(err, doc){
        if(doc.n === 0){
          res.json({ error: "Este correo aun no existe en la base de datos, favor de agregarlo con la ruta /me"});
          return;
        }else{
          User.find({ email: emailUser }).lean().exec(function (err, users) {
            return res.json(users);
          });
        }
      }
    );
  }, function(err) {
    console.log('Algo esta mal!', err);
  });

});

module.exports = router;
