let usuarioAtual = null;

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
    document.getElementById("user-endereco").innerText = user.rua && user.numero && user.bairro && user.cidade && user.estado
        ? `${user.rua}, ${user.numero}, ${user.bairro}, ${user.cidade}, ${user.estado}`
        : "Endereço não disponível";
    document.getElementById("user-cep").innerText = user.cep || "Dados não disponíveis";
    document.getElementById("user-nascimento").innerText = user.nascimento
        ? new Date(user.nascimento).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        : "Dados não disponíveis";
}

document.getElementById("logout").addEventListener("click", async function (e) {
    e.preventDefault();

    try {
        const res = await fetch("/logout", { method: "GET" });
        if (res.ok) {
            window.location.href = "/"; // Redireciona para a home após logout
        } else {
            mostrarMensagem("Erro ao fazer logout.", false);
        }
    } catch (err) {
        console.error("Erro ao fazer logout:", err);
        mostrarMensagem("Erro ao fazer logout.", false);
    }
});

// Função para mostrar ou esconder o formulário de atualização
document.getElementById("update-profile").addEventListener("click", () => {
    const formDiv = document.getElementById("update-form");

    // Alterna a visibilidade do formulário
    if (formDiv.style.display === "none" || formDiv.style.display === "") {
        formDiv.style.display = "block";

        // Preenche o formulário com os dados do usuário
        if (!usuarioAtual) return mostrarMensagem("Erro: dados do usuário não carregados.", false);

        const form = document.getElementById("profile-form");
        form.nome.value = usuarioAtual.nome || "";
        form.email.value = usuarioAtual.email || "";
        form.telefone.value = usuarioAtual.telefone || "";
        form.rua.value = usuarioAtual.rua || "";
        form.numero.value = usuarioAtual.numero || "";
        form.bairro.value = usuarioAtual.bairro || "";
        form.cidade.value = usuarioAtual.cidade || "";
        form.estado.value = usuarioAtual.estado || "";
        form.cep.value = usuarioAtual.cep || "";
        form.nascimento.value = usuarioAtual.nascimento ? usuarioAtual.nascimento.split("T")[0] : ""; // Remove a hora
    } else {
        formDiv.style.display = "none"; // Se já estiver visível, esconde
    }
});

// Envia os dados do formulário para atualização
document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/atualizar-usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            mostrarMensagem("Dados atualizados com sucesso!");
            setTimeout(() => window.location.reload(), 2000); // Recarrega os dados do painel
        } else {
            mostrarMensagem("Erro ao atualizar os dados.", false);
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        mostrarMensagem("Erro inesperado ao atualizar.", false);
    }
});

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
