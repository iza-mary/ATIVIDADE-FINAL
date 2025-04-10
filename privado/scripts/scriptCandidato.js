const formCandidato = document.getElementById("formCandidato");
let acao = "cadastrar";
let idEdicao = null;

formCandidato.onsubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!formCandidato.checkValidity()) {
        formCandidato.classList.add("was-validated");
    } else {
        const dados = pegarDadosCandidato();

        const metodo = acao === "cadastrar" ? "POST" : "PUT";

        fetch("/api/candidatos", {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then(res => res.json()).then(d => {
            mostrarMensagem(d.mensagem, d.status ? "success" : "danger");
            mostrarTabelaCandidato();
            formCandidato.reset();
            formCandidato.classList.remove("was-validated");
            acao = "cadastrar";
            idEdicao = null;
        });
    }
};

function pegarDadosCandidato() {
    return {
        cpf: document.getElementById("cpf").value,
        titulo: document.getElementById("titulo_eleitor").value,
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        numero: document.getElementById("numero_endereco").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        uf: document.getElementById("uf").value,
        cep: document.getElementById("cep").value,
        renda: document.getElementById("renda_mensal").value,
        partidoId: document.getElementById("partidoId").value
    };
}

function mostrarTabelaCandidato() {
    fetch("/api/candidatos")
        .then(res => res.json())
        .then(dados => {
            const candidatos = dados.candidatos || [];
            const tabela = document.getElementById("tabelaCandidato");
            tabela.innerHTML = "";

            if (candidatos.length === 0) {
                mostrarMensagem("Nenhum candidato cadastrado", "warning");
                return;
            }

            candidatos.forEach(c => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${c.nome}</td>
                    <td>${c.cpf}</td>
                    <td>${c.titulo}</td>
                    <td>${c.partidoNome || "N/A"}</td>
                    <td>${c.cidade}</td>
                    <td>${c.uf}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick='editarCandidato(${JSON.stringify(c)})'>✏️</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirCandidato("${c.cpf}")'>🗑️</button>
                    </td>
                `;
                tabela.appendChild(linha);
            });
        });
}

function editarCandidato(c) {
    document.getElementById("cpf").value = c.cpf;
    document.getElementById("titulo_eleitor").value = c.titulo;
    document.getElementById("nome").value = c.nome;
    document.getElementById("endereco").value = c.endereco;
    document.getElementById("numero_endereco").value = c.numero;
    document.getElementById("bairro").value = c.bairro;
    document.getElementById("cidade").value = c.cidade;
    document.getElementById("uf").value = c.uf;
    document.getElementById("cep").value = c.cep;
    document.getElementById("renda_mensal").value = c.renda;
    document.getElementById("partidoId").value = c.partidoId;

    idEdicao = c.cpf;
    acao = "atualizar";
}

function excluirCandidato(cpf) {
    fetch("/api/candidatos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf })
    }).then(res => res.json()).then(d => {
        mostrarMensagem(d.mensagem, d.status ? "success" : "danger");
        mostrarTabelaCandidato();
    });
}

function mostrarMensagem(mensagem, tipo = "success") {
    const espacoMensagem = document.getElementById("mensagem");
    espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => espacoMensagem.innerHTML = "", 5000);
}

function carregarPartidos() {
    fetch("/api/partidos")
        .then(res => res.json())
        .then(dados => {
            const partidos = dados.partidos || [];
            const select = document.getElementById("partidoId");

            select.innerHTML = `<option value="">Selecione...</option>`;

            partidos.forEach(p => {
                const option = document.createElement("option");
                option.value = p.id;
                option.textContent = `${p.nome} (${p.sigla})`;
                select.appendChild(option);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar partidos:", err);
            mostrarMensagem("Erro ao carregar partidos", "danger");
        });
}

carregarPartidos();
mostrarTabelaCandidato();
