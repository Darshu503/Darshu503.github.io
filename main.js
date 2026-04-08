
    // CURSOR GLOW
    const glow = document.getElementById('cursorGlow');
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });

    // NAV SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // HAMBURGER
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    function closeMobile() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    // SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // COUNT UP ANIMATION
    function countUp(el, target) {
      let count = 0;
      const step = Math.ceil(target / 30);
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + '+';
        if (count >= target) clearInterval(interval);
      }, 40);
    }

    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('[data-count]');
          nums.forEach(n => countUp(n, parseInt(n.dataset.count)));
          countObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    const statsEl = document.querySelector('.about-stats');
    if (statsEl) countObserver.observe(statsEl);

    // SEND EMAIL
    function sendEmail() {
      const name = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();
      const message = document.getElementById('fmessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      const subject = encodeURIComponent('Portfolio Contact from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
      window.location.href = 'mailto:darshandatrange11@gmail.com?subject=' + subject + '&body=' + body;

      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmessage').value = '';
      const success = document.getElementById('formSuccess');
      success.style.display = 'block';
      setTimeout(() => success.style.display = 'none', 4000);
    }