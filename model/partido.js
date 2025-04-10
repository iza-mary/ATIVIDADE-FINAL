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

    get nome() {
        return this.#nome;
    }

    get sigla() {
        return this.#sigla;
    }

    get numero() {
        return this.#numero;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set sigla(novaSigla) {
        this.#sigla = novaSigla;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    // Converter para JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            sigla: this.#sigla,
            numero: this.#numero
        };
    }

    static #partidoDB = new PartidoDB();

    // Métodos de banco de dados
    async gravar() {
        await Partido.#partidoDB.gravar(this);
    }

    async alterar() {
        await Partido.#partidoDB.alterar(this);
    }

    async excluir() {
        await Partido.#partidoDB.excluir(this);
    }

    static async consultar() {
        return await Partido.#partidoDB.consultar();
    }

    static async consultarPorID(id) {
        return await Partido.#partidoDB.consultarPorID(id);
    }
}
