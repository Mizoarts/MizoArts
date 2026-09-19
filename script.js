/**
 * ══════════════════════════════════════════════════════════════════════
 * MIZO — Mazin Hisham Portfolio
 * Graphic Designer, Video Editor & Motion Designer
 * Vanilla JavaScript Controller
 * ══════════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------
     1. THEME ENGINE (Dark/Light Mode with LocalStorage Persistence)
     ------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('mizo_portfolio_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else {
    // Default to dark as requested in project specifications
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('mizo_portfolio_theme', nextTheme);
    });
  }

  /* ------------------------------------------------------------------
     2. STICKY HEADER & SCROLL SPY
     ------------------------------------------------------------------ */
  const siteHeader = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky header background transition
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active navigation state based on viewport position
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
      mobileNavLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  /* ------------------------------------------------------------------
     3. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------ */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav');

  const toggleMobileNav = (open) => {
    const isOpen = open !== undefined ? open : !mobileNavDrawer.classList.contains('open');
    mobileNavDrawer.classList.toggle('open', isOpen);
    mobileToggleBtn.classList.toggle('open', isOpen);
    mobileToggleBtn.setAttribute('aria-expanded', isOpen.toString());
    mobileNavDrawer.setAttribute('aria-hidden', (!isOpen).toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (mobileToggleBtn && mobileNavDrawer) {
    mobileToggleBtn.addEventListener('click', () => toggleMobileNav());

    // Close mobile drawer when any link is clicked
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMobileNav(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        toggleMobileNav(false);
      }
    });

    // Auto-close on viewport resize past tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNavDrawer.classList.contains('open')) {
        toggleMobileNav(false);
      }
    });
  }

  /* ------------------------------------------------------------------
     4. SCROLL REVEAL (IntersectionObserver)
     ------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-init');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ------------------------------------------------------------------
     5. BACK TO TOP BUTTON
     ------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------
     6. PROJECT CASE STUDY MODAL DATA & CONTROLLER
     ------------------------------------------------------------------ */
  const projectDatabase = {
    p1: {
      category: 'Advertising / Video / Cinematic',
      title: 'Sudan Tourism Campaign',
      role: 'Director, Concept Development & Post-Production',
      deliverables: 'Cinematic Commercial Video, Sound Design, Color Grade',
      output: 'Commercial Broadcast & Web Release',
      description: 'A cinematic advertising video created to showcase the beauty of Sudan and highlight its cultural and natural diversity. The project was developed completely from scratch, including extensive visual research, archival and footage curation, concept development, editing, visual storytelling, and final delivery.',
      challenge: 'The primary challenge was finding and curating authentic visual material that could accurately represent Sudan while upholding a high-end cinematic advertising aesthetic. Overcame this by implementing a unified film color grade, atmospheric pacing, and evocative sound design that communicates Sudan\'s beauty and diversity through an engaging, emotional visual experience.',
      bgClass: 'thumb-sudan',
      svgMarkup: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" style="width:100px;height:100px;color:var(--text-primary);">
        <polygon points="50,15 15,85 85,85" stroke="var(--accent-secondary)"/>
        <polygon points="65,35 40,85 90,85" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3 3"/>
        <circle cx="50" cy="40" r="14" stroke="var(--accent)"/>
        <path d="M10 90 Q 50 78, 90 90" stroke="var(--accent)" stroke-width="3"/>
      </svg>`
    },
    p2: {
      category: 'Commercial / Advertising',
      title: 'Galaxy — App Launch Campaign',
      role: 'Creative Direction, Video Editing & Motion',
      deliverables: 'App Launch Commercials, Promotional Teasers, UI Motion',
      output: 'Gulf Regional Campaign & Social Media',
      description: 'A commercial campaign created for Galaxy, a prominent company specializing in vehicle shipping and transportation across the Gulf region. The project focused on promoting the official launch of the company\'s mobile application and communicating its core logistics services through a dynamic, modern advertising style.',
      challenge: 'Required balancing technical mobile app interface demonstrations with fast-paced automotive motion visuals to establish credibility among Gulf logistics customers. The campaign successfully drove app adoption and amplified regional brand presence.',
      bgClass: 'thumb-galaxy',
      svgMarkup: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" style="width:100px;height:100px;color:var(--text-primary);">
        <rect x="28" y="15" width="44" height="70" rx="8" stroke="var(--accent)"/>
        <line x1="38" y1="22" x2="62" y2="22" stroke="var(--accent)"/>
        <path d="M15 65 L40 65 L50 45 L85 45" stroke="var(--accent-secondary)" stroke-width="2"/>
        <circle cx="32" cy="72" r="5" fill="currentColor"/>
        <circle cx="68" cy="72" r="5" fill="currentColor"/>
      </svg>`
    },
    p3: {
      category: 'Commercial / Product Advertising',
      title: 'G-SHOCK — Sports Watch Campaign',
      role: 'Video Editor & Commercial Concept Designer',
      deliverables: 'Social Video Commercial, Speed Ramping, Sound Design',
      output: 'Targeted Product Advertising Campaign',
      description: 'An energetic commercial campaign for G-SHOCK featuring Sudanese content creator Mo\'tamad Sharfi. The core goal was to create a visually engaging sports watch advertisement while clearly communicating the product\'s durability, rugged styling, and everyday value.',
      challenge: 'Synthesizing fast athletic movements, close-up product macro angles, and high-tempo music to keep viewer attention while ensuring product clarity. The campaign successfully communicated the intended message and directly helped generate new verified customers for the distributor.',
      bgClass: 'thumb-gshock',
      svgMarkup: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" style="width:100px;height:100px;color:var(--text-primary);">
        <polygon points="50,15 75,30 75,70 50,85 25,70 25,30" stroke="#ef4444"/>
        <circle cx="50" cy="50" r="20" stroke="currentColor"/>
        <polyline points="50,38 50,50 60,55" stroke="var(--accent-secondary)"/>
      </svg>`
    },
    p4: {
      category: 'Motion Graphics / Social Media / Ramadan Program',
      title: 'Mo\'tamad Kitchen — مطبخ معتمد',
      role: 'Lead Motion Designer & Post-Production Editor',
      deliverables: 'Animated Intros, Lower Thirds, Outros, Episode Editing',
      output: 'Broadcast Series (Over 5M+ Verified Views)',
      description: 'A celebrated Ramadan culinary and entertainment program created in collaboration with Sudanese creator Mo\'tamad Sharfi. Contributed comprehensive visual content and creative production across the entire season, including custom motion graphics, themed animated opening titles, and video content.',
      challenge: 'Maintaining high production speed during daily Ramadan broadcast deadlines while keeping motion graphics polished, cultural, and appetizing. The program achieved more than 5 million views across platforms, standing out as an iconic seasonal campaign.',
      bgClass: 'thumb-kitchen',
      svgMarkup: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" style="width:100px;height:100px;color:var(--text-primary);">
        <path d="M65,25 A25,25 0 1,1 40,65 A35,35 0 1,0 65,25 Z" fill="none" stroke="var(--accent-secondary)"/>
        <polygon points="68,22 71,28 77,28 72,32 74,38 68,34 62,38 64,32 59,28 65,28" fill="var(--accent-secondary)"/>
      </svg>`
    },
    p5: {
      category: 'Graphic Design / Campaign',
      title: 'Ibn Sina University Cultural Day Campaign',
      role: 'Art Director & Graphic Designer',
      deliverables: 'Unified Campaign Identity, Event Posters, Digital Collateral',
      output: 'University Campus & Digital Campaign',
      description: 'A comprehensive visual campaign created for the annual Cultural Day at Ibn Sina University. The project encompassed multiple visual designs developed around a unified creative direction, ensuring seamless consistency across all university print banners, social campaigns, and stage branding.',
      challenge: 'Representing a multifaceted student body with rich cultural traditions without visually overwhelming the university\'s academic brand. Delivered a vibrant yet minimal visual framework celebrated across the faculty and student body.',
      bgClass: 'thumb-ibnsina',
      svgMarkup: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" style="width:100px;height:100px;color:var(--text-primary);">
        <circle cx="50" cy="50" r="40" stroke="#10b981"/>
        <circle cx="50" cy="50" r="28" stroke="var(--accent)" stroke-dasharray="4 3"/>
        <rect x="42" y="42" width="16" height="16" transform="rotate(45 50 50)" fill="var(--accent-secondary)"/>
      </svg>`
    }
  };

  const modalEl = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContactCta = document.getElementById('modal-contact-cta');
  const modalHeroVisual = document.getElementById('modal-hero-visual');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalMetaBar = document.getElementById('modal-meta-bar');
  const modalDescription = document.getElementById('modal-description');
  const modalChallengeText = document.getElementById('modal-challenge-text');

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !modalEl) return;

    modalHeroVisual.className = `modal-hero-visual ${data.bgClass}`;
    modalHeroVisual.innerHTML = data.svgMarkup;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalChallengeText.textContent = data.challenge;

    modalMetaBar.innerHTML = `
      <div class="modal-meta-item"><span>Role</span><strong>${data.role}</strong></div>
      <div class="modal-meta-item"><span>Deliverables</span><strong>${data.deliverables}</strong></div>
      <div class="modal-meta-item"><span>Reach / Output</span><strong>${data.output}</strong></div>
    `;

    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Triggers
  document.querySelectorAll('[data-project-trigger]').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = button.getAttribute('data-project-trigger');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalContactCta) {
    modalContactCta.addEventListener('click', closeProjectModal);
  }

  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

  /* ------------------------------------------------------------------
     7. CONTACT FORM SUBMISSION & SUCCESS INTERACTION
     ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const typeSelect = document.getElementById('contact-type');
      const messageInput = document.getElementById('contact-message');

      // Simple validation check
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill in all required fields before sending.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      // Front-end success feedback
      if (successMessage) {
        successMessage.classList.add('visible');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset form fields
      contactForm.reset();

      // Reset success banner after 8 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.remove('visible');
        }
      }, 8000);
    });
  }

  /* ------------------------------------------------------------------
     8. SMOOTH SCROLLING ADJUSTMENT FOR ANCHORS
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = siteHeader ? siteHeader.offsetHeight + 10 : 75;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
