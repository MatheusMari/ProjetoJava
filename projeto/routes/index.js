var express = require('express');
var router = express.Router();

/* GET pagina index. */
router.get('/', function(req, res, next) {
  // Pegar as 5 páginas mais recentes
  var paginasRecentes = req.paginas.slice(-5).reverse();

  res.render('index', {logado: !req.session.user, paginas: paginasRecentes});
});

module.exports = router;
