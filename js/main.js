// 手機選單
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  })
);

// 作品分類篩選
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hide', type !== 'all' && card.dataset.cat !== type);
    });
  });
});

// 作品詳情彈窗
const modal = document.getElementById('modal');
const openModal = card => {
  const detail = card.querySelector('template.detail');
  if (!detail) return;
  document.getElementById('modal-tag').textContent = card.querySelector('.tag').textContent;
  document.getElementById('modal-title').textContent = card.querySelector('h3').textContent;
  const img = document.getElementById('modal-img');
  const src = card.querySelector('img');
  img.src = src.getAttribute('src');
  img.alt = src.alt;
  const body = document.getElementById('modal-body');
  body.replaceChildren(detail.content.cloneNode(true));
  modal.showModal();
  modal.scrollTop = 0;
  document.body.classList.add('lock');
};
cards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.querySelector('.more').addEventListener('click', e => e.stopPropagation() || openModal(card));
});
modal.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); }); // 點背景關閉
modal.addEventListener('close', () => {
  document.body.classList.remove('lock');
  document.getElementById('modal-body').replaceChildren(); // 關閉時停止影片播放
});

// 捲動時淡入
const targets = document.querySelectorAll('.card, .service, .photo-wrap, details, .cta, .steps li');
targets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
targets.forEach(el => io.observe(el));

// 年份
document.getElementById('year').textContent = new Date().getFullYear();
