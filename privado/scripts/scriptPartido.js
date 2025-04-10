const formPartido = document.getElementById("formPartido");
let acao = "cadastrar";
let idEdicao = null;

formPartido.onsubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!formPartido.checkValidity()) {
        formPartido.classList.add("was-validated");
    } else {
        const dados = {
            id: idEdicao,
            nome: document.getElementById("nome").value,
            sigla: document.getElementById("sigla").value,
            numero: document.getElementById("numero").value
        };

        const metodo = acao === "cadastrar" ? "POST" : "PUT";

        fetch("/api/partidos", {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then(res => res.json()).then(d => {
            mostrarMensagem(d.mensagem, d.status ? "success" : "danger");
            mostrarTabelaPartido();
            formPartido.reset();
            formPartido.classList.remove("was-validated");
            acao = "cadastrar";
            idEdicao = null;
        });
    }
};

function mostrarTabelaPartido() {
    fetch("/api/partidos")
        .then(res => res.json())
        .then(dados => {
            const tabela = document.getElementById("tabelaPartido");
            tabela.innerHTML = "";

            const partidos = dados.partidos || [];

            if (partidos.length === 0) {
                mostrarMensagem("Nenhum partido cadastrado", "warning");
                return;
            }

            partidos.forEach(p => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${p.numero}</td>
                    <td>${p.nome}</td>
                    <td>${p.sigla}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick='editarPartido(${JSON.stringify(p)})'>✏️</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirPartido(${p.id})'>🗑️</button>
                    </td>
                `;
                tabela.appendChild(linha);
            });
        });
}

function editarPartido(p) {
    document.getElementById("nome").value = p.nome;
    document.getElementById("sigla").value = p.sigla;
    document.getElementById("numero").value = p.numero;

    idEdicao = p.id;
    acao = "atualizar";
}

function excluirPartido(id) {
    fetch("/api/partidos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(res => res.json()).then(d => {
        mostrarMensagem(d.mensagem, d.status ? "success" : "danger");
        mostrarTabelaPartido();
    });
}

function mostrarMensagem(mensagem, tipo = "success") {
    const espacoMensagem = document.getElementById("mensagem");
    espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => espacoMensagem.innerHTML = "", 4000);
}

// Carrega tabela ao abrir
mostrarTabelaPartido();
