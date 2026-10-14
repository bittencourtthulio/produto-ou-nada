'use strict';
const proofContent = {
  software: { image: 'assets/projeto-painel.png', alt: 'Painel real do Raio-X de Margem com um catálogo de demonstração', text: 'Aplicação real para analisar margens e simular cenários. A imagem usa um catálogo de demonstração.', portrait: false },
  campanha: { image: 'assets/projeto-criativo.jpg', alt: 'Criativo produzido para apresentar o Raio-X de Margem ao mercado', text: 'Uma das peças de comunicação produzidas para o projeto. O produto e a mensagem caminham juntos.', portrait: true },
  video: { image: 'assets/projeto-video.jpg', alt: 'Capa do vídeo de demonstração do Raio-X de Margem', text: 'Capa da demonstração que apresenta o funcionamento do produto. Parte da jornada de preparação do lançamento.', portrait: false }
};
const tabs = [...document.querySelectorAll('[data-proof]')];
function selectTab(tab) {
  const content = proofContent[tab.dataset.proof];
  if (!content) return;
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  const image = document.getElementById('proof-image');
  image.src = content.image;
  image.alt = content.alt;
  image.classList.toggle('portrait', content.portrait);
  document.getElementById('proof-text').textContent = content.text;
  document.getElementById('proof-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectTab(tabs[next]); }
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
