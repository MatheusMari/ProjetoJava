var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs"); // Para ler arquivos e diretórios

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

// Configurar armazenamento do multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		var uploadDir = "public/images";
		// Verificar se o diretório existe, caso contrário, criá-lo
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); // Renomear o arquivo com a data atual para evitar conflitos
	},
});

var upload = multer({ storage: storage });

/* GET paginas. */
router.get("/", function (req, res, next) {
	// Verificar se usuário está logado
	if (!req.session.user) {
		return res.send("Usuário não conectado");
	}

	res.render("paginas", {
		admin: isAdmin(req.session.user),
		logado: !req.session.user,
		paginas: req.paginas,
	});
});

/* POST paginas. */
router.post("/", upload.single("imagem"), function (req, res, next) {
	if (req.paginas.find((p) => p.url === req.body.url) || req.body.url == "") {
		res.status(415).send({ message: "URL já usada/indisponível" });
	} else {
		// Verificar se usuário está logado
		if (!req.session.user) {
			return res.send("Usuário não conectado");
		}

		var pagina = {
			titulo: req.body.titulo || "Sem Título",
			url: req.body.url,
			html: req.body.html,
			imagem: req.file ? req.file.filename : null, // Nome do arquivo da imagem salva
		};

		req.paginas = req.paginas || [];
		req.paginas.push(pagina);

		res.redirect("/paginas/" + req.body.url);
	}
});

/* GET pagina criada */
router.get("/:url", function (req, res, next) {
	// Variável Boolean que retorna se encontrou dada url na lista de paginas
	var pagina = req.paginas.find((p) => p.url === req.params.url);

	// Renderiza o html na página
	if (pagina) {
		res.send(pagina.html);
	} else {
		res.status(404).send("Página não encontrada");
	}
});

// Método DELETE
router.delete("/deletar/:url", async (req, res) => {
	try {
		// Acha o indice da página requerida
		var pageIndex = req.paginas.findIndex((p) => p.url === req.params.url);

		req.paginas.pop(pageIndex);
	} catch (error) {
		res.status(500).send({
			message: "Erro ao excluir item",
			error: error.message,
		});
	}
});

module.exports = router;
