// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Skill overlay
document.querySelectorAll('[data-skill]').forEach(card => {
  card.addEventListener('click', () => {
    const overlay = document.getElementById('overlay-' + card.dataset.skill);
    if (overlay) overlay.classList.add('active');
  });
});

function closeOverlay(el) {
  el.closest('.skill-overlay').classList.remove('active');
}

document.querySelectorAll('.skill-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.skill-overlay.active').forEach(o => o.classList.remove('active'));
  }
});
