const siteConfigElement = document.getElementById('site-config');
const siteConfig = siteConfigElement ? JSON.parse(siteConfigElement.textContent || '{}') : {};
const state = {
  translations: null,
  language: localStorage.getItem('lead-radar-language') || siteConfig.defaultLanguage || 'fr',
};

const refs = {
  title: document.querySelector('title'),
  metaDescription: document.querySelector('meta[name="description"]'),
  navbar: document.getElementById('navbar'),
  navAbout: document.getElementById('navAbout'),
  navServices: document.getElementById('navServices'),
  navGallery: document.getElementById('navGallery'),
  navReviews: document.getElementById('navReviews'),
  navContact: document.getElementById('navContact'),
  languageLabel: document.getElementById('languageLabel'),
  heroSection: document.querySelector('.hero'),
  heroVisual: document.querySelector('.hero-visual, .hero-bg'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),
  heroDescription: document.getElementById('heroDescription'),
  heroPrimaryCta: document.getElementById('heroPrimaryCta'),
  heroSecondaryCta: document.getElementById('heroSecondaryCta'),
  heroRatingLabel: document.getElementById('heroRatingLabel'),
  heroContactLabel: document.getElementById('heroContactLabel'),
  heroAddressLabel: document.getElementById('heroAddressLabel'),
  aboutEyebrow: document.getElementById('aboutEyebrow'),
  aboutTitle: document.getElementById('aboutTitle'),
  aboutBody: document.getElementById('aboutBody'),
  servicesEyebrow: document.getElementById('servicesEyebrow'),
  servicesTitle: document.getElementById('servicesTitle'),
  servicesIntro: document.getElementById('servicesIntro'),
  servicesGrid: document.getElementById('servicesGrid'),
  highlightsEyebrow: document.getElementById('highlightsEyebrow'),
  highlightsTitle: document.getElementById('highlightsTitle'),
  highlightsGrid: document.getElementById('highlightsGrid'),
  galleryEyebrow: document.getElementById('galleryEyebrow'),
  galleryTitle: document.getElementById('galleryTitle'),
  galleryIntro: document.getElementById('galleryIntro'),
  reviewsEyebrow: document.getElementById('reviewsEyebrow'),
  reviewsTitle: document.getElementById('reviewsTitle'),
  reviewsSummary: document.getElementById('reviewsSummary'),
  contactEyebrow: document.getElementById('contactEyebrow'),
  contactTitle: document.getElementById('contactTitle'),
  contactIntro: document.getElementById('contactIntro'),
  faqEyebrow: document.getElementById('faqEyebrow'),
  faqTitle: document.getElementById('faqTitle'),
  faqList: document.getElementById('faqList'),
  footerTagline: document.getElementById('footerTagline'),
  addressLabel: document.getElementById('addressLabel'),
  phoneLabel: document.getElementById('phoneLabel'),
  emailLabel: document.getElementById('emailLabel'),
  hoursLabel: document.getElementById('hoursLabel'),
  formTitle: document.getElementById('formTitle'),
  formIntro: document.getElementById('formIntro'),
  formNameLabel: document.getElementById('formNameLabel'),
  formPhoneLabel: document.getElementById('formPhoneLabel'),
  formMessageLabel: document.getElementById('formMessageLabel'),
  formSubmitButton: document.getElementById('formSubmitButton'),
  contactName: document.getElementById('contactName'),
  contactPhone: document.getElementById('contactPhone'),
  contactMessage: document.getElementById('contactMessage'),
  openMapLink: document.getElementById('openMapLink'),
  callNowLink: document.getElementById('callNowLink'),
  viewReviewsButton: document.getElementById('viewReviewsButton'),
  writeReviewButton: document.getElementById('writeReviewButton'),
  reviewsBadge: document.getElementById('reviewsBadge'),
  contactBadge: document.getElementById('contactBadge'),
  languageSwitcher: document.getElementById('languageSwitcher'),
  navToggle: document.getElementById('navToggle'),
  whatsappForm: document.getElementById('whatsappForm'),
  welcomeSplash: document.getElementById('welcomeSplash'),
  welcomeContinueButton: document.getElementById('welcomeContinueButton'),
  welcomeCloseButton: document.getElementById('welcomeCloseButton'),
  lightbox: document.getElementById('lightbox'),
  lightboxImage: document.getElementById('lightboxImage'),
  lightboxCaption: document.getElementById('lightboxCaption'),
  lightboxClose: document.getElementById('lightboxClose'),
  galleryGrid: document.getElementById('galleryGrid'),
  dragGallery: document.getElementById('dragGallery'),
  quoteTrack: document.getElementById('quoteTrack'),
  quoteDots: document.getElementById('quoteDots'),
  quotePrev: document.getElementById('quotePrev'),
  quoteNext: document.getElementById('quoteNext'),
  menuFilters: document.getElementById('menuFilters'),
  menuFilterAll: document.getElementById('menuFilterAll'),
  menuFilterCoffee: document.getElementById('menuFilterCoffee'),
  menuFilterPastry: document.getElementById('menuFilterPastry'),
  menuFilterExperience: document.getElementById('menuFilterExperience'),
  whatsappFab: document.getElementById('whatsappFab'),
  backToTop: document.getElementById('backToTop'),
  year: document.getElementById('year'),
};

