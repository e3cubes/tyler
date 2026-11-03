/* Loggies Little League demo: small, dependency-free interactions. */
(function () {
  'use strict';

  // DEMO ONLY: client-side password check. Not real security.
  // In the live site, officers would sign in with their Google account and
  // only see files from the private "Officers" Drive folder they're shared on.
  var DEMO_PASSWORD = 'loggies';
  var STORAGE_KEY = 'loggies-officer-demo';

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Toast helper
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
  }

  // Placeholder Drive links
  document.querySelectorAll('[data-demo-link]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Demo: in the live site this opens the file or folder in Google Drive.');
    });
  });

  // Officers gate
  var dialog = document.getElementById('login-dialog');
  var form = document.getElementById('login-form');
  var pw = document.getElementById('pw');
  var err = document.getElementById('login-error');
  var locked = document.getElementById('officers-locked');
  var content = document.getElementById('officers-content');
  var openBtn = document.getElementById('officers-open');

  function setUnlocked(on) {
    locked.hidden = on;
    content.hidden = !on;
    try { on ? sessionStorage.setItem(STORAGE_KEY, '1') : sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  function openLogin() {
    err.hidden = true;
    pw.value = '';
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      // Very old browsers: fall back to prompt()
      var v = window.prompt('Officers password (DEMO ONLY: loggies)');
      if (v !== null && v.trim().toLowerCase() === DEMO_PASSWORD) setUnlocked(true);
      return;
    }
    pw.focus();
  }

  openBtn.addEventListener('click', openLogin);
  document.getElementById('login-cancel').addEventListener('click', function () { dialog.close(); openBtn.focus(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (pw.value.trim().toLowerCase() === DEMO_PASSWORD) {
      dialog.close();
      setUnlocked(true);
      showToast('Welcome, officer! (demo)');
      document.getElementById('officers').scrollIntoView({ behavior: 'smooth' });
    } else {
      err.hidden = false;
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      pw.select();
    }
  });

  document.getElementById('officers-logout').addEventListener('click', function () {
    setUnlocked(false);
    showToast('Signed out.');
    openBtn.focus();
  });

  try { if (sessionStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true); } catch (_) {}
})();
