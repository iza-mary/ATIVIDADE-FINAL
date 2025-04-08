import conectar from "./conexao.js";
import Partido from "../model/partido.js";

export default class PartidoDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS partido (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                sigla VARCHAR(10) NOT NULL UNIQUE,
                numero INT NOT NULL
            )`;
            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao criar a tabela partido: " + erro);
        }
    }

    async gravar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `INSERT INTO partido (nome, sigla, numero)
                         VALUES (?, ?, ?)`;
            const parametros = [
                partido.nome ?? null,
                partido.sigla ?? null,
                partido.numero ?? null
            ];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao gravar partido: ", erro);
            } finally {
                await conexao.release();
            }
        }
    }

    async alterar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `UPDATE partido SET nome = ?, sigla = ?, numero = ? WHERE id = ?`;
            const parametros = [
                partido.nome,
                partido.sigla,
                partido.numero,
                partido.id
            ];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao alterar partido: ", erro);
            } finally {
                await conexao.release();
            }
        }
    }

    async excluir(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `DELETE FROM partido WHERE id = ?`;
            const parametros = [partido.id];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error("Erro ao excluir partido: ", erro);
            } finally {
                await conexao.release();
            }
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM partido ORDER BY nome`;
        const [registros] = await conexao.execute(sql);
        await conexao.release();

        let lista = [];
        for (const registro of registros) {
            const partido = new Partido(
                registro.id,
                registro.nome,
                registro.sigla,
                registro.numero
            );
            lista.push(partido);
        }

        return lista;
    }

    async consultarPorID(id) {
        const conexao = await conectar();
        const sql = `SELECT * FROM partido WHERE id = ?`;
        const [registros] = await conexao.execute(sql, [id]);
        await conexao.release();

        if (registros.length > 0) {
            const registro = registros[0];
            return new Partido(
                registro.id,
                registro.nome,
                registro.sigla,
                registro.numero
            );
        }

        return null;
    }
}
