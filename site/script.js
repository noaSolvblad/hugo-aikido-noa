(() => {
  'use strict';

  // Indstillinger, som bruges af funktionerne nedenfor.
  const INTRO_DURATION_MS = 5800;
  const FACEBOOK_PAGE_URL = 'https://www.facebook.com/kampsportsklub/';

  // Velkomstintro: indlæs billeder, håndter afspilning og tastaturfokus.
  function setupIntro() {
    const intro = document.querySelector('#intro');
    const replay = document.querySelector('#replay-intro');
    if (!intro || !replay) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const skipButton = intro.querySelector('.intro-skip');
    const pageRegions = document.querySelectorAll('body > header, body > main, body > footer');
    let introTimer;
    let previousFocus;
    let wasReplay = false;
    let imagesReady = false;

    function clearPending() {
      document.documentElement.classList.remove('intro-pending');
    }

    function finishIntro() {
      clearTimeout(introTimer);
      clearPending();
      intro.hidden = true;
      intro.classList.remove('running');
      document.body.classList.remove('intro-active');
      pageRegions.forEach(region => { region.inert = false; });

      if (wasReplay && previousFocus) {
        previousFocus.focus({ preventScroll: true });
      } else if (intro.contains(document.activeElement)) {
        document.querySelector('.brand').focus({ preventScroll: true });
      }
    }

    function startIntro(isReplay = false) {
      if (motion.matches || !imagesReady) return;

      clearTimeout(introTimer);
      wasReplay = isReplay;
      previousFocus = document.activeElement;
      intro.hidden = false;
      document.body.classList.add('intro-active');
      pageRegions.forEach(region => { region.inert = true; });

      // Tving layoutberegning, så CSS-animationen også starter ved genafspilning.
      intro.classList.remove('running');
      void intro.offsetWidth;
      intro.classList.add('running');
      clearPending();
      skipButton.focus({ preventScroll: true });
      introTimer = window.setTimeout(finishIntro, INTRO_DURATION_MS);
    }

    Promise.all(Array.from(intro.querySelectorAll('img')).map(image => image.decode()))
      .then(() => {
        imagesReady = true;
        replay.hidden = motion.matches;
        // Undgå en sen intro efter langsom indlæsning eller et direkte sektionslink.
        const autoPlay = document.documentElement.classList.contains('intro-pending') && !location.hash;
        clearPending();
        if (autoPlay) startIntro();
      })
      .catch(finishIntro);

    skipButton.addEventListener('click', finishIntro);
    replay.addEventListener('click', () => startIntro(true));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !intro.hidden) finishIntro();
      if (event.key === 'Tab' && !intro.hidden) {
        event.preventDefault();
        skipButton.focus();
      }
    });
    motion.addEventListener('change', () => {
      replay.hidden = motion.matches || !imagesReady;
      if (motion.matches) finishIntro();
    });
    window.addEventListener('pagehide', finishIntro);
  }

  // Mobilmenu: åbn/luk, og luk igen efter navigation eller Escape.
  function setupMobileMenu() {
    const menu = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('#navigation');
    if (!menu || !navigation) return;

    function closeMenu() {
      menu.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('open');
    }

    menu.addEventListener('click', () => {
      const isOpen = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(isOpen));
      navigation.classList.toggle('open', isOpen);
    });
    navigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navigation.classList.contains('open')) {
        closeMenu();
        menu.focus();
      }
    });
  }

  // Hold årstallet i sidefoden opdateret.
  function updateCopyrightYear() {
    const year = document.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  // Facebook indlæses først, når den besøgende trykker på knappen.
  function setupFacebookFeed() {
    const button = document.querySelector('#load-facebook');
    const container = document.querySelector('#facebook-content');
    if (!button || !container) return;

    button.addEventListener('click', () => {
      const width = Math.max(180, Math.min(500, Math.floor(container.clientWidth)));
      const iframe = document.createElement('iframe');
      const params = new URLSearchParams({
        href: FACEBOOK_PAGE_URL,
        tabs: 'timeline',
        width: String(width),
        height: '520',
        small_header: 'true',
        adapt_container_width: 'true',
        hide_cover: 'false',
        show_facepile: 'false',
      });

      iframe.src = 'https://www.facebook.com/plugins/page.php?' + params.toString();
      iframe.title = 'Seneste Facebook-opslag fra Ju-jitsu klubben Aiki-do';
      iframe.width = String(width);
      iframe.height = '520';
      iframe.allow = 'encrypted-media; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      container.replaceChildren(iframe);
      iframe.focus();
    });
  }

  // Start sidens funktioner. Hver funktion springer over, hvis dens HTML mangler.
  setupIntro();
  setupMobileMenu();
  updateCopyrightYear();
  setupFacebookFeed();
})();
