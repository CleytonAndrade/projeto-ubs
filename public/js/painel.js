let campoAtual = null;
let novoValorAtual = null;

function adicionarEventosEdicao() {
    const botoesEdicao = document.querySelectorAll(".edit-btn");

    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", function () {
            const campo = this.getAttribute("data-campo");
            editarCampo(campo);
        });
    });

    const botoesConfirmacao = document.querySelectorAll(".confirm-btn");
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener("click", function () {
            const campo = this.getAttribute("data-campo");
            const input = document.querySelector(`#user-${campo} .input-edicao`);
            novoValorAtual = input.value;
            campoAtual = campo;
            mostrarModalConfirmacao();
        });
    });
}

function editarCampo(campo) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

    span.classList.add("esconder");
    input.classList.add("mostrar");
    botaoConfirmar.classList.add("mostrar");
    botaoEditar.classList.add("esconder");

    input.value = span.textContent;
}

function mostrarModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    modal.style.display = "flex";

    const confirmarBtn = document.getElementById("confirmar-edicao");
    const cancelarBtn = document.getElementById("cancelar-edicao");

    confirmarBtn.onclick = () => {
        atualizarUsuario(campoAtual, novoValorAtual);
        modal.style.display = "none";
    };

    cancelarBtn.onclick = () => {
        const p = document.getElementById(`user-${campoAtual}`);
        const span = p.querySelector("span");
        const input = p.querySelector(".input-edicao");
        const botaoEditar = p.querySelector(".edit-btn");
        const botaoConfirmar = p.querySelector(".confirm-btn");

        input.classList.remove("mostrar");
        botaoConfirmar.classList.remove("mostrar");
        botaoEditar.classList.remove("esconder");
        span.classList.remove("esconder");

        modal.style.display = "none";
    };
}

async function atualizarUsuario(campo, novoValor) {
    try {
        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ campo, valor: novoValor }),
        });

        if (!resposta.ok) {
            const errorMsg = await resposta.text();
            throw new Error(errorMsg);
        }

        const responseData = await resposta.json();
        mostrarMensagem(responseData.message);

        const p = document.getElementById(`user-${campo}`);
        const span = p.querySelector("span");
        const input = p.querySelector(".input-edicao");
        const botaoEditar = p.querySelector(".edit-btn");
        const botaoConfirmar = p.querySelector(".confirm-btn");

        span.textContent = novoValor;
        input.classList.remove("mostrar");
        botaoConfirmar.classList.remove("mostrar");
        botaoEditar.classList.remove("esconder");
        span.classList.remove("esconder");
    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        mostrarMensagem("Erro ao atualizar os dados.", false);
    }
}

function mostrarMensagem(msg, sucesso = true) {
    const modal = document.getElementById("mensagem-modal");
    const texto = document.getElementById("mensagem-texto");

    texto.textContent = msg;
    texto.style.color = sucesso ? "green" : "red";
    modal.style.display = "flex";

    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);
}

async function carregarDadosUsuario() {
    try {
        const resposta = await fetch("/usuario");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar os dados do usuário");
        }

        const dadosUsuario = await resposta.json();

        document.getElementById("user-name").textContent = dadosUsuario.nome;
        document.getElementById("user-full-name-display").textContent = dadosUsuario.nome;
        document.getElementById("user-username-display").textContent = dadosUsuario.usuario;
        document.getElementById("user-email-display").textContent = dadosUsuario.email;
        document.getElementById("user-telefone-display").textContent = dadosUsuario.telefone;
        document.getElementById("user-endereco-display").textContent = `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
        document.getElementById("user-cep-display").textContent = dadosUsuario.cep;
        document.getElementById("user-nascimento-display").textContent = dadosUsuario.nascimento;

    } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
        mostrarMensagem("Erro ao carregar os dados.", false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
    adicionarEventosEdicao();
});
