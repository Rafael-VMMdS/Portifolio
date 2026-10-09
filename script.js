document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

function setMenu(open) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', () => setMenu(false));

var form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var campos = form.querySelectorAll('input, textarea');
  for (var i = 0; i < campos.length; i++) campos[i].value = campos[i].value.trim();
  mascara_telefone();
  if (form.reportValidity()) document.getElementById('contact-dialog').showModal();
});
function enviarMensagem() {
  if (form.reportValidity()) form.submit();
}

const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isLight = theme === 'light';
  themeButton.textContent = isLight ? 'Modo escuro' : 'Modo claro';
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
  document.querySelector('meta[name="theme-color"]').content = isLight ? '#f5f8f7' : '#0f141a';
}
let savedTheme = 'dark';
try {
  if (localStorage.getItem('portfolio-theme') === 'light') savedTheme = 'light';
} catch (error) {
}
applyTheme(savedTheme);
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (error) {
  }
});

function mascara_telefone() {
  var campo = document.getElementById('telefone');
  var numeros = '';
  for (var i = 0; i < campo.value.length; i++) {
    if (campo.value[i] >= '0' && campo.value[i] <= '9') numeros += campo.value[i];
  }
  numeros = numeros.slice(0, 11);
  var formatado = numeros;
  if (numeros.length > 0) formatado = '(' + numeros.slice(0, 2);
  if (numeros.length > 2) formatado += ')' + numeros.slice(2);
  var corte = numeros.length === 11 ? 7 : 6;
  if (numeros.length > corte) formatado = '(' + numeros.slice(0, 2) + ')' + numeros.slice(2, corte) + '-' + numeros.slice(corte);
  campo.value = formatado;
  campo.setCustomValidity(numeros.length === 10 || numeros.length === 11 ? '' : 'Digite o telefone com DDD.');
}

function revelarProjetos() {
  var projetos = document.getElementsByClassName('project-card');
  for (var i = 0; i < projetos.length; i++) {
    if (projetos[i].getBoundingClientRect().top < window.innerHeight) {
      projetos[i].classList.add('projeto-visivel');
    }
  }
}
window.addEventListener('scroll', revelarProjetos);
revelarProjetos();

var frase = 'Olá, eu sou';
var letraAtual = 0;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.getElementById('typing').textContent = '';
  var digitacao = setInterval(function () {
    letraAtual++;
    document.getElementById('typing').textContent = frase.slice(0, letraAtual);
    if (letraAtual === frase.length) clearInterval(digitacao);
  }, 100);
}