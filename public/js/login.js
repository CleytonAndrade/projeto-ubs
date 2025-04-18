(function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();
        const button = document.querySelector("#entrar");
    
        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        if (button) button.disabled = true;
    
        const dados = { username, password };
    
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
        .then(data => { 
            if (data.redirectUrl) {
                localStorage.setItem("nome", data.nome);
                window.location.href = data.redirectUrl;
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            alert("Erro: " + err.message);
        })
        .finally(() => {
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
