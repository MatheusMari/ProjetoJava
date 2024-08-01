var express = require('express');
var router = express.Router();


/* GET pagina index. */
router.get('/', function(req, res, next) {
  // Apenas para testes
  req.session.user = {
    username: 'admin',
    senha: 'admin123'
  }
  
  if (req.paginas.length == 0) {
    req.paginas.push({
      titulo: "Título",
      url: "URL123",
      html: "HTML123"
    });
  }

  // Pegar as 5 páginas mais recentes
  var paginasRecentes = req.paginas.slice(-5).reverse();

  res.render('index', {logado: !req.session.user, paginas: paginasRecentes});
});

module.exports = router;
