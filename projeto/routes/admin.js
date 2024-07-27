var express = require("express");
var router = express.Router();

/* GET pagina admin. */
router.get("/", function (req, res, next) {
	if (req.session.user) {
		res.send("ADMIN " + JSON.stringify(req.session.user));
	} else {
		res.send("Nenhum usuário na sessão.");
	}
});

module.exports = router;
