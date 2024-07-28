// Rota onde ficará armazenado todas as páginas criadas

var express = require("express");
var router = express.Router();

var paginas = [];   // Lista de todas as páginas

/* GET paginas. */
router.get("/", function (req, res, next) {
	// Verificar se usuário está logado
	if (!req.session.user) {
        res.send('Usuário não conectado');
	}

    res.render('criadorPaginas');
});

/* POST paginas. */
router.post("/", function (req, res, next) {
	// Verificar se usuário está logado
	if (!req.session.user) {
        res.send('Usuário não conectado');
	}

    res.send(req.body);
});

module.exports = router;
