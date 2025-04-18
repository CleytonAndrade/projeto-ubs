// Variáveis globais para armazenar o campo sendo editado e seu novo valor
let campoAtual = null;
let novoValorAtual = null;

<<<<<<< HEAD
=======
/**
 * Função para adicionar eventos de edição aos botões.
 * Envolvem os botões de edição e confirmação.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
function adicionarEventosEdicao() {
    // Adiciona eventos aos botões de edição
    const botoesEdicao = document.querySelectorAll(".edit-btn");
    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
<<<<<<< HEAD
=======
            // Inicia o processo de edição para o campo correspondente
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
            editarCampo(event.target.getAttribute("data-campo"));
        });
    });

<<<<<<< HEAD
=======
    // Adiciona eventos aos botões de confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
    const botoesConfirmacao = document.querySelectorAll(".confirm-btn");
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
<<<<<<< HEAD
=======
            // Obtém o campo e o valor do input após confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
            const campoOriginal = event.target.getAttribute("data-campo");
            const input = document.querySelector(`#user-${campoOriginal} .input-edicao`);
            const valorDigitado = input.value;

<<<<<<< HEAD
=======
            // Mapeia o campo original para o correspondente no banco de dados
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
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

<<<<<<< HEAD
            if (campoOriginal === 'senha') {
                const senha = input.value;
            
                if (senha.length < 6) {
                    mostrarMensagem("A senha deve ter no mínimo 6 caracteres.", false);
                    return;
                }
            
                campoAtual = 'senha';
                novoValorAtual = senha;
                mostrarModalConfirmacao();
                return;
            }
            
=======
            // Se o campo for "senha", realiza validação específica
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

            // Verifica se o campo é editável
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
            if (!campoMapeado) {
                mostrarMensagem("Este campo não pode ser alterado por aqui.", false);
                return;
            }
<<<<<<< HEAD
            

=======

            // Armazena o novo valor e campo para o processo de confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
            novoValorAtual = valorDigitado;
            campoAtual = campoMapeado;
            mostrarModalConfirmacao();
        });
    });
}

<<<<<<< HEAD

=======
/**
 * Função para ativar o modo de edição em um campo específico.
 * Alterna entre exibir o campo de edição e o valor exibido.
 * @param {string} campo - O campo a ser editado.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
function editarCampo(campo) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

<<<<<<< HEAD
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);

    if (campo !== "senha") {
        input.value = span.textContent;
    } else {
        input.value = "";
    }
}

function toggleVisibility(span, input, botaoEditar, botaoConfirmar) {
    span.classList.toggle("esconder");
    input.classList.toggle("mostrar");
    botaoConfirmar.classList.toggle("mostrar");
    botaoEditar.classList.toggle("esconder");
=======
    // Alterna a visibilidade dos elementos: texto, input e botões
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);

    // Preenche o input com o valor atual do campo, exceto para senha
    input.value = campo !== "senha" ? span.textContent : "";
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
}

/**
 * Função para alternar a visibilidade dos elementos de texto, input e botões.
 * @param {Element} span - O elemento de texto do campo.
 * @param {Element} input - O campo de input para edição.
 * @param {Element} botaoEditar - O botão de edição.
 * @param {Element} botaoConfirmar - O botão de confirmação.
 */
function toggleVisibility(span, input, botaoEditar, botaoConfirmar) {
    span.classList.toggle("esconder");
    input.classList.toggle("mostrar");
    botaoConfirmar.classList.toggle("mostrar");
    botaoEditar.classList.toggle("esconder");
}

/**
 * Exibe o modal de confirmação antes de aplicar a alteração do campo.
 */
function mostrarModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    modal.classList.add("mostrar");

<<<<<<< HEAD
=======
    // Ao confirmar, chama a função de atualização de dados
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
    document.getElementById("confirmar-edicao").onclick = () => {
        if (campoAtual === 'senha') {
            atualizarSenha(novoValorAtual);
        } else {
            atualizarUsuario(campoAtual, novoValorAtual);
        }
        modal.classList.remove("mostrar");
    };
