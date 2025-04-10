import CandidatoDB from "../database/candidatosDB.js";

export default class Candidato {
    #cpf;
    #titulo_eleitor;
    #nome;
    #endereco;
    #numero_endereco;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #renda_mensal;
    #partidoId;

    constructor(cpf, titulo_eleitor, nome, endereco, numero_endereco, bairro, cidade, uf, cep, renda_mensal, partidoId) {
        this.#cpf = cpf;
        this.#titulo_eleitor = titulo_eleitor;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#numero_endereco = numero_endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#renda_mensal = renda_mensal;
        this.#partidoId = partidoId;
    }

  
    get cpf() { return this.#cpf; }
    get titulo() { return this.#titulo_eleitor; } 
    get nome() { return this.#nome; }
    get endereco() { return this.#endereco; }
    get numero() { return this.#numero_endereco; } 
    get bairro() { return this.#bairro; }
    get cidade() { return this.#cidade; }
    get uf() { return this.#uf; }
    get cep() { return this.#cep; }
    get renda() { return this.#renda_mensal; }
    get partidoId() { return this.#partidoId; }

    // Setters
    set titulo(v) { this.#titulo_eleitor = v; }
    set nome(v) { this.#nome = v; }
    set endereco(v) { this.#endereco = v; }
    set numero(v) { this.#numero_endereco = v; }
    set bairro(v) { this.#bairro = v; }
    set cidade(v) { this.#cidade = v; }
    set uf(v) { this.#uf = v; }
    set cep(v) { this.#cep = v; }
    set renda(v) { this.#renda_mensal = v; }
    set partidoId(v) { this.#partidoId = v; }

    // Converter para JSON
    toJSON() {
        return {
            cpf: this.#cpf,
            titulo: this.#titulo_eleitor,
            nome: this.#nome,
            endereco: this.#endereco,
            numero: this.#numero_endereco,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf,
            cep: this.#cep,
            renda: this.#renda_mensal,
            partidoId: this.#partidoId
        };
    }

    // Banco de dados
    static #db = new CandidatoDB();

    async gravar() {
        await Candidato.#db.gravar(this);
    }

    async alterar() {
        await Candidato.#db.alterar(this);
    }

    async excluir() {
        await Candidato.#db.excluir(this);
    }

    static async consultar() {
        return await Candidato.#db.consultar();
    }

    static async consultarPorCPF(cpf) {
        return await Candidato.#db.consultarPorCPF(cpf);
    }
}
