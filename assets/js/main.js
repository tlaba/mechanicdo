/* ============================================================
   Mechanic Do — site behaviour ("Drafting Table" design)
   Vanilla JS, no dependencies. Loaded with `defer`.
   Everything here is progressive enhancement: with JS off the
   page is complete and readable (menu shows as a plain row).
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONFIG — the only part you normally need to edit.

     FORM_ENDPOINT: paste a form-handling URL to receive quote
     requests by email without running a server. Works with
     Formspree, Formsubmit, Basin, Getform, or a Netlify
     function. Leave it empty ('') and the form falls back to
     opening the visitor's email client with everything
     pre-filled — no submissions are lost either way.
     ---------------------------------------------------------- */
  var FORM_ENDPOINT = '';
  var CONTACT_EMAIL = 'dispatch@mechanicdo.ca';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------------- current year in footer ---------------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- mobile navigation ---------------- */
  var toggle = $('#navToggle');
  var nav    = $('#siteNav');

  function setNav(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after tapping a link, clicking away, or pressing Escape.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        toggle.focus();
      }
    });
    // Reset state when the layout returns to desktop.
    // Keep NAV_DESKTOP in sync with the 1120px breakpoint in styles.css.
    var NAV_DESKTOP = window.matchMedia('(min-width: 1120px)');
    var onBreakpoint = function () { if (NAV_DESKTOP.matches) setNav(false); };
    if (NAV_DESKTOP.addEventListener) NAV_DESKTOP.addEventListener('change', onBreakpoint);
    else if (NAV_DESKTOP.addListener) NAV_DESKTOP.addListener(onBreakpoint);
  }

  /* ---------------- header shadow on scroll ---------------- */
  var header = $('#siteHeader');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- highlight the section you're reading ---------------- */
  var navLinks = $$('.nav a[href^="#"]:not(.btn)');
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    // Track every nav section inside the reading band; highlight the last
    // one in document order, or none (e.g. back up in the hero).
    var inBand = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { inBand[entry.target.id] = entry.isIntersecting; });
      var current = null;
      sections.forEach(function (s) { if (inBand[s.id]) current = s.id; });
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', current !== null && a.getAttribute('href') === '#' + current);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------- pen-plotter draw-in ----------------
     Only the decorative line work of the drawings (the drive-train
     elevation and the service-area plan) is "plotted" when it scrolls
     into view. Text and content are never hidden, and a safety timer
     finishes every drawing even if the observer never fires. */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var plotTargets = $$('.ga[data-plot], .cov__plan[data-plot]');
  if ('IntersectionObserver' in window && !reduceMotion && plotTargets.length) {
    document.documentElement.classList.add('can-plot');
    var plotAll = function () { plotTargets.forEach(function (el) { el.classList.add('is-plotted'); }); };
    var plotter = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-plotted');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    plotTargets.forEach(function (el) { plotter.observe(el); });
    window.setTimeout(plotAll, 5000);
  }

  /* ---------------- quote form ---------------- */
  var form = $('#quoteForm');
  var note = $('#formNote');
  if (!form || !note) return;

  var defaultNote = note.innerHTML;

  function showNote(html, state) {
    note.innerHTML = html;
    note.classList.remove('is-ok', 'is-error');
    if (state) note.classList.add(state);
  }

  function clearError(field) {
    field.removeAttribute('aria-invalid');
    var msg = field.parentNode.querySelector('.error-msg');
    if (msg) msg.remove();
  }

  function setError(field, text) {
    field.setAttribute('aria-invalid', 'true');
    if (!field.parentNode.querySelector('.error-msg')) {
      var msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = text;
      field.parentNode.appendChild(msg);
    }
  }

  function validate() {
    var ok = true;
    var required = $$('[required]', form);

    required.forEach(function (field) {
      clearError(field);
      var value = field.value.trim();
      if (!value) {
        setError(field, 'This field is required.');
        ok = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        setError(field, 'Please enter a valid email address.');
        ok = false;
      }
    });

    if (!ok) {
      var first = $('[aria-invalid="true"]', form);
      if (first) first.focus();
    }
    return ok;
  }

  // Clear an error as soon as the visitor starts fixing it.
  $$('[required]', form).forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') clearError(field);
    });
  });

  function collect() {
    var services = $$('input[name="service"]:checked', form).map(function (c) { return c.value; });
    return {
      name:     $('#name', form).value.trim(),
      company:  $('#company', form).value.trim(),
      city:     $('#city', form).value.trim(),
      email:    $('#email', form).value.trim(),
      phone:    $('#phone', form).value.trim(),
      services: services.join(', ') || 'Not specified',
      message:  $('#message', form).value.trim()
    };
  }

  function mailtoFallback(data) {
    var body = [
      'Name: '     + data.name,
      'Company: '  + data.company,
      'Site city: ' + data.city,
      'Email: '    + data.email,
      'Phone: '    + data.phone,
      'Services: ' + data.services,
      '',
      data.message
    ].join('\n');

    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Quote request — ' + (data.company || data.name)) +
      '&body=' + encodeURIComponent(body);

    showNote('Your email app should be opening with the details filled in. If nothing happens, email us at <a href="mailto:' +
      CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.', 'is-ok');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: real people never fill this in.
    if ($('#company_website', form).value) return;

    if (!validate()) {
      showNote('Please check the highlighted fields.', 'is-error');
      return;
    }

    var data = collect();
    var submitBtn = $('button[type="submit"]', form);

    if (!FORM_ENDPOINT) {
      mailtoFallback(data);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    showNote('Sending your request…');

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        form.reset();
        showNote('Thanks — we’ve got it. Expect a reply within one business day.', 'is-ok');
      })
      .catch(function () {
        showNote('That didn’t send. Please call <a href="tel:+16470000000">(647) 000-0000</a> or email <a href="mailto:' +
          CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.', 'is-error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request';
        setTimeout(function () {
          if (!note.classList.contains('is-ok')) showNote(defaultNote);
        }, 9000);
      });
  });
})();
