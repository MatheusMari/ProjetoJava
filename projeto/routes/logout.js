var express = require("express");
var router = express.Router();

/* GET logout */
router.get("/", function (req, res, next) {
    // Destroi a sessão do usuário
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        } else {
            // Redireciona para a página inicial ou de login após o logout
            res.redirect("/login");
        }
    });
});

module.exports = router;
