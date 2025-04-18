let campoAtual = null;
let novoValorAtual = null;

document.addEventListener("DOMContentLoaded", function() {
    carregarDadosUsuario(); // Carrega os dados do usuário assim que a página for carregada
    adicionarEventosEdicao(); // Garante que os eventos de edição sejam carregados
});

// Função para carregar os dados do usuário
async function carregarDadosUsuario() {
    try {
        const resposta = await fetch("/usuario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os dados do usuário');
        }

        const dadosUsuario = await resposta.json();

        // Preenche os campos com os dados recebidos
        document.querySelector("#user-nome-display").innerText = dadosUsuario.nome;
        document.querySelector("#user-usuario-display").innerText = dadosUsuario.usuario;
        document.querySelector("#user-email-display").innerText = dadosUsuario.email;
        document.querySelector("#user-telefone-display").innerText = dadosUsuario.telefone;
        document.querySelector("#user-endereco-display").innerText = dadosUsuario.endereco;
        document.querySelector("#user-cep-display").innerText = dadosUsuario.cep;
        document.querySelector("#user-nascimento-display").innerText = dadosUsuario.nascimento;

    } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
        mostrarMensagem("Erro ao carregar os dados do usuário.", false); // Exibe uma mensagem de erro
    }
}

function adicionarEventosEdicao() {
    const botoesEdicao = document.querySelectorAll(".edit-btn");

    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", function () {
            const campo = this.getAttribute("data-campo");
            editarCampo(campo); // Passa o nome correto do campo para a função de edição
        });
    });

    // Escutando os botões de confirmação
    const botoesConfirmacao = document.querySelectorAll(".confirm-btn");
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener("click", function () {
            const campo = this.getAttribute("data-campo");
            const input = document.querySelector(`#user-${campo} .input-edicao`);
            novoValorAtual = input.value;
            campoAtual = campo;

            // Exibe o modal de confirmação
            mostrarModalConfirmacao();
        });
    });
}

function editarCampo(campo) {
    const campoElemento = document.getElementById(`user-${campo}-display`);
    const input = document.querySelector(`#user-${campo} .input-edicao`);
    const botaoConfirmar = document.querySelector(`#user-${campo} .confirm-btn`);
    const botaoEditar = document.querySelector(`#user-${campo} .edit-btn`);

    // Exibe o campo de input e o botão de confirmação
    campoElemento.style.display = 'none';
    botaoEditar.style.display = 'none';
    botaoConfirmar.style.display = 'inline';
    input.style.display = 'inline';

    // Preenche o input com o valor atual
    input.value = campoElemento.innerText;
}

function mostrarModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    modal.style.display = "flex";

    const confirmarBtn = document.getElementById("confirmar-edicao");
    const cancelarBtn = document.getElementById("cancelar-edicao");

    // Quando o usuário clica em "Sim", confirma a edição
    confirmarBtn.addEventListener("click", () => {
        atualizarUsuario(campoAtual, novoValorAtual);
        modal.style.display = "none";  // Fecha o modal após a confirmação
    });

    // Quando o usuário clica em "Não", cancela a edição
    cancelarBtn.addEventListener("click", () => {
        const input = document.querySelector(`#user-${campoAtual} .input-edicao`);
        input.style.display = "none";
        document.querySelector(`#user-${campoAtual} .confirm-btn`).style.display = "none";
        document.querySelector(`#user-${campoAtual} .edit-btn`).style.display = "inline";
        modal.style.display = "none";  // Fecha o modal após o cancelamento
    });
}

async function atualizarUsuario(campo, novoValor) {
    try {
        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                campo: campo,  // Nome do campo a ser atualizado (ex: 'nome', 'email', etc.)
                valor: novoValor,  // Novo valor para o campo
            }),
        });

        if (!resposta.ok) {
            const errorMsg = await resposta.text();
            throw new Error(errorMsg);
        }

        const responseData = await resposta.json();
        mostrarMensagem(responseData.message);  // Exibe mensagem de sucesso
        document.querySelector(`#user-${campo}-display`).innerText = novoValor; // Atualiza a exibição do dado
    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        mostrarMensagem("Erro ao atualizar os dados.", false);  // Exibe mensagem de erro
    }
}

// Função para mostrar mensagens de sucesso ou erro
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