const setText = (element, value) => {
  if (element && typeof value === 'string') {
    element.textContent = value;
  }
};

const escapeAttribute = (value) => escapeHtml(value);

const getGalleryItem = (index) => {
  if (!Array.isArray(siteConfig.gallery) || siteConfig.gallery.length === 0) {
    return null;
  }

  return siteConfig.gallery[index % siteConfig.gallery.length] || null;
};

const resolveCoffeeCardCategory = (item, index) => {
  const value = `${item?.title || ''} ${item?.description || ''}`.toLowerCase();
  if (value.includes('croissant') || value.includes('pastry') || value.includes('dessert') || value.includes('cookie') || value.includes('viennois') || value.includes('gourmand')) {
    return 'pastry';
  }

  if (value.includes('space') || value.includes('cowork') || value.includes('event') || value.includes('group') || value.includes('ambiance') || value.includes('experience')) {
    return 'experience';
  }

  return index % 3 === 2 ? 'experience' : 'coffee';
};

const renderCards = (container, items, className) => {
  if (!container || !Array.isArray(items)) {
    return;
  }

  const renderStyle = container.dataset.renderStyle || 'default';

  if (renderStyle === 'restaurant-menu') {
    container.innerHTML = items
      .map((item, index) => {
        const galleryItem = getGalleryItem(index + 1) || getGalleryItem(index);
        const imageHtml = galleryItem?.src
          ? `
            <img
              src="${escapeAttribute(galleryItem.src)}"
              alt="${escapeAttribute(`${siteConfig.businessName || 'Business'} - ${item.title || ''}`)}"
              loading="lazy"
            />
          `
          : '';

        return `
          <article class="menu-entry">
            ${imageHtml}
            <div class="menu-entry__body">
              <div class="menu-entry__top">
                <span class="menu-entry__index">${String(index + 1).padStart(2, '0')}</span>
                <h3>${escapeHtml(item.title || '')}</h3>
              </div>
              <p>${escapeHtml(item.description || '')}</p>
            </div>
          </article>
        `;
      })
      .join('');
    return;
  }

  if (renderStyle === 'coffee-process') {
    const icons = [
      'fa-solid fa-seedling',
      'fa-solid fa-fire-flame-curved',
      'fa-solid fa-mug-hot',
      'fa-solid fa-star',
    ];

    container.innerHTML = items
      .slice(0, 4)
      .map((item, index) => `
        <article class="process-step">
          <div class="process-icon"><i class="${icons[index % icons.length]}"></i></div>
          <h4>${String(index + 1).padStart(2, '0')}. ${escapeHtml(item.title || '')}</h4>
          <p>${escapeHtml(item.description || '')}</p>
        </article>
      `)
      .join('');
    return;
  }

  if (renderStyle === 'coffee-menu') {
    container.innerHTML = items
      .map((item, index) => {
        const galleryItem = getGalleryItem(index + 1) || getGalleryItem(index);
        const category = resolveCoffeeCardCategory(item, index);
        const imageHtml = galleryItem?.src
          ? `
            <div class="menu-card-img">
              <img
                src="${escapeAttribute(galleryItem.src)}"
                alt="${escapeAttribute(`${siteConfig.businessName || 'Business'} - ${item.title || ''}`)}"
                loading="lazy"
              />
            </div>
          `
          : '<div class="menu-card-img"></div>';

        return `
          <article class="menu-card" data-category="${category}">
            ${imageHtml}
            <span class="menu-price">${String(index + 1).padStart(2, '0')}</span>
            <h4>${escapeHtml(item.title || '')}</h4>
            <p>${escapeHtml(item.description || '')}</p>
          </article>
        `;
      })
      .join('');
    return;
  }

  container.innerHTML = items
    .map(
      (item, index) => `
        <article class="${className}">
          <span class="card-kicker">${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(item.title || '')}</h3>
          <p>${escapeHtml(item.description || '')}</p>
        </article>
      `,
    )
    .join('');
};

