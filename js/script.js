const burguer = document.querySelector('.burguer');
const menu = document.querySelector('.menu');

burguer.addEventListener('click', () => {
  menu.classList.toggle('ativo');
});