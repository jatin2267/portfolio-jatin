window.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  const typingText = document.getElementById('typing-text');
  const phrases = ['UI/UX Designer', 'Frontend Developer', 'Creative Technologist'];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typingLoop() {
    const currentPhrase = phrases[phraseIdx];

    typingText.textContent = isDeleting
      ? currentPhrase.substring(0, charIdx - 1)
      : currentPhrase.substring(0, charIdx + 1);

    if (isDeleting) charIdx--;
    else charIdx++;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentPhrase.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(typingLoop, speed);
  }

  setTimeout(typingLoop, 1000);


  const observeElements = document.querySelectorAll('.observe');
  observeElements.forEach(el => el.classList.add('hidden'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });

  observeElements.forEach(el => revealObserver.observe(el));


  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      let current = 0;

      function update() {
        const inc = Math.max(1, target / 30);

        if (current < target) {
          current = Math.min(target, current + inc);
          counter.textContent = `${Math.ceil(current)}+`;
          requestAnimationFrame(update);
        } else {
          counter.textContent = `${target}+`;
        }
      }

      update();
      obs.unobserve(counter);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => counterObserver.observe(c));


  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  const nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      if (scrollY >= secTop - 200) current = sec.getAttribute('id');
    });

    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current)) a.classList.add('active');
    });

    nav.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });


  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const project = document.getElementById('project').value;

    const txt = `*New Lead*\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDetails: ${project}`;
    window.open(`https://wa.me/917986129324?text=${encodeURIComponent(txt)}`, '_blank');
  });





  const skillCards = document.querySelectorAll('.circular-progress');

  skillCards.forEach(el => {
    const target = +el.getAttribute('data-target');
    const progressCircle = el.querySelector('.skill-svg__progress');
    const percentText = el.querySelector('.skill-percentage');


    const r = Number(progressCircle.getAttribute('r')) || 54;
    const circumference = 2 * Math.PI * r;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    percentText.textContent = '0%';

    el.dataset.targetValue = String(target);
    el.dataset.circumference = String(circumference);
  });


  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = +el.dataset.targetValue;
      const progressCircle = el.querySelector('.skill-svg__progress');
      const percentText = el.querySelector('.skill-percentage');

      const circumference = Number(el.dataset.circumference) || 339.292;

      const offset = circumference - (target / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;

      const durationMs = 900;
      const start = performance.now();


      function tick(now) {
        const t = Math.min(1, (now - start) / durationMs);
        const current = target * t;

        percentText.textContent = `${Math.round(current)}%`;

        if (t < 1) requestAnimationFrame(tick);
        else percentText.textContent = `${target}%`;
      }

      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.35 });

  skillCards.forEach(card => skillObserver.observe(card));

  // ================== PORTFOLIO INTERACTION (filter + modal) ==================

  const portfolioGrid = document.querySelector('.portfolio-grid');
  const filterBtns = document.querySelectorAll('.portfolio-filter .filter-btn');

  const createModal = () => {
    // Avoid creating twice (in case of hot reload / multiple DOMContentLoaded)
    if (document.getElementById('projectModal')) return;


    const modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'project-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="project-modal__backdrop" data-close="true"></div>
      <div class="project-modal__panel" role="document">
        <button class="project-modal__close" type="button" aria-label="Close modal" data-close="true">&times;</button>

        <div class="project-modal__header">
          <h3 class="project-modal__title">Project Title</h3>
          <div class="project-modal__category" id="projectModalCategory"></div>
        </div>

        <div class="project-modal__body">
          <div class="project-modal__preview">
            <img id="projectModalImage" alt="Project preview" src="" />
          </div>
          <div class="project-modal__content">
            <p id="projectModalDescription" class="project-modal__description"></p>
            <div class="project-modal__meta">
              <span class="project-modal__meta-label">Tools</span>
              <div class="project-modal__meta-value" id="projectModalTech"></div>
            </div>
          </div>
        </div>

        <div class="project-modal__footer">
          <button type="button" class="btn-outline project-modal__action" data-close="true">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  };

  const openModal = (item) => {
    createModal();

    const modal = document.getElementById('projectModal');
    const title = item.getAttribute('data-title') || item.querySelector('.portfolio-overlay h4')?.textContent?.trim() || 'Project';
    const category = item.getAttribute('data-category') || '';
    const description = item.getAttribute('data-description') || '';
    const tech = item.getAttribute('data-tech') || '';
    const img = item.querySelector('img');
    const imgSrc = img ? img.getAttribute('src') : '';

    modal.querySelector('.project-modal__title').textContent = title;
    modal.querySelector('#projectModalCategory').textContent = category;
    modal.querySelector('#projectModalDescription').textContent = description;
    modal.querySelector('#projectModalTech').textContent = tech;
    modal.querySelector('#projectModalImage').src = imgSrc;

    modal.classList.add('project-modal--open');
    modal.setAttribute('aria-hidden', 'false');

    // Prevent background scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('project-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (portfolioGrid && filterBtns.length) {
    // Filtering logic
    const applyFilter = (filterValue) => {
      filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filterValue));

      const items = portfolioGrid.querySelectorAll('.portfolio-item');
      items.forEach(item => {
        const itemFilter = item.getAttribute('data-filter') || 'all';
        const shouldShow = filterValue === 'all' || itemFilter === filterValue;

        item.style.transition = 'opacity 250ms ease, transform 250ms ease';
        if (shouldShow) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          item.style.pointerEvents = 'auto';
          item.style.display = '';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          item.style.pointerEvents = 'none';
          // After fade, hide completely to avoid tab order weirdness
          window.setTimeout(() => {
            const stillHidden = item.style.opacity === '0';
            if (stillHidden) item.style.display = 'none';
          }, 250);
        }
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.dataset.filter || 'all';
        applyFilter(filterValue);
      });
    });

    // Set initial selected UI state based on existing active button (if any)
    const active = document.querySelector('.portfolio-filter .filter-btn.active');
    if (active && active.dataset.filter) applyFilter(active.dataset.filter);
    else applyFilter('all');

    // Card click -> modal (also supports URL hash for Back/Reload)
    portfolioGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.portfolio-item');
      if (!card) return;

      const title = card.getAttribute('data-title') || '';
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (slug) {
        try {
          history.pushState({ project: slug }, '', `#project=${encodeURIComponent(slug)}`);
        } catch (_) {}
      }

      openModal(card);
    });

    // Open modal from URL hash on load
    const openFromHash = () => {
      const hash = window.location.hash || '';
      const m = hash.match(/project=([^&]+)/);
      if (!m) return;

      const slug = decodeURIComponent(m[1]);
      if (!slug) return;

      const items = portfolioGrid.querySelectorAll('.portfolio-item');
      let found = null;

      items.forEach(item => {
        const title = item.getAttribute('data-title') || '';
        const s = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        if (s === slug) found = item;
      });

      if (found) openModal(found);
    };

    openFromHash();

    // Back button closes modal
    window.addEventListener('popstate', () => {
      closeModal();
    });


    // Close modal on backdrop / close button
    document.addEventListener('click', (e) => {
      const targetClose = e.target && e.target.getAttribute && e.target.getAttribute('data-close') === 'true';
      if (targetClose) closeModal();
    });

    // Close modal with Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Initial state
    applyFilter('all');
  }
});



