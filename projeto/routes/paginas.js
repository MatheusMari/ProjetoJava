// Rota onde ficará armazenado todas as páginas criadas

var express = require("express");
var router = express.Router();

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

	var pagina = {
        titulo: req.body.titulo,
        url: req.body.url,
        html: req.body.html
    };

    req.paginas.push(pagina);

    res.redirect('/paginas/' + req.body.url);
});

/* GET pagina criada */
router.get("/:url", function (req, res, next) {
	// Variável Boolean que retorna se encontrou dada url na lista de paginas
    var pagina = req.paginas.find(p => p.url === req.params.url);

	// Renderiza o html na página
    if (pagina) {
        res.send(pagina.html);
    } else {
        res.status(404).send('Página não encontrada');
    }
});

module.exports = router;
