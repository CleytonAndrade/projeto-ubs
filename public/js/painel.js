// Variáveis globais para armazenar o campo sendo editado e seu novo valor
let campoAtual = null;
let novoValorAtual = null;

/**
 * Função para adicionar eventos de edição aos botões.
 * Envolvem os botões de edição e confirmação.
 */
function adicionarEventosEdicao() {
    const botoesEdicao = document.querySelectorAll(".edit-btn");
    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
            editarCampo(event.target.getAttribute("data-campo"));
        });
    });

    const botoesConfirmacao = document.querySelectorAll(".confirm-btn");
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();

            const campoOriginal = event.target.getAttribute("data-campo");
            const input = document.querySelector(`#user-${campoOriginal} .input-edicao`);
            const valorDigitado = input.value;

            const mapeamento = {
                'full-name': 'nome',
                'username': 'usuario',
                'senha': null,
                'email': 'email',
                'telefone': 'telefone',
                'endereco': 'endereco',
                'cep': 'cep',
                'nascimento': 'nascimento'
            };

            const campoMapeado = mapeamento[campoOriginal];

            if (campoOriginal === 'senha') {
                if (valorDigitado.length < 6) {
                    mostrarMensagem("A senha deve ter no mínimo 6 caracteres.", false);
                    return;
                }
                campoAtual = 'senha';
                novoValorAtual = valorDigitado;
                mostrarModalConfirmacao();
                return;
            }

            if (!campoMapeado) {
                mostrarMensagem("Este campo não pode ser alterado por aqui.", false);
                return;
            }

            novoValorAtual = valorDigitado;
            campoAtual = campoMapeado;
            mostrarModalConfirmacao();
        });
    });
}

/**
 * Ativa o modo de edição para o campo selecionado.
 */
function editarCampo(campo) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

    toggleVisibility(span, input, botaoEditar, botaoConfirmar);

    input.value = campo !== "senha" ? span.textContent : "";
}

/**
 * Alterna visibilidade entre texto, input e botões.
 */
function toggleVisibility(span, input, botaoEditar, botaoConfirmar) {
    span.classList.toggle("esconder");
    input.classList.toggle("mostrar");
    botaoConfirmar.classList.toggle("mostrar");
    botaoEditar.classList.toggle("esconder");
}

/**
 * Exibe o modal de confirmação.
 */
function mostrarModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    modal.classList.add("mostrar");

    document.getElementById("confirmar-edicao").onclick = () => {
        if (campoAtual === 'senha') {
            atualizarSenha(novoValorAtual);
        } else {
            atualizarUsuario(campoAtual, novoValorAtual);
        }
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

/**
 * Envia os dados atualizados ao servidor.
 */
async function atualizarUsuario(campo, novoValor) {
    try {
        if (campo === 'endereco' && typeof novoValor === 'object') {
            novoValor = {
                rua: novoValor.rua,
                numero: novoValor.numero,
                bairro: novoValor.bairro,
                cidade: novoValor.cidade,
                estado: novoValor.estado
            };
        }

        novoValor = formatarValor(campo, novoValor);

        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ campo, valor: novoValor }),
        });

        if (!resposta.ok) {
            const erroText = await resposta.text();
            throw new Error(`Erro: ${erroText}`);
        }

        const responseData = await resposta.json();
        mostrarMensagem(responseData.message);
        atualizarCampoNoPainel(campo, novoValor);
    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        mostrarMensagem("Erro ao atualizar os dados.", false);
    }
}

/**
 * Atualiza a senha do usuário.
 */
async function atualizarSenha(novaSenha) {
    try {
        const resposta = await fetch("/atualizar-senha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senha: novaSenha }),
        });

        if (!resposta.ok) {
            const erroText = await resposta.text();
            throw new Error(`Erro: ${erroText}`);
        }

        const dados = await resposta.json();
        mostrarMensagem(dados.message || "Senha atualizada com sucesso.");
    } catch (err) {
        console.error("Erro ao atualizar a senha:", err);
        mostrarMensagem("Erro ao atualizar a senha.", false);
    }
}

/**
 * Atualiza a exibição do valor no painel.
 */
function atualizarCampoNoPainel(campo, novoValor) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

    novoValor = formatarValor(campo, novoValor);
    span.textContent = novoValor;
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);
}

/**
 * Exibe mensagens no modal de feedback.
 */
function mostrarMensagem(msg, sucesso = true) {
    const modal = document.getElementById("mensagem-modal");
    const texto = document.getElementById("mensagem-texto");

    texto.textContent = msg;
    texto.style.color = sucesso ? "green" : "red";
    modal.classList.add("mostrar");

    setTimeout(() => modal.classList.remove("mostrar"), 3000);
}

/**
 * Carrega os dados do usuário ao iniciar.
 */
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

/**
 * Preenche os dados do usuário no painel.
 */
function preencherDadosUsuario(dadosUsuario) {
    document.getElementById("user-name").textContent = dadosUsuario.nome;
    document.getElementById("user-full-name-display").textContent = dadosUsuario.nome;
    document.getElementById("user-username-display").textContent = dadosUsuario.usuario;
    document.getElementById("user-senha-display").textContent = "********";
    document.getElementById("user-email-display").textContent = dadosUsuario.email;
    document.getElementById("user-telefone-display").textContent = formatarTelefone(dadosUsuario.telefone);
    document.getElementById("user-endereco-display").textContent =
        `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
    document.getElementById("user-cep-display").textContent = formatarCEP(dadosUsuario.cep);
    document.getElementById("user-nascimento-display").textContent = formatarData(dadosUsuario.nascimento);
}

/**
 * Funções auxiliares de formatação
 */
function formatarData(data) {
    const novaData = new Date(data);
    return novaData.toLocaleDateString('pt-BR');
}

function formatarCEP(cep) {
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
}

function formatarTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function formatarValor(campo, valor) {
    if (campo === 'telefone') return formatarTelefone(valor);
    if (campo === 'cep') return formatarCEP(valor);
    if (campo === 'nascimento') return formatarData(valor);
    return valor;
}
