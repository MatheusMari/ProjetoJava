var express = require('express');
var router = express.Router();

/* GET pagina login. */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