<<<<<<< HEAD
    

=======

    // Ao cancelar, restaura o estado inicial sem alterações
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
    document.getElementById("cancelar-edicao").onclick = () => {
        const p = document.getElementById(`user-${campoAtual}`);
        const span = p.querySelector("span");
        const input = p.querySelector(".input-edicao");
        const botaoEditar = p.querySelector(".edit-btn");
        const botaoConfirmar = p.querySelector(".confirm-btn");

<<<<<<< HEAD
=======
        // Restaura a visibilidade dos elementos para o estado original
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
        toggleVisibility(span, input, botaoEditar, botaoConfirmar);
        modal.classList.remove("mostrar");
    };
}

/**
 * Função para atualizar os dados do usuário (nome, email, etc.).
 * Envia a atualização para o servidor.
 * @param {string} campo - O campo a ser atualizado.
 * @param {string} novoValor - O novo valor a ser salvo.
 */
async function atualizarUsuario(campo, novoValor) {
        console.log("Campo:", campo);
        console.log("Valor:", novoValor);

    try {
<<<<<<< HEAD
        // Se o campo for 'endereco' e o novoValor for um objeto
        if (campo === 'endereco' && typeof novoValor === 'object') {
            // Enviar um objeto com os componentes de endereço
            novoValor = { 
                rua: novoValor.rua,
                numero: novoValor.numero,
                bairro: novoValor.bairro,
                cidade: novoValor.cidade,
                estado: novoValor.estado
            };
        }

        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
=======
        // Formata o valor antes de enviar, conforme o tipo do campo
        novoValor = formatarValor(campo, novoValor);

        // Envia a solicitação para atualizar o campo no servidor
        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
            body: JSON.stringify({ campo, valor: novoValor }),
        });

        // Verifica se a resposta do servidor é bem-sucedida
        if (!resposta.ok) {
            const erroText = await resposta.text();
            throw new Error(`Erro: ${erroText}`);
        }

        const responseData = await resposta.json();
<<<<<<< HEAD
        mostrarMensagem(responseData.message);
        atualizarCampoNoPainel(campo, novoValor);
=======
        mostrarMensagem(responseData.message); // Exibe mensagem de sucesso
        atualizarCampoNoPainel(campo, novoValor); // Atualiza o campo no painel
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)

    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        mostrarMensagem("Erro ao atualizar os dados.", false);
    }
}

