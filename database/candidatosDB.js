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
                titulo_eleitor VARCHAR(20) NOT NULL UNIQUE,
                nome VARCHAR(100) NOT NULL,
                endereco VARCHAR(150),
                numero_endereco VARCHAR(10),
                bairro VARCHAR(50),
                cidade VARCHAR(50),
                uf VARCHAR(2),
                cep VARCHAR(10),
                renda_mensal DECIMAL(10, 2),
                partidoId INT NOT NULL,
                FOREIGN KEY (partidoId) REFERENCES partido(id)
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
                cpf, titulo_eleitor, nome, endereco, numero_endereco, bairro,
                cidade, uf, cep, renda_mensal, partidoId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
                candidato.renda,
                candidato.partidoId
            ];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao gravar candidato: ", erro);
            } finally {
                await conexao.release();
            }
        } else {
            console.warn("Objeto não é instância de Candidato.");
        }
    }

    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `UPDATE candidato SET
                titulo_eleitor = ?, nome = ?, endereco = ?, numero_endereco = ?, bairro = ?,
                cidade = ?, uf = ?, cep = ?, renda_mensal = ?, partidoId = ?
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
                candidato.partidoId,
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
        const sql = `
            SELECT 
                c.*, p.nome AS partidoNome
            FROM 
                candidato c
            INNER JOIN 
                partido p ON c.partidoId = p.id
            ORDER BY c.nome`;

        const [registros] = await conexao.execute(sql);
        await conexao.release();

        return registros.map(registro => ({
            cpf: registro.cpf,
            titulo: registro.titulo_eleitor,
            nome: registro.nome,
            endereco: registro.endereco,
            numero: registro.numero_endereco,
            bairro: registro.bairro,
            cidade: registro.cidade,
            uf: registro.uf,
            cep: registro.cep,
            renda: registro.renda_mensal,
            partidoId: registro.partidoId,
            partidoNome: registro.partidoNome
        }));
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
                r.titulo_eleitor,
                r.nome,
                r.endereco,
                r.numero_endereco,
                r.bairro,
                r.cidade,
                r.uf,
                r.cep,
                r.renda_mensal,
                r.partidoId
            );
        }

        return null;
    }
}
