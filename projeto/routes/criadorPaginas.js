var express = require("express");
var router = express.Router();

/* GET criadorPaginas. */
router.get("/", function (req, res, next) {
	// Verificar se usuário está logado
	if (!req.session.user) {
        res.send('Usuário não conectado');
	}

    res.render('criadorPaginas');
});

/* POST criadorPaginas. */
router.post("/", function (req, res, next) {
	// Verificar se usuário está logado 
	// (Caso o usuário demore muito para criar uma página ele será desconectado)
	if (!req.session.user) {
        res.send('Usuário não conectado');
	}

    res.render('criadorPaginas');
});

module.exports = router;