const renderFaq = (container, items) => {
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = items
    .map(
      (item, index) => `
        <details class="faq-item" ${index === 0 ? 'open' : ''}>
          <summary>${escapeHtml(item.question || '')}</summary>
          <p>${escapeHtml(item.answer || '')}</p>
        </details>
      `,
    )
    .join('');
};

const updateGalleryCaptions = (captions) => {
  if (!refs.galleryGrid || !Array.isArray(captions)) {
    return;
  }

  refs.galleryGrid.querySelectorAll('figcaption').forEach((captionElement, index) => {
    captionElement.textContent = captions[index] || captions[captions.length - 1] || '';
  });
};

const applyCoffeeFilterLabels = (language) => {
  const labels = {
    fr: { all: 'Tout', coffee: 'Boissons', pastry: 'Gourmand', experience: 'Experience' },
    en: { all: 'All', coffee: 'Drinks', pastry: 'Pastries', experience: 'Experience' },
    ar: { all: 'الكل', coffee: 'المشروبات', pastry: 'الحلويات', experience: 'التجربة' },
  };

  const current = labels[language] || labels.fr;
  setText(refs.menuFilterAll, current.all);
  setText(refs.menuFilterCoffee, current.coffee);
  setText(refs.menuFilterPastry, current.pastry);
  setText(refs.menuFilterExperience, current.experience);
};

