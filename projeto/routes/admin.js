var express = require("express");
var router = express.Router();

/* GET pagina admin. */
router.get("/", function (req, res, next) {
	res.render("admin");
});

module.exports = router;
