/* ===================================================================
   CCG TRAVELS — JavaScript Interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ——— Header Scroll Effect ———
    const header = document.getElementById('header');
    if (header && !header.classList.contains('scrolled-always')) {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ——— Mobile Menu Toggle ———
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ——— Smooth Scroll (only for # links) ———
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ——— Fade-Up IntersectionObserver ———
    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 100);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    // ——— Counter Animation (Home page) ———
    const statNumbers = document.querySelectorAll('.stat__number');
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    if (target) animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el, target) {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 16);
    }

    // ——— Hero Parallax (Home page) ———
    const heroBg = document.querySelector('.hero__bg-img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
            }
        }, { passive: true });
    }

    // ——— Journey Card Hover Tilt ———
    document.querySelectorAll('.journey-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(800px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ——— Trips Filter (Trips page) ———
    const filterBtns = document.querySelectorAll('.filter__btn');
    if (filterBtns.length > 0) {
        const cards = document.querySelectorAll('.journey-card[data-category]');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = '';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ——— Contact Form (Contact page) ———
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.contact-form__submit');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...`;
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                contactForm.innerHTML = `
                    <div class="form-success">
                        <div class="form-success__icon">✅</div>
                        <h3 class="form-success__title">Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                        <br>
                        <p>You can also reach us directly:</p>
                        <p><strong>📧</strong> <a href="mailto:chalchaleghumnee@gmail.com" style="color: var(--clr-primary)">chalchaleghumnee@gmail.com</a></p>
                        <p><strong>📞</strong> <a href="tel:+917042869366" style="color: var(--clr-primary)">+91 70428 69366</a></p>
                    </div>
                `;
            }, 1500);
        });
    }

    // ——— CSS Animation Keyframe for Filter ———
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

});
