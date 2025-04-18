let campoAtual = null;
let novoValorAtual = null;

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


function editarCampo(campo) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

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

async function atualizarUsuario(campo, novoValor) {
    console.log("Campo:", campo);
    console.log("Valor:", novoValor);

    try {
        // Se o campo for 'telefone', 'cep' ou 'nascimento', formatar o valor antes de enviar
        if (campo === 'telefone') {
            novoValor = formatarTelefone(novoValor); // Formata o telefone
        }
        if (campo === 'cep') {
            novoValor = formatarCEP(novoValor); // Formata o CEP
        }
        if (campo === 'nascimento') {
            novoValor = formatarData(novoValor); // Formata a data de nascimento
        }

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


async function atualizarSenha(novaSenha) {
    try {
        const resposta = await fetch("/atualizar-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ senha: novaSenha })
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


function atualizarCampoNoPainel(campo, novoValor) {
    const p = document.getElementById(`user-${campo}`);
    const span = p.querySelector("span");
    const input = p.querySelector(".input-edicao");
    const botaoEditar = p.querySelector(".edit-btn");
    const botaoConfirmar = p.querySelector(".confirm-btn");

    // Se o campo for telefone, CEP ou data, formatar o valor antes de atualizar
    if (campo === 'telefone') {
        novoValor = formatarTelefone(novoValor);
    }
    if (campo === 'cep') {
        novoValor = formatarCEP(novoValor);
    }
    if (campo === 'nascimento') {
        novoValor = formatarData(novoValor);
    }

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
    document.getElementById("user-senha-display").textContent = "********";
    document.getElementById("user-email-display").textContent = dadosUsuario.email;
    document.getElementById("user-telefone-display").textContent = formatarTelefone(dadosUsuario.telefone);
    document.getElementById("user-endereco-display").textContent = `${dadosUsuario.rua}, ${dadosUsuario.numero}, ${dadosUsuario.bairro}, ${dadosUsuario.cidade}, ${dadosUsuario.estado}`;
    document.getElementById("user-cep-display").textContent = formatarCEP(dadosUsuario.cep);
    document.getElementById("user-nascimento-display").textContent = formatarData(dadosUsuario.nascimento);
}

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
  


document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
    adicionarEventosEdicao();
});
