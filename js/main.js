/* ========================================
   FAZENDA JOIAS - Main JavaScript
   ======================================== */

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== HERO PARALLAX =====
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero__bg');

if (hero && heroBg) {
    hero.classList.add('loaded');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ANIMATED COUNTER FOR STEP NUMBERS =====
const passoNumbers = document.querySelectorAll('.passo__number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.textContent);
            let current = 0;
            const increment = () => {
                if (current < target) {
                    current++;
                    el.textContent = String(current).padStart(2, '0');
                    setTimeout(increment, 150);
                }
            };
            el.textContent = '00';
            setTimeout(increment, 300);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

passoNumbers.forEach(el => counterObserver.observe(el));

// ===== LAZY LOAD IFRAME (Google Maps) =====
const lazyIframes = document.querySelectorAll('iframe[data-src]');
const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            iframeObserver.unobserve(iframe);
        }
    });
}, { rootMargin: '200px' });
lazyIframes.forEach(iframe => iframeObserver.observe(iframe));

// ===== 3D TILT EFFECT ON BENEFICIO CARDS =====
const beneficioCards = document.querySelectorAll('.beneficio');

beneficioCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
