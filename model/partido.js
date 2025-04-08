import PartidoDB from "../database/partidoDB.js";

export default class Partido {
    #id;
    #nome;
    #sigla;
    #numero;

    constructor(id, nome, sigla, numero) {
        this.#id = id;
        this.#nome = nome;
        this.#sigla = sigla;
        this.#numero = numero;
    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get sigla() {
        return this.#sigla;
    }

    set sigla(novaSigla) {
        this.#sigla = novaSigla;
    }

    get numero() {
        return this.#numero;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            sigla: this.#sigla,
            numero: this.#numero
        };
    }

    async gravar() {
        const partidoDB = new PartidoDB();
        await partidoDB.gravar(this);
    }

    async alterar() {
        const partidoDB = new PartidoDB();
        await partidoDB.alterar(this);
    }

    async excluir() {
        const partidoDB = new PartidoDB();
        await partidoDB.excluir(this);
    }

    static async consultar() {
        const partidoDB = new PartidoDB();
        return await partidoDB.consultar();
    }

    async consultarID() {
        const partidoDB = new PartidoDB();
        return await partidoDB.consultarPorID(this.#id);
    }
}
