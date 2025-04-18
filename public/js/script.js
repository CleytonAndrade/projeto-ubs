(function () {
    // Menu hamburguer
    document.querySelector("#menu-burguer").addEventListener("click", () => {
        const menu = document.querySelector("#menu");
        menu.classList.toggle("ativo");
    });

    document.addEventListener("DOMContentLoaded", () => {
        const nome = localStorage.getItem("nome");
        const welcome = document.getElementById("welcome-message");
        const botaoLogout = document.getElementById("logout");

        // Se estiver logado, mostra mensagem e botão de logout
        if (nome) {
            if (welcome) welcome.textContent = `Bem-vindo, ${nome}!`;
            if (botaoLogout) botaoLogout.classList.add("mostrar");
        } else {
            // Se não estiver logado, limpa o texto e oculta o botão
            if (welcome) welcome.textContent = "";
            if (botaoLogout) botaoLogout.classList.remove("mostrar");
        }

        // Ação do logout
        if (botaoLogout) {
            botaoLogout.addEventListener("click", () => {
                localStorage.removeItem("nome");
                window.location.href = "/"; // Só volta pra tela inicial
            });
        }
    });
})();
