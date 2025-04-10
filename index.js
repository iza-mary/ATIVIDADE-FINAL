import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import autenticar from "./seguranca/autenticar.js";


import rotaPartidos from "./rotas/partidoRota.js";
import rotaCandidatos from "./rotas/candidatoRota.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const host = '0.0.0.0';
const porta = 2000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão (30 minutos)
app.use(
    session({
        secret: "m1Nh4Ch4v3S3cR3t4",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 30 } // 30 minutos
    })
);

app.use(express.static("publico"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "home.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "login.html"));
});

app.post("/login", (req, res) => {
    const { usuario, email, senha } = req.body;

    if (usuario === "admin" && email === "admin@email.com" && senha === "admin321") {
        req.session.autenticado = true;
        res.redirect("/privado/menu.html");
    } else {
        res.redirect("/login");
    }
});


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});


app.get("/sessao", (req, res) => {
    res.json({ autenticado: req.session.autenticado || false });
});


app.use("/privado/scripts", express.static(path.join(__dirname, "privado/scripts")));

app.use("/privado", autenticar);
app.use("/privado", express.static(path.join(__dirname, "privado")));


app.get("/privado/partidos.html", (req, res) => {
    res.sendFile(path.join(__dirname, "privado", "partidos.html"));
});

app.get("/privado/candidatos.html", (req, res) => {
    res.sendFile(path.join(__dirname, "privado", "candidatos.html"));
});

app.get("/privado/menu.html", (req, res) => {
    res.sendFile(path.join(__dirname, "privado", "menu.html"));
});


app.use("/api/partidos", rotaPartidos);
app.use("/api/candidatos", rotaCandidatos);

// Inicia o servidor
app.listen(porta, host, () => {
    console.log(`Servidor rodando: http://${host}:${porta}`);
});