const applyLanguage = (language) => {
  if (!state.translations?.content?.[language]) {
    return;
  }

  const translation = state.translations.content[language];
  state.language = language;
  localStorage.setItem('lead-radar-language', language);

  document.documentElement.lang = language;
  const isRtl = language === 'ar';
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.dataset.dir = isRtl ? 'rtl' : 'ltr';

  setText(refs.title, translation.metaTitle);
  if (refs.metaDescription && translation.metaDescription) {
    refs.metaDescription.setAttribute('content', translation.metaDescription);
  }

  setText(refs.navAbout, translation.nav.about);
  setText(refs.navServices, translation.nav.services);
  setText(refs.navGallery, translation.nav.gallery);
  setText(refs.navReviews, translation.nav.reviews);
  setText(refs.navContact, translation.nav.contact);
  setText(refs.languageLabel, translation.ui.languageLabel);

  setText(refs.heroEyebrow, translation.hero.eyebrow);
  setText(refs.heroTitle, translation.hero.title);
  setText(refs.heroSubtitle, translation.hero.subtitle);
  setText(refs.heroDescription, translation.hero.description);
  setText(refs.heroPrimaryCta, translation.hero.primaryCta);
  setText(refs.heroSecondaryCta, translation.hero.secondaryCta);
  setText(refs.heroRatingLabel, translation.ui.ratingLabel);
  setText(refs.heroContactLabel, translation.ui.contactBadge);
  setText(refs.heroAddressLabel, translation.ui.addressLabel);

  setText(refs.aboutEyebrow, translation.about.eyebrow);
  setText(refs.aboutTitle, translation.about.title);
  setText(refs.aboutBody, translation.about.body);

  setText(refs.servicesEyebrow, translation.services.eyebrow);
  setText(refs.servicesTitle, translation.services.title);
  setText(refs.servicesIntro, translation.services.intro);

  setText(refs.highlightsEyebrow, translation.highlights.eyebrow);
  setText(refs.highlightsTitle, translation.highlights.title);

  setText(refs.galleryEyebrow, translation.gallery.eyebrow);
  setText(refs.galleryTitle, translation.gallery.title);
  setText(refs.galleryIntro, translation.gallery.intro);

  setText(refs.reviewsEyebrow, translation.reviews.eyebrow);
  setText(refs.reviewsTitle, translation.reviews.title);
  setText(refs.reviewsSummary, translation.reviews.summary);

  setText(refs.contactEyebrow, translation.contact.eyebrow);
  setText(refs.contactTitle, translation.contact.title);
  setText(refs.contactIntro, translation.contact.intro);

  setText(refs.faqEyebrow, translation.faq.eyebrow);
  setText(refs.faqTitle, translation.faq.title);

  setText(refs.footerTagline, translation.footer.tagline);
  setText(refs.addressLabel, translation.ui.addressLabel);
  setText(refs.phoneLabel, translation.ui.phoneLabel);
  setText(refs.emailLabel, translation.ui.emailLabel);
  setText(refs.hoursLabel, translation.ui.hoursLabel);
  setText(refs.formTitle, translation.form.title);
  setText(refs.formIntro, translation.form.intro);
  setText(refs.formNameLabel, translation.ui.formNameLabel);
  setText(refs.formPhoneLabel, translation.ui.formPhoneLabel);
  setText(refs.formMessageLabel, translation.ui.formMessageLabel);
  setText(refs.formSubmitButton, translation.ui.formSubmitLabel);
  setText(refs.openMapLink, translation.ui.viewOnMaps);
  setText(refs.callNowLink, translation.ui.callNow);
  setText(refs.viewReviewsButton, translation.ui.viewReviews);
  setText(refs.writeReviewButton, translation.ui.writeReview);
  setText(refs.reviewsBadge, translation.ui.reviewBadge);
  setText(refs.contactBadge, translation.ui.contactBadge);

  if (refs.contactName) {
    refs.contactName.placeholder = translation.ui.formNamePlaceholder || '';
  }

  if (refs.contactPhone) {
    refs.contactPhone.placeholder = translation.ui.formPhonePlaceholder || '';
  }

  if (refs.contactMessage) {
    refs.contactMessage.placeholder = translation.ui.formMessagePlaceholder || '';
  }

  renderCards(refs.servicesGrid, translation.services.items, 'info-card');
  renderCards(refs.highlightsGrid, translation.highlights.items, 'highlight-card');
  renderFaq(refs.faqList, translation.faq.items);
  updateGalleryCaptions(translation.gallery.captions);
  applyCoffeeFilterLabels(language);

  if (refs.languageSwitcher) {
    refs.languageSwitcher.value = language;
  }
};

