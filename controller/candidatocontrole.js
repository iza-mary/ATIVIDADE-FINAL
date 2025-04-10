import Candidato from "../model/candidato.js";

export default class CandidatoCtrl {

    // POST - Gravar novo candidato
    gravar(req, res) {
        if (req.method === 'POST' && req.is("application/json")) {
            const {
                cpf, titulo, nome, endereco, numero, bairro,
                cidade, uf, cep, renda, partidoId
            } = req.body;

            if (cpf && titulo && nome && partidoId) {
                const candidato = new Candidato(
                    cpf, titulo, nome, endereco, numero, bairro,
                    cidade, uf, cep, renda, partidoId
                );

                candidato.gravar().then(() => {
                    res.status(201).json({
                        status: true,
                        mensagem: "Candidato gravado com sucesso!"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o candidato: " + erro
                    });
                });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: "Campos obrigatórios (cpf, titulo, nome, partidoId) não informados"
                });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // PUT ou PATCH - Alterar candidato
    alterar(req, res) {
        if ((req.method === 'PUT' || req.method === 'PATCH') && req.is("application/json")) {
            const {
                cpf, titulo, nome, endereco, numero, bairro,
                cidade, uf, cep, renda, partidoId
            } = req.body;

            if (cpf && titulo && nome && partidoId) {
                const candidato = new Candidato(
                    cpf, titulo, nome, endereco, numero, bairro,
                    cidade, uf, cep, renda, partidoId
                );

                candidato.alterar().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: "Candidato alterado com sucesso!"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar o candidato: " + erro
                    });
                });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: "Campos obrigatórios (cpf, titulo, nome, partidoId) não informados"
                });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // DELETE - Excluir candidato
    excluir(req, res) {
        if (req.method === 'DELETE' && req.is("application/json")) {
            const { cpf } = req.body;

            if (cpf) {
                const candidato = new Candidato(cpf, null, null, null, null, null, null, null, null, null, null);

                candidato.excluir().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: "Candidato excluído com sucesso!"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o candidato: " + erro
                    });
                });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do candidato a ser excluído!"
                });
            }
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // GET - Consultar todos os candidatos
    consultar(req, res) {
        if (req.method === 'GET') {
            Candidato.consultar().then((lista) => {
                res.status(200).json({
                    status: true,
                    candidatos: lista
                });
            }).catch((erro) => {
                res.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar os candidatos: " + erro
                });
            });
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }
}
