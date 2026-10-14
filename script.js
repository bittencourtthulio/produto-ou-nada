'use strict';

const tabs = [...document.querySelectorAll('[data-proof]')];
const demoVideo = document.getElementById('demo-video');

function selectTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (tab.dataset.proof !== 'video') demoVideo.pause();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      tabs[next].focus();
      selectTab(tabs[next]);
    }
  });
});

// Keep the floating shortcut from competing with the offer itself.
const stickyOffer = document.querySelector('.mobile-cta');
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    stickyOffer.hidden = entries[0].isIntersecting;
  }).observe(document.querySelector('.offer-section'));
}

document.getElementById('year').textContent = new Date().getFullYear();
