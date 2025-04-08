export default function autenticar(req, res, next) {
    if (req.session.autenticado) {
        next(); // Usuário autenticado, segue pra rota protegida
    } else {
        res.redirect("/login");
    }
}
