(function(){
  document.getElementById('menu-burguer').addEventListener('click', clickMenu);
  function clickMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('ativo');
  }
})();