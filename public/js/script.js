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

      // Se estiver logado, mostra o nome e o botão de logout
      if (nome) {
          if (welcome) welcome.textContent = `Bem-vindo, ${nome}!`;
          if (botaoLogout) botaoLogout.classList.add("mostrar");
      } else {
          // Se não estiver logado e não estiver na página de login, redireciona para o login
          if (window.location.pathname !== "/login") {
              window.location.href = "/login";
          }
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
