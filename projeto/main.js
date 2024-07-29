var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
require("dotenv").config();

var mustacheExpress = require("mustache-express");

var indexRouter = require("./routes/index");
var cadastroRouter = require("./routes/cadastro");
var usersRouter = require("./routes/usuarios");
var adminRouter = require("./routes/admin");
var loginRouter = require("./routes/login");
var criadorPaginasRouter = require("./routes/criadorPaginas");
var paginasRouter = require("./routes/paginas");

var app = express();

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Cria a sessao dos usuario
app.use(
	session({
		secret: "32uv508u0320",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 15 * 60 * 1000, // Tempo de vida do cookie em minutos
		},
	})
);

var paginas = [];   // Lista de todas as páginas

// Middleware para manter páginas uma variável global
// A variável poderá ser acessada em toda a aplicação
app.use((req, res, next) => {
    req.paginas = paginas;
    next();
});

app.use("/", indexRouter);
app.use("/cadastrar", cadastroRouter);
app.use("/login", loginRouter);
app.use("/usuarios", usersRouter);
app.use("/admin", adminRouter);
app.use("/criarPagina", criadorPaginasRouter);
app.use("/paginas", paginasRouter);

module.exports = app;
