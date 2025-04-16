(function () {
    const form = document.querySelector("form");
    const button = document.querySelector("#entrar");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Previne o envio automático do formulário

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        // Validação dos campos
        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Envia os dados via fetch
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
                window.location.href = data.redirectUrl; // Redireciona após login
            } else {
                alert(data.message); // Exibe mensagem de erro
            }
        })
        .catch(err => {
            alert("Erro: " + err.message);
        });
    });
})();
