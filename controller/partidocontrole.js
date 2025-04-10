import Partido from "../model/partido.js";

export default class PartidoControle {
    
    // POST - Gravar partido
    gravar(req, res) {
        if (req.method === 'POST' && req.is("application/json")) {
            const { nome, sigla, numero } = req.body;

            if (nome && sigla && numero) {
                const partido = new Partido(null, nome, sigla, numero);

                partido.gravar().then(() => {
                    res.status(201).json({
                        status: true,
                        mensagem: "Partido gravado com sucesso!"
                    });
                }).catch(erro => {
                    res.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar partido: " + erro
                    });
                });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: "Todos os campos obrigatórios devem ser informados"
                });
            }
        } else {
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
    }

    // PUT/PATCH - Alterar partido
    alterar(req, res) {
        if ((req.method === 'PUT' || req.method === 'PATCH') && req.is("application/json")) {
            const { id, nome, sigla, numero } = req.body;

            if (id && nome && sigla && numero) {
                const partido = new Partido(id, nome, sigla, numero);

                partido.alterar().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: "Partido alterado com sucesso!"
                    });
                }).catch(erro => {
                    res.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar partido: " + erro
                    });
                });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: "Todos os campos obrigatórios devem ser informados"
                });
            }
        } else {
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
    }

    // DELETE - Excluir partido
   // DELETE - Excluir partido
excluir(req, res) {
    if (req.method === 'DELETE' && req.is("application/json")) {
        const { id } = req.body;

        if (id) {
            const partido = new Partido(id, null, null, null);

            partido.excluir().then(() => {
                res.status(200).json({
                    status: true,
                    mensagem: "Partido excluído com sucesso!"
                });
            }).catch(erro => {
                if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
                    res.status(400).json({
                        status: false,
                        mensagem: "Não é possível excluir este partido, pois ele está vinculado a um ou mais candidatos."
                    });
                } else {
                    res.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir partido: " + erro.message
                    });
                }
            });
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Informe o ID do partido a ser excluído!"
            });
        }
    } else {
        res.status(400).json({ status: false, mensagem: "Requisição inválida" });
    }
}

    // GET - Consultar partidos
    consultar(req, res) {
        if (req.method === 'GET') {
            Partido.consultar().then(lista => {
                res.status(200).json({
                    status: true,
                    partidos: lista
                });
            }).catch(erro => {
                res.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar partidos: " + erro
                });
            });
        } else {
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
    }
}
