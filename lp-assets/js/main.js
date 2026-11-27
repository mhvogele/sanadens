// SanaDens – gemeinsames JavaScript für alle Landingpages
(() => {
  const body = document.body;
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('hauptnavigation');
  const subToggles = [...document.querySelectorAll('.has-sub > .menu-link')];

  /* Untermenüs: per Klick/Tastatur öffnen (Desktop zusätzlich per Hover via CSS) */
  const closeSubs = except => subToggles.forEach(btn => {
    if (btn === except) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.parentElement.classList.remove('open');
  });
  subToggles.forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    closeSubs(btn);
    btn.setAttribute('aria-expanded', String(open));
    btn.parentElement.classList.toggle('open', open);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs(); });

  /* Mobiles Menü */
  const setMenu = open => {
    body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    if (!open) closeSubs();
  };
  burger.addEventListener('click', () => setMenu(!body.classList.contains('nav-open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* Escape schließt Untermenü bzw. mobiles Menü */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const openSub = subToggles.find(b => b.getAttribute('aria-expanded') === 'true');
    if (openSub) { closeSubs(); openSub.focus(); return; }
    if (body.classList.contains('nav-open')) { setMenu(false); burger.focus(); }
  });

  /* Fokus bleibt im offenen mobilen Menü */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !body.classList.contains('nav-open')) return;
    const items = [burger, ...nav.querySelectorAll('a, button')].filter(el => el.offsetParent !== null);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Beim Wechsel auf Desktop-Breite mobiles Menü zurücksetzen */
  matchMedia('(min-width: 1025px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
})();
