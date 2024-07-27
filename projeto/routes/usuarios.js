var express = require("express");
var router = express.Router();

var validador = require("../validator/Cadastro.js");

/* GET usuarios */
router.get("/", function (req, res, next) {
  res.send("Página dos usuários");
});

/* POST para usuarios. */
router.post("/", function (req, res, next) {
  // Cria uma variavel usuário com o body da requisição
  const user = req.body;

  // Converte o valor do checkbox "termos" para booleano
  user.termos = user.termos === 'on';

  // Valida o usuário antes de colocar na sessão
  const { error, _ } = validador.validate(user);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Seta a session para ser esse usuário
  req.session.user = user;
  console.log(req.session.user);

  // Verifica se o usuário é um admin
  if (
    req.body.username == process.env.USER &&
    req.body.email == process.env.EMAIL &&
    req.body.senha == process.env.SENHA
  ) {
    res.redirect("/admin");
  } else {
    // Se não tiver erro, mostra os dados do usuário
    res.send(req.session.user);
  }
});

module.exports = router;
