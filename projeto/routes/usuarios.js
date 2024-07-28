var express = require("express");
var router = express.Router();

var validador = require("../validator/Cadastro.js");

var usuarios = [];

usuarios.push({
	username: "111",
	email: "111@1.com",
	senha: "111111",
	termos: true,
});

// Função para comparar usuários ignorando o campo "termos"
function comparaUsuario(usuarioA, usuarioB) {
	console.log("usuarioB: " + usuarioB.username);
	return (
		usuarioA.username === usuarioB.username &&
		usuarioA.senha === usuarioB.senha
	);
}

/* GET usuarios */
router.get("/", function (req, res, next) {
	// Pega os dados do usuário
	var usuarioLogin = {
		username: req.query.username,
		senha: req.query.senha,
	};

	// Checa se o usuário esta na lsita de usuarios
	const usuarioExiste = usuarios.some((usuario) =>
		comparaUsuario(usuario, usuarioLogin)
	);

	// Redireciona se o usuário existe
	if (usuarioExiste) {
		req.session.user = usuarioLogin;

		// Checa se o usuário é um admin
		if (
			usuarioLogin.username == process.env.USER &&
			usuarioLogin.senha == process.env.SENHA
		) {
			res.redirect("/admin");
		}

		res.redirect("/");
	} else {
		res.send("Usuário não existe");
	}
});

/* POST para usuarios. */
router.post("/", function (req, res, next) {
	// Cria uma variavel usuário com o body da requisição
	const user = req.body;

	// Converte o valor do checkbox "termos" para booleano
	user.termos = user.termos === "on";

	// Valida o usuário antes de colocar na sessão
	const { error, _ } = validador.validate(user);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Seta a session para ser esse usuário
	req.session.user = user;

	// Insere o usuario na lista de usuários do servidor
	usuarios.push(user);

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
