import CandidatoDB from "../database/candidatosDB.js";

export default class Candidato {
    #cpf;
    #titulo;
    #nome;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #renda;

    constructor(cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, renda) {
        this.#cpf = cpf;
        this.#titulo = titulo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#renda = renda;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(valor) {
        this.#cpf = valor;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(valor) {
        this.#titulo = valor;
    }

    get nome() {
        return this.#nome;
    }

    set nome(valor) {
        this.#nome = valor;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(valor) {
        this.#endereco = valor;
    }

    get numero() {
        return this.#numero;
    }

    set numero(valor) {
        this.#numero = valor;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(valor) {
        this.#bairro = valor;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(valor) {
        this.#cidade = valor;
    }

    get uf() {
        return this.#uf;
    }

    set uf(valor) {
        this.#uf = valor;
    }

    get cep() {
        return this.#cep;
    }

    set cep(valor) {
        this.#cep = valor;
    }

    get renda() {
        return this.#renda;
    }

    set renda(valor) {
        this.#renda = valor;
    }

    toJSON() {
        return {
            cpf: this.#cpf,
            titulo: this.#titulo,
            nome: this.#nome,
            endereco: this.#endereco,
            numero: this.#numero,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf,
            cep: this.#cep,
            renda: this.#renda
        };
    }

    async gravar() {
        const db = new CandidatoDB();
        await db.gravar(this);
    }

    async alterar() {
        const db = new CandidatoDB();
        await db.alterar(this);
    }

    async excluir() {
        const db = new CandidatoDB();
        await db.excluir(this);
    }

    static async consultar() {
        const db = new CandidatoDB();
        return await db.consultar();
    }

    async consultarCPF() {
        const db = new CandidatoDB();
        return await db.consultarPorCPF(this.#cpf);
    }
}
