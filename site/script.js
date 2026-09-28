(() => {
  'use strict';
  const intro = document.querySelector('#intro');
  const replay = document.querySelector('#replay-intro');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (intro && replay) {
    let introTimer;
    let previousFocus;
    let wasReplay = false;
    let imagesReady = false;
    const clearPending = () => document.documentElement.classList.remove('intro-pending');
    const pageRegions = document.querySelectorAll('body > header, body > main, body > footer');
    const finishIntro = () => {
      clearTimeout(introTimer);
      clearPending();
      intro.hidden = true;
      intro.classList.remove('running');
      document.body.classList.remove('intro-active');
      pageRegions.forEach(el => el.inert = false);
      if (wasReplay && previousFocus) previousFocus.focus({preventScroll:true});
      else if (intro.contains(document.activeElement)) document.querySelector('.brand').focus({preventScroll:true});
    };
    const startIntro = (isReplay = false) => {
      if (motion.matches || !imagesReady) return;
      clearTimeout(introTimer);
      wasReplay = isReplay;
      previousFocus = document.activeElement;
      intro.hidden = false;
      document.body.classList.add('intro-active');
      pageRegions.forEach(el => el.inert = true);
      intro.classList.remove('running');
      void intro.offsetWidth;
      intro.classList.add('running');
      clearPending();
      intro.querySelector('.intro-skip').focus({preventScroll:true});
      introTimer = window.setTimeout(finishIntro, 5800);
    };
    Promise.all(Array.from(intro.querySelectorAll('img')).map(img => img.decode())).then(() => {
      imagesReady = true;
      replay.hidden = motion.matches;
      // Avoid late interruptions after a slow download or navigation to a section.
      const autoPlay = document.documentElement.classList.contains('intro-pending') && !location.hash;
      clearPending();
      if (autoPlay) startIntro();
    }).catch(finishIntro);
    intro.querySelector('.intro-skip').addEventListener('click', finishIntro);
    replay.addEventListener('click', () => startIntro(true));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !intro.hidden) finishIntro();
      if (event.key === 'Tab' && !intro.hidden) {event.preventDefault();intro.querySelector('.intro-skip').focus();}
    });
    motion.addEventListener('change', () => {
      replay.hidden = motion.matches || !imagesReady;
      if (motion.matches) finishIntro();
    });
    window.addEventListener('pagehide', finishIntro);
  }
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  if (menu && nav) {
    const closeMenu = () => {menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');};
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {if(event.key === 'Escape' && nav.classList.contains('open')){closeMenu();menu.focus();}});
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  document.querySelector('#load-facebook')?.addEventListener('click', () => {
    const container = document.querySelector('#facebook-content');
    const width = Math.max(180, Math.min(500, Math.floor(container.clientWidth)));
    const iframe = document.createElement('iframe');
    const params = new URLSearchParams({href:'https://www.facebook.com/kampsportsklub/',tabs:'timeline',width:String(width),height:'520',small_header:'true',adapt_container_width:'true',hide_cover:'false',show_facepile:'false'});
    iframe.src = 'https://www.facebook.com/plugins/page.php?' + params.toString();
    iframe.title = 'Seneste Facebook-opslag fra Ju-jitsu klubben Aiki-do';
    iframe.width = String(width);iframe.height = '520';
    iframe.allow = 'encrypted-media; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    container.replaceChildren(iframe);iframe.focus();
  });
})();
