import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import autenticar from "./seguranca/autenticar.js"; // protege as rotas

// Rotas da API
import rotaPartidos from "./rotas/partidoRota.js";
import rotaCandidatos from "./rotas/candidatoRota.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const host = '0.0.0.0';
const porta = 2000;

// Configurações básicas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(
    session({
        secret: "m1Nh4Ch4v3S3cR3t4",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 15 },
    })
);

// Arquivos públicos (HTMLs, CSS etc.)
app.use(express.static("publico"));

// Página inicial (home)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "home.html"));
});

// Página de login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "login.html"));
});

// Autenticação
app.post("/login", (req, res) => {
    const { usuario, email, senha } = req.body;

    if (usuario === "admin" && email === "admin@email.com" && senha === "admin321") {
        req.session.autenticado = true;
        res.redirect("/privado/menu.html");
    } else {
        res.redirect("/login");
    }
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

// Confere sessão
app.get("/sessao", (req, res) => {
    res.json({ autenticado: req.session.autenticado || false });
});

// Proteger rotas privadas
app.use("/privado", autenticar);
app.use("/privado", express.static("privado"));

// Rotas para páginas protegidas
app.get("/privado/cadastro-partido.html", (req, res) => {
    res.sendFile(path.join(__dirname, "privado", "cadastro-partido.html"));
});

app.get("/privado/cadastro-candidato.html", (req, res) => {
    res.sendFile(path.join(__dirname, "privado", "cadastro-candidato.html"));
});

app.get("/privado/menu.html", (req, res) => {
    res.sendFile(path.join(__dirname, "privado", "menu.html"));
});

// Rotas da API
app.use("/api/partidos", rotaPartidos);
app.use("/api/candidatos", rotaCandidatos);

// Inicia servidor
app.listen(porta, host, () => {
    console.log(`Servidor rodando: http://${host}:${porta}`);
});
