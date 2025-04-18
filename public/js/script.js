(function () {
  // Gerenciamento do menu de navegação
  document.querySelector("#menu-burguer").addEventListener("click", () => {
      const menu = document.querySelector("#menu");
      menu.classList.toggle("ativo");
  });

  // Verifica o estado do login ao carregar a página
  document.addEventListener("DOMContentLoaded", () => {
      const nome = localStorage.getItem("nome");
      const welcome = document.getElementById("welcome-message");
      const botaoLogout = document.getElementById("logout");

      if (nome) {
          // Atualiza o texto de boas-vindas e exibe o botão de logout
          if (welcome) welcome.textContent = `Bem-vindo, ${nome}!`;
          if (botaoLogout) botaoLogout.classList.add("mostrar");
      } else {
          // Se não houver nome no localStorage, redireciona para a página de login
          window.location.href = "/login";
      }

      // Ação do botão de logout
      if (botaoLogout) {
          botaoLogout.addEventListener("click", () => {
              localStorage.removeItem("nome");
              window.location.href = "/login";
          });
      }
  });
})();