<<<<<<< HEAD
=======
/**
 * Função para atualizar a senha do usuário.
 * Envia a nova senha para o servidor.
 * @param {string} novaSenha - A nova senha do usuário.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
async function atualizarSenha(novaSenha) {
    try {
        const resposta = await fetch("/atualizar-senha", {
            method: "POST",
<<<<<<< HEAD
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ senha: novaSenha })
=======
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senha: novaSenha }),
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
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

<<<<<<< HEAD

=======
/**
 * Função para atualizar o valor exibido no painel após a atualização.
 * @param {string} campo - O campo a ser atualizado.
 * @param {string} novoValor - O novo valor a ser exibido.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
function atualizarCampoNoPainel(campo, novoValor) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

<<<<<<< HEAD
=======
    // Formata o valor, caso seja necessário
    novoValor = formatarValor(campo, novoValor);

    // Atualiza o valor exibido no painel
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
    span.textContent = novoValor;
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);
}

<<<<<<< HEAD
=======
/**
 * Função para exibir mensagens de sucesso ou erro.
 * @param {string} msg - A mensagem a ser exibida.
 * @param {boolean} sucesso - Indica se a mensagem é de sucesso ou erro.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
function mostrarMensagem(msg, sucesso = true) {
    const modal = document.getElementById("mensagem-modal");
    const texto = document.getElementById("mensagem-texto");

    texto.textContent = msg;
    texto.style.color = sucesso ? "green" : "red";
    modal.classList.add("mostrar");

<<<<<<< HEAD
    setTimeout(() => modal.classList.remove("mostrar"), 3000);
}

=======
    setTimeout(() => modal.classList.remove("mostrar"), 3000); // Oculta a mensagem após 3 segundos
}

/**
 * Função para carregar os dados do usuário ao iniciar a página.
 * Obtém os dados do usuário do servidor.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
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

<<<<<<< HEAD
=======
/**
 * Função para preencher os dados do usuário nos campos do painel.
 * @param {Object} dadosUsuario - O objeto contendo os dados do usuário.
 */
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
function preencherDadosUsuario(dadosUsuario) {
    document.getElementById("user-name").textContent = dadosUsuario.nome;
    document.getElementById("user-full-name-display").textContent = dadosUsuario.nome;
    document.getElementById("user-username-display").textContent = dadosUsuario.usuario;
    document.getElementById("user-senha-display").textContent = "********";
    document.getElementById("user-email-display").textContent = dadosUsuario.email;
<<<<<<< HEAD
    document.getElementById("user-telefone-display").textContent = dadosUsuario.telefone;
    document.getElementById("user-endereco-display").textContent = `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
    document.getElementById("user-cep-display").textContent = dadosUsuario.cep;
    document.getElementById("user-nascimento-display").textContent = dadosUsuario.nascimento;
}

=======
    document.getElementById("user-telefone-display").textContent = formatarTelefone(dadosUsuario.telefone);
    document.getElementById("user-endereco-display").textContent = `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
    document.getElementById("user-cep-display").textContent = formatarCEP(dadosUsuario.cep);
    document.getElementById("user-nascimento-display").textContent = formatarData(dadosUsuario.nascimento);
}

/**
 * Funções de formatação para telefone, CEP e data.
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

/**
 * Função para formatar o valor de acordo com o campo.
 * @param {string} campo - O campo a ser atualizado.
 * @param {string} valor - O valor a ser formatado.
 */
function formatarValor(campo, valor) {
    if (campo === 'telefone') return formatarTelefone(valor);
    if (campo === 'cep') return formatarCEP(valor);
    if (campo === 'nascimento') return formatarData(valor);
    return valor;
}
// Função para adicionar os eventos de mostrar/ocultar senha
function adicionarEventosMostrarOcultarSenha() {
    const botaoMostrarSenha = document.getElementById("toggle-senha");

    // Evento de clique no ícone de mostrar/ocultar senha
    botaoMostrarSenha.addEventListener("click", () => {
        const inputSenha = document.querySelector('#user-senha input[type="password"]');

        const tipoAtual = inputSenha.type;

        // Alterna o tipo de input entre "password" e "text"
        if (tipoAtual === "password") {
            inputSenha.type = "text";  // Exibe a senha
            botaoMostrarSenha.textContent = "visibility_off"; // Muda o ícone para "olho fechado"
        } else {
            inputSenha.type = "password"; // Oculta a senha
            botaoMostrarSenha.textContent = "visibility"; // Muda o ícone para "olho aberto"
        }
    });
}

// Alterando o código para garantir que o input de senha seja encontrado corretamente
function editarCampo(campo) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

    // Verificação de depuração
    console.log("input de senha", document.querySelector("input[name='senha']"));

    // Alterna a visibilidade dos elementos: texto, input e botões
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);

    // Preenche o input com o valor atual do campo, exceto para senha
    if (campo === "senha") {
        // Modificação aqui para procurar o input pelo name="senha"
        const inputSenha = document.querySelector("input[name='senha']");
        if (inputSenha) {
            inputSenha.value = "";  // Limpa o campo de senha
        } else {
            console.error("Não foi possível encontrar o input de senha.");
        }
        adicionarEventosMostrarOcultarSenha();
    } else {
        input.value = span.textContent;
    }
}

// Adiciona eventos de edição aos campos
adicionarEventosEdicao();

// Carrega os dados do usuário e adiciona eventos de edição ao carregar a página
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
    adicionarEventosEdicao();
});
