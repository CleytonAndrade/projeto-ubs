(function(){
    const button = document.querySelector("#entrar");

    button.addEventListener("click", async (e) => {
        e.preventDefault(); // Evita o envio tradicional do formulário

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Enviar os dados de login via fetch
        const dados = {
            usuario: username,
            senha: password
        };

        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const texto = await res.text();

            if (res.ok) {
                alert("✅ Login realizado com sucesso!");
                // Redireciona para a página inicial ou dashboard após login
                window.location.href = "/";
            } else {
                alert("❌ " + texto); // Exibe mensagem de erro do servidor
            }
        } catch (err) {
            alert("❌ Erro ao tentar fazer login: " + err.message);
        }
    });
})();
