const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
require('dotenv').config();
require("./database/database.js")

// CONFIGURACION PARA PARSEAR MEJOR LA INFORMACIÓN
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./routes/home.js"));
app.use(require("./routes/user.profile.js"));
app.use(require("./routes/user.update.js"));
app.use(require("./routes/artist.albums.js"));
app.use(require("./routes/artist.toptracks.js"));
app.use(require("./routes/search.mostvisited.js"));


app.listen(5000);
