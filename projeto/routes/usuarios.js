var express = require("express");
var router = express.Router();

var validadorCadastro = require("../validator/Cadastro.js");
var validadorLogin = require("../validator/Login.js");

// Lista de usuários no servidor
var usuarios = [];

// Função para comparar usuários ignorando os campos "termos" e "email"
function comparaUsuario(usuarioA, usuarioB) {
	return (
		usuarioA.username === usuarioB.username &&
		usuarioA.senha === usuarioB.senha
	);
}

// Função para verificar se o usuário é um admin
function isAdmin(usuario) {
    if (
		usuario.username == process.env.USER &&
        usuario.email == process.env.EMAIL &&
		usuario.senha == process.env.SENHA
	) {
        return true;
    }

    return false;
}

/* GET usuarios */
router.get("/", function (req, res, next) {
	// Cria conta admin
	if (usuarios.length == 0) {
		usuarios.push({
			username: "admin",
			email: "admin@email. com",
			senha: "admin123"
		});
	}

	// Pega os dados do usuário
	var usuarioLogin = {
		username: req.query.username,
		senha: req.query.senha,
	};

	// Verifica se ocorreu algum problema no login
	const { error, _ } = validadorLogin.validate(usuarioLogin);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Checa se o usuário esta na lsita de usuarios
	const usuarioExiste = usuarios.some((usuario) =>
		comparaUsuario(usuario, usuarioLogin)
	);

	// Redireciona se o usuário existe
	if (usuarioExiste) {
		req.session.user = usuarioLogin;

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
	const { error, _ } = validadorCadastro.validate(user);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Seta a session para ser esse usuário
	req.session.user = user;

	// Insere o usuario na lista de usuários do servidor
	usuarios.push(user);

	// Verifica se o usuário é um admin
	if (isAdmin(user)) {
		// Redireciona a página de admin
		res.redirect("/admin");
	} else {
		// Se não tiver erro, redireciona ao inicio
		res.redirect("/");
	}
});

module.exports = router;
