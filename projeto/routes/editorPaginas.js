var express = require("express");
var router = express.Router();
var multer = require("multer"); // Importa o módulo multer para lidar com multipart/form-data
var upload = multer(); // Configura o multer para não salvar arquivos no disco

/* GET editorPaginas. */
router.get("/:url", function (req, res, next) {
    // Verifica se o usuário está logado
    if (!req.session.user) {
        return res.send("Usuário não conectado"); // Se não estiver logado, envia uma mensagem de erro
    }

    res.render("editorPaginas"); // Renderiza a página editorPaginas
});

/* PUT editorPaginas. */
router.put("/:url", upload.none(), async function (req, res, next) {
    try {
        // Verifica se o usuário está logado
        if (!req.session.user) {
            return res.send("Usuário não conectado");
        }

        // Pega os dados enviados pelo formulário
        let novaPagina = req.body;

        console.log(novaPagina); // Loga os dados da nova página para debug

        // Acha o índice da página requerida
        var pageIndex = req.paginas.findIndex((p) => p.url === req.params.url);

        if (pageIndex === -1) {
            return res.status(404).send({ message: "Página não encontrada" });
        }

        // Atualiza a página com os novos dados
        req.paginas[pageIndex] = {
            titulo: novaPagina.titulo,
            url: req.params.url,
            html: novaPagina.html,
            imagem: novaPagina.imagem || req.paginas[pageIndex].imagem, // Mantém a imagem antiga se uma nova não for fornecida
        };

        res.status(200).send({ message: "Item editado com sucesso" });
    } catch (error) {
        res.status(500).send({
            message: "Erro ao editar item",
            error: error.message,
        });
    }
});

module.exports = router;
