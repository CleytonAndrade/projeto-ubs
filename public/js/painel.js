let campoAtual = null;
let novoValorAtual = null;

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Função para adicionar eventos de edição aos botões.
 * Envolvem os botões de edição e confirmação.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
function adicionarEventosEdicao() {
    const botoesEdicao = document.querySelectorAll(".edit-btn");
    botoesEdicao.forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
            // Inicia o processo de edição para o campo correspondente
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
            // Inicia o processo de edição para o campo correspondente
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
            editarCampo(event.target.getAttribute("data-campo"));
        });
    });

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // Adiciona eventos aos botões de confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
    // Adiciona eventos aos botões de confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
    const botoesConfirmacao = document.querySelectorAll(".confirm-btn");
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.preventDefault();
<<<<<<< HEAD

=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
            // Obtém o campo e o valor do input após confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
            // Obtém o campo e o valor do input após confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
            const campoOriginal = event.target.getAttribute("data-campo");
            const input = document.querySelector(`#user-${campoOriginal} .input-edicao`);
            const valorDigitado = input.value;

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
            // Mapeia o campo original para o correspondente no banco de dados
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
            // Mapeia o campo original para o correspondente no banco de dados
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
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
            
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
            // Se o campo for "senha", realiza validação específica
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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

<<<<<<< HEAD
=======
            // Verifica se o campo é editável
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
            if (!campoMapeado) {
                mostrarMensagem("Este campo não pode ser alterado por aqui.", false);
                return;
            }
<<<<<<< HEAD

=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            

=======

            // Armazena o novo valor e campo para o processo de confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======

            // Armazena o novo valor e campo para o processo de confirmação
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
            

>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
            novoValorAtual = valorDigitado;
            campoAtual = campoMapeado;
            mostrarModalConfirmacao();
        });
    });
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Ativa o modo de edição para o campo selecionado.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======

>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
function editarCampo(campo) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

<<<<<<< HEAD
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);

=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
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
}

<<<<<<< HEAD
=======
    // Alterna a visibilidade dos elementos: texto, input e botões
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);

    // Preenche o input com o valor atual do campo, exceto para senha
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
    input.value = campo !== "senha" ? span.textContent : "";
}

>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
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
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
function mostrarModalConfirmacao() {
    const modal = document.getElementById("modal-confirmacao");
    modal.classList.add("mostrar");

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // Ao confirmar, chama a função de atualização de dados
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
    // Ao confirmar, chama a função de atualização de dados
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
    
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043

    document.getElementById("cancelar-edicao").onclick = () => {
        const p = document.getElementById(`user-${campoAtual}`);
        const span = p.querySelector("span");
        const input = p.querySelector(".input-edicao");
        const botaoEditar = p.querySelector(".edit-btn");
        const botaoConfirmar = p.querySelector(".confirm-btn");

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Restaura a visibilidade dos elementos para o estado original
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======

    // Ao cancelar, restaura o estado inicial sem alterações
    document.getElementById("cancelar-edicao").onclick = () => {
        const p = document.getElementById(`user-${campoAtual}`);
        const span = p.querySelector("span");
        const input = p.querySelector(".input-edicao");
        const botaoEditar = p.querySelector(".edit-btn");
        const botaoConfirmar = p.querySelector(".confirm-btn");

        // Restaura a visibilidade dos elementos para o estado original
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
        toggleVisibility(span, input, botaoEditar, botaoConfirmar);
        modal.classList.remove("mostrar");
    };
}

<<<<<<< HEAD
/**
 * Envia os dados atualizados ao servidor.
 */
=======
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
async function atualizarUsuario(campo, novoValor) {
    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
        // Se o campo for 'endereco' e o novoValor for um objeto
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
        if (campo === 'endereco' && typeof novoValor === 'object') {
            novoValor = {
                rua: novoValor.rua,
                numero: novoValor.numero,
                bairro: novoValor.bairro,
                cidade: novoValor.cidade,
                estado: novoValor.estado
            };
        }

<<<<<<< HEAD
=======
        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
<<<<<<< HEAD
=======
        // Formata o valor antes de enviar, conforme o tipo do campo
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
        novoValor = formatarValor(campo, novoValor);

        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
        // Formata o valor antes de enviar, conforme o tipo do campo
        novoValor = formatarValor(campo, novoValor);

        // Envia a solicitação para atualizar o campo no servidor
        const resposta = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
            body: JSON.stringify({ campo, valor: novoValor }),
        });

        if (!resposta.ok) {
            const erroText = await resposta.text();
            throw new Error(`Erro: ${erroText}`);
        }

        const responseData = await resposta.json();
