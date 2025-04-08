import conectar from "./conexao.js";
import Candidato from "../model/candidato.js";

export default class CandidatoDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidato (
                cpf VARCHAR(14) PRIMARY KEY,
                titulo VARCHAR(20) NOT NULL UNIQUE,
                nome VARCHAR(100) NOT NULL,
                endereco VARCHAR(150),
                numero VARCHAR(10),
                bairro VARCHAR(50),
                cidade VARCHAR(50),
                uf VARCHAR(2),
                cep VARCHAR(10),
                renda DECIMAL(10, 2)
            )`;
            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao criar a tabela candidato: " + erro);
        }
    }

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `INSERT INTO candidato (
                cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, renda
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const parametros = [
                candidato.cpf,
                candidato.titulo,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.uf,
                candidato.cep,
                candidato.renda
            ];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao gravar candidato: ", erro);
            } finally {
                await conexao.release();
            }
        }
    }

    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `UPDATE candidato SET
                titulo = ?, nome = ?, endereco = ?, numero = ?, bairro = ?,
                cidade = ?, uf = ?, cep = ?, renda = ?
                WHERE cpf = ?`;

            const parametros = [
                candidato.titulo,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.uf,
                candidato.cep,
                candidato.renda,
                candidato.cpf
            ];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao alterar candidato: ", erro);
            } finally {
                await conexao.release();
            }
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `DELETE FROM candidato WHERE cpf = ?`;
            const parametros = [candidato.cpf];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao excluir candidato: ", erro);
            } finally {
                await conexao.release();
            }
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM candidato ORDER BY nome`;
        const [registros] = await conexao.execute(sql);
        await conexao.release();

        const lista = registros.map(registro => new Candidato(
            registro.cpf,
            registro.titulo,
            registro.nome,
            registro.endereco,
            registro.numero,
            registro.bairro,
            registro.cidade,
            registro.uf,
            registro.cep,
            registro.renda
        ));

        return lista;
    }

    async consultarPorCPF(cpf) {
        const conexao = await conectar();
        const sql = `SELECT * FROM candidato WHERE cpf = ?`;
        const [registros] = await conexao.execute(sql, [cpf]);
        await conexao.release();

        if (registros.length > 0) {
            const r = registros[0];
            return new Candidato(
                r.cpf,
                r.titulo,
                r.nome,
                r.endereco,
                r.numero,
                r.bairro,
                r.cidade,
                r.uf,
                r.cep,
                r.renda
            );
        }

        return null;
    }
}
