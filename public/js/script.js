(function(){
  document.querySelector('#menu-burguer').addEventListener('click', clickMenu);
  function clickMenu() {
    const menu = document.querySelector('#menu');
    menu.classList.toggle('ativo');
  }
})();