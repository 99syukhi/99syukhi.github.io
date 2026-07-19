document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll('main section, header, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const matches = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', matches);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' } 
  );

  sections.forEach((section) => {
    if (section.id) observer.observe(section);
  });

  const revealTargets = document.querySelectorAll(
    '.role-card, .project-card, .skill-pill'
  );

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

});

// ==========================================================
// work.js — filter buttons for the work/projects page
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card');
  const noResults  = document.getElementById('noResults');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      let visible = 0;

      workCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.status === filter;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      // Show/hide the empty state message
      noResults.hidden = visible > 0;
    });
  });

});
