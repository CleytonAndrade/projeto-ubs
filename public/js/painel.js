let campoAtual = null;
let novoValorAtual = null;

function adicionarEventosEdicao() {
    const botoesEdicao = document.querySelectorAll(".edit-btn");
    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", () => editarCampo(this.getAttribute("data-campo")));
    });

    const botoesConfirmacao = document.querySelectorAll(".confirm-btn");
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener("click", () => {
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

    toggleVisibility(span, input, botaoEditar, botaoConfirmar);
    input.value = span.textContent;
}

function toggleVisibility(span, input, botaoEditar, botaoConfirmar) {
    span.classList.toggle("esconder");
    input.classList.toggle("mostrar");
    botaoConfirmar.classList.toggle("mostrar");
    botaoEditar.classList.toggle("esconder");
}

function mostrarModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    modal.classList.add("mostrar");

    document.getElementById("confirmar-edicao").onclick = () => {
        atualizarUsuario(campoAtual, novoValorAtual);
        modal.classList.remove("mostrar");
    };

    document.getElementById("cancelar-edicao").onclick = () => {
        const p = document.getElementById(`user-${campoAtual}`);
        const span = p.querySelector("span");
        const input = p.querySelector(".input-edicao");
        const botaoEditar = p.querySelector(".edit-btn");
        const botaoConfirmar = p.querySelector(".confirm-btn");

        toggleVisibility(span, input, botaoEditar, botaoConfirmar);
        modal.classList.remove("mostrar");
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

        if (!resposta.ok) throw new Error(await resposta.text());

        const responseData = await resposta.json();
        mostrarMensagem(responseData.message);
        atualizarCampoNoPainel(campo, novoValor);

    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        mostrarMensagem("Erro ao atualizar os dados.", false);
    }
}

function atualizarCampoNoPainel(campo, novoValor) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

    span.textContent = novoValor;
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);
}

function mostrarMensagem(msg, sucesso = true) {
    const modal = document.getElementById("mensagem-modal");
    const texto = document.getElementById("mensagem-texto");

    texto.textContent = msg;
    texto.style.color = sucesso ? "green" : "red";
    modal.classList.add("mostrar");

    setTimeout(() => modal.classList.remove("mostrar"), 3000);
}

async function carregarDadosUsuario() {
    try {
        const resposta = await fetch("/usuario");

        if (!resposta.ok) throw new Error("Erro ao carregar os dados do usuário");

        const dadosUsuario = await resposta.json();
        preencherDadosUsuario(dadosUsuario);

    } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
        mostrarMensagem("Erro ao carregar os dados.", false);
    }
}

function preencherDadosUsuario(dadosUsuario) {
    document.getElementById("user-name").textContent = dadosUsuario.nome;
    document.getElementById("user-full-name-display").textContent = dadosUsuario.nome;
    document.getElementById("user-username-display").textContent = dadosUsuario.usuario;
    document.getElementById("user-email-display").textContent = dadosUsuario.email;
    document.getElementById("user-telefone-display").textContent = dadosUsuario.telefone;
    document.getElementById("user-endereco-display").textContent = `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
    document.getElementById("user-cep-display").textContent = dadosUsuario.cep;
    document.getElementById("user-nascimento-display").textContent = dadosUsuario.nascimento;
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
    adicionarEventosEdicao();
});
