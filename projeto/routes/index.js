var express = require('express');
var router = express.Router();

/* GET pagina index. */
router.get('/', function(req, res, next) {
  res.render('index', {logado: !req.session.user});
});

module.exports = router;