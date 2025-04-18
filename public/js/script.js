(function () {
    document
        .querySelector("#menu-burguer")
        .addEventListener("click", clickMenu);
    function clickMenu() {
        const menu = document.querySelector("#menu");
        menu.classList.toggle("ativo");
    }

    document.addEventListener("DOMContentLoaded", () => {
        const nome = localStorage.getItem("nome"); // Recupera o nome armazenado
        if (nome) {
            // Atualiza o texto de boas-vindas
            document.getElementById(
                "welcome-message"
            ).innerText = `Bem-vindo, ${nome}!`;
        }
    });

    document.querySelector("#logout").addEventListener("click", () => {
        localStorage.removeItem("nome");
        window.location.href = "/";
    });

    document.addEventListener("DOMContentLoaded", () => {
        const nome = localStorage.getItem("nome");
        const welcome = document.getElementById("welcome-message");
        const botaoLogout = document.getElementById("logout");

        if (nome) {
            if (welcome) welcome.textContent = `Bem-vindo, ${nome}!`;
            if (botaoLogout) botaoLogout.classList.add("mostrar");
        } else {
            if (botaoLogout) botaoLogout.classList.remove("mostrar");
        }

        if (botaoLogout) {
            botaoLogout.addEventListener("click", () => {
                localStorage.removeItem("nome");
                window.location.href = "/login";
            });
        }
    });
})();