<<<<<<< HEAD
        mostrarMensagem(responseData.message);
        atualizarCampoNoPainel(campo, novoValor);
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        mostrarMensagem(responseData.message);
        atualizarCampoNoPainel(campo, novoValor);
=======
        mostrarMensagem(responseData.message); // Exibe mensagem de sucesso
        atualizarCampoNoPainel(campo, novoValor); // Atualiza o campo no painel
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
        mostrarMensagem(responseData.message); // Exibe mensagem de sucesso
        atualizarCampoNoPainel(campo, novoValor); // Atualiza o campo no painel
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
        mostrarMensagem(responseData.message);
        atualizarCampoNoPainel(campo, novoValor);
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")

>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        mostrarMensagem("Erro ao atualizar os dados.", false);
    }
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Atualiza a senha do usuário.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
async function atualizarSenha(novaSenha) {
    try {
        const resposta = await fetch("/atualizar-senha", {
            method: "POST",
<<<<<<< HEAD
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senha: novaSenha }),
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ senha: novaSenha })
<<<<<<< HEAD
=======
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senha: novaSenha }),
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senha: novaSenha }),
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Atualiza a exibição do valor no painel.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======

>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
function atualizarCampoNoPainel(campo, novoValor) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

<<<<<<< HEAD
    novoValor = formatarValor(campo, novoValor);
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
    // Formata o valor, caso seja necessário
    novoValor = formatarValor(campo, novoValor);

    // Atualiza o valor exibido no painel
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
    span.textContent = novoValor;
    toggleVisibility(span, input, botaoEditar, botaoConfirmar);
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Exibe mensagens no modal de feedback.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    setTimeout(() => modal.classList.remove("mostrar"), 3000);
}

=======
    setTimeout(() => modal.classList.remove("mostrar"), 3000); // Oculta a mensagem após 3 segundos
}

=======
    setTimeout(() => modal.classList.remove("mostrar"), 3000); // Oculta a mensagem após 3 segundos
}

>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Carrega os dados do usuário ao iniciar.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
    setTimeout(() => modal.classList.remove("mostrar"), 3000);
}

>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
/**
 * Preenche os dados do usuário no painel.
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
function preencherDadosUsuario(dadosUsuario) {
    document.getElementById("user-name").textContent = dadosUsuario.nome;
    document.getElementById("user-full-name-display").textContent = dadosUsuario.nome;
    document.getElementById("user-username-display").textContent = dadosUsuario.usuario;
    document.getElementById("user-senha-display").textContent = "********";
    document.getElementById("user-email-display").textContent = dadosUsuario.email;
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
    document.getElementById("user-telefone-display").textContent = dadosUsuario.telefone;
    document.getElementById("user-endereco-display").textContent = `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
    document.getElementById("user-cep-display").textContent = dadosUsuario.cep;
    document.getElementById("user-nascimento-display").textContent = dadosUsuario.nascimento;
}

<<<<<<< HEAD
=======
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
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
<<<<<<< HEAD
=======
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
<<<<<<< HEAD
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 0459571 (fix: refactor user data loading and editing logic for improved functionality and error handling)
=======
>>>>>>> parent of 18f5f5e (Revert "fix: refactor user data loading and editing logic for improved functionality and error handling")
document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
    adicionarEventosEdicao();
});
>>>>>>> ad452f74986c8271f5c0599301badb0eea525043
