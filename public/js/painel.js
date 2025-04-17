let usuarioAtual = null;
const botaoLogout = document.getElementById("logout");

window.onload = async function () {
    try {
        const response = await fetch("/usuario");
        if (!response.ok) throw new Error("Usuário não autenticado.");
        usuarioAtual = await response.json();

        preencherPainel(usuarioAtual);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
};

function preencherPainel(user) {
    document.getElementById("user-name").innerText = user.nome || "Dados não disponíveis";
    document.getElementById("user-full-name").innerText = user.nome || "Dados não disponíveis";
    document.getElementById("user-username").innerText = user.usuario || "Dados não disponíveis";
    document.getElementById("user-senha").innerText = "********"; // Senha mascarada
    document.getElementById("user-email").innerText = user.email || "Dados não disponíveis";
    document.getElementById("user-telefone").innerText = user.telefone || "Dados não disponíveis";
    document.getElementById("user-endereco").innerText = user.endereco || "Endereço não disponível";
    document.getElementById("user-cep").innerText = user.cep || "Dados não disponíveis";
    
    // Corrigindo a exibição da data para evitar o problema do fuso horário
    document.getElementById("user-nascimento").innerText = user.nascimento
        ? new Date(user.nascimento + "T00:00:00-03:00").toLocaleDateString('pt-BR')
        : "Dados não disponíveis";
    
    // Remover a chamada de função que adicionaria os eventos de edição
    // Não há mais a necessidade de chamar a função de editar
}

if (botaoLogout) {
    botaoLogout.addEventListener("click", async function (e) {
        e.preventDefault();

        try {
            const res = await fetch("/logout", { method: "GET" });
            if (res.ok) {
                window.location.href = "/";
            } else {
                mostrarMensagem("Erro ao fazer logout.", false);
            }
        } catch (err) {
            console.error("Erro ao fazer logout:", err);
            mostrarMensagem("Erro ao fazer logout.", false);
        }
    });
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
