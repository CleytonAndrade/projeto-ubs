(function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Previne o envio automático do formulário

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        // Validação dos campos
        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Desabilita o botão de envio para evitar múltiplos envios
        const button = document.querySelector("#entrar");
        if (button) button.disabled = true;

        const dados = { username, password };

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(res => res.json()) // Espera uma resposta JSON
        .then(data => {
            if (data.redirectUrl) {
                // Redireciona após login
                window.location.href = data.redirectUrl;

                // Exibe o nome do usuário na página de boas-vindas (caso queira mostrar logo após o login)
                document.getElementById("welcome-message").innerText = `Bem-vindo, ${data.nome}!`;
            } else {
                alert(data.message); // Exibe mensagem de erro
            }
        })
        .catch(err => {
            alert("Erro: " + err.message);
        })
        .finally(() => {
            // Reabilita o botão após o processo
            if (button) button.disabled = false;
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const inputSenha = document.getElementById("password");
        const btnToggle = document.getElementById("toggleSenha");

        if (btnToggle) {
            btnToggle.addEventListener("click", () => {
                const isHidden = inputSenha.type === "password";
                inputSenha.type = isHidden ? "text" : "password";
                btnToggle.textContent = isHidden ? "visibility_off" : "visibility";
            });
        }
    });    

})();
