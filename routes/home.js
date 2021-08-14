const { Router } = require("express");
const router = Router();

//FRONT HOME
router.get('/', (req, res) => {
  res.json({ hello: "hello" });
});

module.exports = router;