const handleWhatsAppForm = () => {
  if (!refs.whatsappForm) {
    return;
  }

  refs.whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = refs.contactName?.value?.trim() || '';
    const phone = refs.contactPhone?.value?.trim() || '';
    const message = refs.contactMessage?.value?.trim() || '';
    const whatsappNumber = String(siteConfig.whatsappNumber || siteConfig.phoneNumber || '')
      .replace(/[^\d]/g, '');

    if (!whatsappNumber) {
      window.alert('No WhatsApp number is available for this business.');
      return;
    }

    const payload = [
      name ? `Name: ${name}` : '',
      phone ? `Phone: ${phone}` : '',
      message || refs.contactMessage?.placeholder || '',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(payload)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
};

const handleLightbox = () => {
  if (!refs.galleryGrid || !refs.lightbox || !refs.lightboxImage || !refs.lightboxCaption) {
    return;
  }

  refs.galleryGrid.addEventListener('click', (event) => {
    const figure = event.target instanceof HTMLElement
      ? event.target.closest('figure')
      : null;

    if (!figure) {
      return;
    }

    const image = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');

    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    refs.lightboxImage.src = image.src;
    refs.lightboxImage.alt = image.alt;
    refs.lightboxCaption.textContent = caption?.textContent || '';
    refs.lightbox.hidden = false;
  });

  refs.lightboxClose?.addEventListener('click', () => {
    refs.lightbox.hidden = true;
  });

  refs.lightbox.addEventListener('click', (event) => {
    if (event.target === refs.lightbox) {
      refs.lightbox.hidden = true;
    }
  });
};

const handleCoffeeMenuFilters = () => {
  if (!refs.menuFilters) {
    return;
  }

  refs.menuFilters.addEventListener('click', (event) => {
    const button = event.target instanceof HTMLElement
      ? event.target.closest('.filter-chip')
      : null;

    if (!(button instanceof HTMLElement)) {
      return;
    }

    const filter = button.dataset.filter || 'all';
    refs.menuFilters.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.menu-card').forEach((card) => {
      const category = card instanceof HTMLElement ? card.dataset.category : '';
      const visible = filter === 'all' || category === filter;
      card.classList.toggle('hide', !visible);
    });
  });
};

const handleCoffeeGalleryDrag = () => {
  if (!refs.dragGallery) {
    return;
  }

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  refs.dragGallery.addEventListener('mousedown', (event) => {
    isDown = true;
    refs.dragGallery.classList.add('dragging');
    startX = event.pageX - refs.dragGallery.offsetLeft;
    scrollLeft = refs.dragGallery.scrollLeft;
  });

  ['mouseleave', 'mouseup'].forEach((eventName) => {
    refs.dragGallery.addEventListener(eventName, () => {
      isDown = false;
      refs.dragGallery.classList.remove('dragging');
    });
  });

  refs.dragGallery.addEventListener('mousemove', (event) => {
    if (!isDown) {
      return;
    }

    event.preventDefault();
    const x = event.pageX - refs.dragGallery.offsetLeft;
    const walk = (x - startX) * 1.4;
    refs.dragGallery.scrollLeft = scrollLeft - walk;
  });
};

const handleQuoteCarousel = () => {
  if (!refs.quoteTrack || !refs.quoteDots || !refs.quotePrev || !refs.quoteNext) {
    return;
  }

  const slides = Array.from(refs.quoteTrack.querySelectorAll('.quote-slide'));
  if (slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  let intervalId = null;

  const syncDots = () => {
    refs.quoteDots.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.toggle('active', index === currentIndex);
      dot.addEventListener('click', () => goToSlide(index));
      refs.quoteDots.appendChild(dot);
    });
  };

  const goToSlide = (index) => {
    slides[currentIndex]?.classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex]?.classList.add('active');
    Array.from(refs.quoteDots.children).forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentIndex);
    });
  };

  refs.quotePrev.addEventListener('click', () => goToSlide(currentIndex - 1));
  refs.quoteNext.addEventListener('click', () => goToSlide(currentIndex + 1));

  syncDots();

  if (slides.length > 1) {
    intervalId = window.setInterval(() => goToSlide(currentIndex + 1), 6000);
    const carousel = refs.quoteTrack.closest('.quote-carousel');
    carousel?.addEventListener('mouseenter', () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    });
    carousel?.addEventListener('mouseleave', () => {
      if (!intervalId) {
        intervalId = window.setInterval(() => goToSlide(currentIndex + 1), 6000);
      }
    });
  }
};

