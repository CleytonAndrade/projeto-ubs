window.onload = async function() {
    try {
        // Faz uma requisição para pegar os dados do usuário logado
        const response = await fetch("/usuario");

        if (!response.ok) {
            throw new Error("Usuário não autenticado ou erro ao carregar os dados.");
        }

        const user = await response.json();
        console.log("Dados do usuário:", user); // Exibe os dados no console

        // Preencher os campos no painel
        document.getElementById("user-name").innerText = user.nome;
        document.getElementById("user-full-name").innerText = user.nome;
        document.getElementById("user-username").innerText = user.usuario;
        document.getElementById("user-senha").innerText = "********"; // Senha mascarada
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("user-telefone").innerText = user.telefone;
        document.getElementById("user-endereco").innerText = `${user.rua}, ${user.numero}, ${user.bairro}, ${user.cidade}, ${user.estado}`;
        document.getElementById("user-cep").innerText = user.cep;
        document.getElementById("user-nascimento").innerText = user.nascimento;
    } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
    }
};

document.getElementById("logout").addEventListener("click", async function (e) {
    e.preventDefault(); // evita o redirecionamento automático

    try {
        const res = await fetch("/logout", {
            method: "GET"
        });

        if (res.ok) {
            window.location.href = "/"; // Redireciona para a home após logout
        } else {
            alert("Erro ao fazer logout.");
        }
    } catch (err) {
        console.error("Erro ao fazer logout:", err);
    }
});
