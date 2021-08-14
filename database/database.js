const mongoose = require("mongoose");

const atlasuri = process.env.MONGODB_URL;

mongoose.connect(atlasuri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("Conexión exitosa de MongoDB");
});
