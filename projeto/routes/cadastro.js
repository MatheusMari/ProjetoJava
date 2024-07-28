var express = require('express');
var router = express.Router();

/* GET pagina cadastro. */
router.get('/', function(req, res, next) {
  res.render('cadastro');
});

module.exports = router;
