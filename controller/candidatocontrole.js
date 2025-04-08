import Candidato from "../model/candidato.js";

export default class CandidatoCtrl {

    // POST - Gravar novo candidato
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { nome, numero, cargo, partido_id } = dados;

            if (nome && numero && cargo && partido_id) {
                const candidato = new Candidato(null, nome, numero, cargo, partido_id);

                candidato.gravar().then(() => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Candidato gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o candidato: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos obrigatórios devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // PUT ou PATCH - Alterar candidato
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { id, nome, numero, cargo, partido_id } = dados;

            if (id && nome && numero && cargo && partido_id) {
                const candidato = new Candidato(id, nome, numero, cargo, partido_id);

                candidato.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato alterado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar o candidato: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos obrigatórios devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // DELETE - Excluir candidato
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const { id } = requisicao.body;

            if (id) {
                const candidato = new Candidato(id);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o candidato: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID do candidato a ser excluído!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // GET - Consultar todos os candidatos
    consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            Candidato.consultar().then((lista) => {
                resposta.status(200).json({
                    status: true,
                    candidatos: lista
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar os candidatos: " + erro
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }
}
