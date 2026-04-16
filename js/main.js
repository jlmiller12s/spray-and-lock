document.addEventListener('DOMContentLoaded', function () {

    // --- LOADER ---
    var loader = document.getElementById('loader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('hidden');
            // Process Instagram embeds after loader hides
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        }, 1800);
    });
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
    if (toggle && menu) {
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
        heroTl.from('.hero__trust', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2');
        heroTl.from('.hero__product', { opacity: 0, x: 60, duration: 0.8 }, '-=0.6');

        // Section headers
        gsap.utils.toArray('.section-head').forEach(function (head) {
            gsap.from(head.children, {
                scrollTrigger: { trigger: head, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.7, stagger: 0.15
            });
        });

        // Endorsement
        gsap.from('.endorsement__image', {
            scrollTrigger: { trigger: '.endorsement', start: 'top 75%', toggleActions: 'play none none none' },
            opacity: 0, x: -60, duration: 0.8
        });
        gsap.from('.endorsement__content', {
            scrollTrigger: { trigger: '.endorsement', start: 'top 75%', toggleActions: 'play none none none' },
            opacity: 0, x: 60, duration: 0.8
        });

        // Product cards
        gsap.utils.toArray('.product-card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.1
            });
        });

        // Bundle cards
        gsap.utils.toArray('.bundle-card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.1
            });
        });

        // Demo cards
        gsap.utils.toArray('.demo__card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.1
            });
        });

        // Why cards
        gsap.utils.toArray('.why__card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.08
            });
        });

        // Review cards
        gsap.utils.toArray('.review-card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0, y: 40, duration: 0.6, delay: i * 0.1
            });
        });

        // Proof bar
        gsap.from('.proof-item', {
            scrollTrigger: { trigger: '.proof-bar', start: 'top 90%', toggleActions: 'play none none none' },
            opacity: 0, y: 20, duration: 0.5, stagger: 0.1
        });

        // CTA
        gsap.from('.cta__inner', {
            scrollTrigger: { trigger: '.cta', start: 'top 75%', toggleActions: 'play none none none' },
            opacity: 0, y: 60, duration: 0.8
        });

        // Instagram reels
        gsap.from('.reels__item', {
            scrollTrigger: { trigger: '.reels', start: 'top 80%', toggleActions: 'play none none none' },
            opacity: 0, y: 40, duration: 0.6, stagger: 0.15
        });
    }
});