const handleNavigationToggle = () => {
  if (!refs.navToggle) {
    return;
  }

  const navPanel = document.getElementById('navLinks') || document.getElementById('navMenu');

  const closeNavigation = () => {
    document.body.dataset.navOpen = 'false';
    refs.navToggle.setAttribute('aria-expanded', 'false');
    refs.navToggle.classList.remove('active');
    navPanel?.classList.remove('active');
  };

  refs.navToggle.addEventListener('click', () => {
    const nextState = document.body.dataset.navOpen === 'true' ? 'false' : 'true';
    document.body.dataset.navOpen = nextState;
    refs.navToggle.setAttribute('aria-expanded', String(nextState === 'true'));
    refs.navToggle.classList.toggle('active', nextState === 'true');
    navPanel?.classList.toggle('active', nextState === 'true');
  });

  document.querySelectorAll('#navLinks a, #navMenu a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });
};

const handleWelcomeSplash = () => {
  const params = new URLSearchParams(window.location.search);
  const shouldSkipSplash = params.get('preview') === '1' || params.get('preview') === 'true';

  if (shouldSkipSplash) {
    document.body.dataset.splash = 'closed';
    return;
  }

  document.body.dataset.splash = 'open';

  const closeSplash = () => {
    document.body.dataset.splash = 'closed';
  };

  refs.welcomeContinueButton?.addEventListener('click', closeSplash);
  refs.welcomeCloseButton?.addEventListener('click', closeSplash);
};

const handleHeaderState = () => {
  const syncHeaderState = () => {
    const isScrolled = window.scrollY > 18;
    document.body.dataset.scrolled = isScrolled ? 'true' : 'false';
    refs.navbar?.classList.toggle('scrolled', isScrolled);
  };

  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
};

const handleBackToTop = () => {
  if (!refs.backToTop) {
    return;
  }

  const syncBackToTop = () => {
    refs.backToTop.classList.toggle('visible', window.scrollY > 520);
  };

  refs.backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  syncBackToTop();
  window.addEventListener('scroll', syncBackToTop, { passive: true });
};

const handleScrollReveal = () => {
  const targets = [
    ...document.querySelectorAll('[data-reveal], .content-section, .site-footer, .hero-card, .hero-fact, .story-note, .story-fact, .info-card, .highlight-card, .review-quote, .contact-card, .map-card, .faq-item, .media-card, .about-images, .about-content, .menu-entry, .gallery-item, .testimonial-card, .contact-info-card, .contact-form-wrap, .contact-map-wrap, .footer-col, .zigzag-row, .value-pill, .process-step, .menu-card, .quote-carousel, .contact-panel'),
  ];

  if (targets.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((target) => {
      if (target instanceof HTMLElement && target.dataset.reveal) {
        target.classList.add('revealed');
      } else {
        target.classList.add('is-visible');
      }
    });
    return;
  }

  document.body.dataset.motionReady = 'true';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (entry.target instanceof HTMLElement && entry.target.dataset.reveal) {
          const delay = Number(entry.target.dataset.revealDelay || 0);
          window.setTimeout(() => entry.target.classList.add('revealed'), delay);
        } else {
          entry.target.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.16,
    },
  );

  targets.forEach((target, index) => {
    if (!(target instanceof HTMLElement) || target.dataset.reveal) {
      observer.observe(target);
      return;
    }

    target.classList.add('reveal-target');
    target.style.setProperty('--reveal-delay', `${Math.min(index * 36, 260)}ms`);
    observer.observe(target);
  });
};

const handleHeroMotion = () => {
  if (!(refs.heroSection instanceof HTMLElement) || !(refs.heroVisual instanceof HTMLElement)) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const resetVisual = () => {
    refs.heroVisual.style.transform = '';
  };

  refs.heroSection.addEventListener('pointermove', (event) => {
    const bounds = refs.heroSection.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
    refs.heroVisual.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.01)`;
  });

  refs.heroSection.addEventListener('pointerleave', resetVisual);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const init = async () => {
  try {
    const response = await fetch('assets/translations/i18n.json', { cache: 'no-store' });
    state.translations = await response.json();
    applyLanguage(state.language);
  } catch {
    // The default language is already present in the HTML.
  }

  refs.languageSwitcher?.addEventListener('change', (event) => {
    applyLanguage(event.target.value);
  });

  handleWelcomeSplash();
  handleHeaderState();
  handleNavigationToggle();
  handleBackToTop();
  handleWhatsAppForm();
  handleLightbox();
  handleCoffeeMenuFilters();
  handleCoffeeGalleryDrag();
  handleQuoteCarousel();
  handleScrollReveal();
  handleHeroMotion();
  if (refs.year) {
    refs.year.textContent = String(new Date().getFullYear());
  }
};

init();