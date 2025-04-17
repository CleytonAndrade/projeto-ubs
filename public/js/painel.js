let campoAtual = null;
let novoValorAtual = null;

function adicionarEventosEdicao() {
    const botoesEdicao = document.querySelectorAll(".edit-btn");

    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", function () {
            const campo = this.getAttribute("data-campo");
            editarCampo(campo); // Passa o nome correto do campo para a função de edição
        });
    });

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
        document.querySelector(`#user-${campo}-display`).innerText = novoValor; // Atualiza a exibição
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
