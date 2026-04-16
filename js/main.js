document.addEventListener('DOMContentLoaded', function () {

    // --- LOADER ---
    var loader = document.getElementById('loader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('hidden');
        }, 1800);
    });
    // Fallback if load event already fired
    setTimeout(function () {
        loader.classList.add('hidden');
    }, 3000);

    // --- YEAR ---
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- HEADER SCROLL ---
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE NAV ---
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // --- GALLERY SLIDER ---
    var track = document.getElementById('galleryTrack');
    var prevBtn = document.getElementById('galleryPrev');
    var nextBtn = document.getElementById('galleryNext');
    var dotsContainer = document.getElementById('galleryDots');
    var items = track ? track.querySelectorAll('.gallery__item') : [];
    var currentSlide = 0;
    var slidesVisible = 3;

    function getVisibleSlides() {
        if (window.innerWidth < 480) return 1;
        if (window.innerWidth < 768) return 2;
        return 3;
    }

    function updateGallery() {
        slidesVisible = getVisibleSlides();
        var maxSlide = Math.max(0, items.length - slidesVisible);
        if (currentSlide > maxSlide) currentSlide = maxSlide;
        var itemWidth = items[0] ? items[0].offsetWidth + 20 : 400;
        track.style.transform = 'translateX(' + (-currentSlide * itemWidth) + 'px)';
        updateDots();
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slidesVisible = getVisibleSlides();
        var totalDots = Math.max(1, items.length - slidesVisible + 1);
        for (var i = 0; i < totalDots; i++) {
            var dot = document.createElement('button');
            dot.className = 'gallery__dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.dataset.index = i;
            dot.addEventListener('click', function () {
                currentSlide = parseInt(this.dataset.index);
                updateGallery();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.gallery__dot').forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', function () {
            if (currentSlide > 0) {
                currentSlide--;
                updateGallery();
            }
        });
        nextBtn.addEventListener('click', function () {
            var maxSlide = Math.max(0, items.length - getVisibleSlides());
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateGallery();
            }
        });
        createDots();
        window.addEventListener('resize', function () {
            createDots();
            updateGallery();
        });
    }

    // --- GALLERY DRAG ---
    if (track) {
        var isDragging = false;
        var startX = 0;
        var scrollLeft = 0;

        track.addEventListener('mousedown', function (e) {
            isDragging = true;
            startX = e.pageX;
            track.style.transition = 'none';
        });
        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            var diff = e.pageX - startX;
            var itemWidth = items[0] ? items[0].offsetWidth + 20 : 400;
            track.style.transform = 'translateX(' + (-currentSlide * itemWidth + diff) + 'px)';
        });
        document.addEventListener('mouseup', function (e) {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s ease';
            var diff = e.pageX - startX;
            var threshold = 80;
            if (diff < -threshold && currentSlide < items.length - getVisibleSlides()) {
                currentSlide++;
            } else if (diff > threshold && currentSlide > 0) {
                currentSlide--;
            }
            updateGallery();
        });

        // Touch support
        track.addEventListener('touchstart', function (e) {
            isDragging = true;
            startX = e.touches[0].pageX;
            track.style.transition = 'none';
        }, { passive: true });
        track.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            var diff = e.touches[0].pageX - startX;
            var itemWidth = items[0] ? items[0].offsetWidth + 20 : 400;
            track.style.transform = 'translateX(' + (-currentSlide * itemWidth + diff) + 'px)';
        }, { passive: true });
        track.addEventListener('touchend', function (e) {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s ease';
            var diff = e.changedTouches[0].pageX - startX;
            var threshold = 50;
            if (diff < -threshold && currentSlide < items.length - getVisibleSlides()) {
                currentSlide++;
            } else if (diff > threshold && currentSlide > 0) {
                currentSlide--;
            }
            updateGallery();
        });
    }

    // --- CONTACT FORM ---
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Sent! We\'ll be in touch.';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            setTimeout(function () {
                btn.textContent = 'Send Request →';
                btn.disabled = false;
                btn.style.opacity = '1';
                form.reset();
            }, 3000);
        });
    }

    // --- GSAP ANIMATIONS ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance
        var heroTl = gsap.timeline({ delay: 1.8 });
        heroTl.from('.hero__tag', { opacity: 0, y: 30, duration: 0.6 });
        heroTl.from('.hero__title span', { opacity: 0, y: 60, duration: 0.8, stagger: 0.15 }, '-=0.3');
        heroTl.from('.hero__sub', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4');
        heroTl.from('.hero__buttons', { opacity: 0, y: 30, duration: 0.6 }, '-=0.3');
        heroTl.from('.hero__stats > div', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3');
        heroTl.from('.hero__scroll', { opacity: 0, duration: 0.5 }, '-=0.2');

        // Section headers
        gsap.utils.toArray('.section-head').forEach(function (head) {
            gsap.from(head.children, {
                scrollTrigger: { trigger: head, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.7, stagger: 0.15
            });
        });

        // Service cards
        gsap.utils.toArray('.card').forEach(function (card) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
                opacity: 0, y: 60, duration: 0.8
            });
        });

        // Stats counter
        gsap.utils.toArray('.stat__number[data-target]').forEach(function (num) {
            var target = parseInt(num.dataset.target);
            gsap.from(num, {
                scrollTrigger: { trigger: num, start: 'top 90%', toggleActions: 'play none none none' },
                textContent: 0,
                duration: 2,
                snap: { textContent: 1 },
                ease: 'power2.out'
            });
        });

        // Process steps
        gsap.utils.toArray('.process__step').forEach(function (step, i) {
            gsap.from(step, {
                scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.1
            });
        });

        // About
        gsap.from('.about__content', {
            scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none none' },
            opacity: 0, x: -60, duration: 0.8
        });
        gsap.from('.about__image', {
            scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none none' },
            opacity: 0, x: 60, duration: 0.8
        });

        // Testimonials
        gsap.utils.toArray('.testimonial').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.1
            });
        });

        // Gallery
        gsap.from('.gallery__wrapper', {
            scrollTrigger: { trigger: '.gallery', start: 'top 80%', toggleActions: 'play none none none' },
            opacity: 0, x: 100, duration: 1
        });

        // Contact form
        gsap.from('.form', {
            scrollTrigger: { trigger: '.contact', start: 'top 75%', toggleActions: 'play none none none' },
            opacity: 0, y: 60, duration: 0.8
        });
    }
});
