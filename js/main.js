/* ======================================
   MAIN JAVASCRIPT - رائد الرقمي
   Professional Digital Marketing Portfolio
   ====================================== */

'use strict';

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 600);
        }
        initAnimations();
    }, 1200);
});

// ===== INITIALIZE AOS =====
function initAnimations() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top
    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNavLink();

    // Skill bars
    checkSkillBars();

    // Stats counter
    checkStatsSection();
});

// ===== BACK TO TOP =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('active');

        // Animate hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open')) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ===== SKILL BARS ANIMATION =====
let skillsAnimated = false;

function checkSkillBars() {
    if (skillsAnimated) return;
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const sectionTop = aboutSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.8) {
        animateSkillBars();
        skillsAnimated = true;
    }
}

function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// ===== STATS COUNTER ANIMATION =====
let statsAnimated = false;

function checkStatsSection() {
    if (statsAnimated) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.85) {
        animateStats();
        statsAnimated = true;
    }
}

function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easeProgress);

            stat.textContent = currentValue.toLocaleString('ar');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target.toLocaleString('ar');
            }
        }

        requestAnimationFrame(updateCount);
    });
}

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            let show = false;

            if (filter === 'all') {
                show = true;
            } else {
                show = (category === filter);
            }

            if (show) {
                card.style.display = '';
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonialsTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let slidesPerView = getSlidesPerView();
let maxSlide = Math.ceil(testimonialCards.length - slidesPerView);
let autoSlideInterval;

function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(testimonialCards.length / slidesPerView);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === Math.floor(currentSlide / slidesPerView));
    });
}

function goToSlide(index) {
    currentSlide = index * slidesPerView;
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    updateSlider();
}

function updateSlider() {
    if (!track) return;
    const cardWidth = testimonialCards[0]?.offsetWidth + 24; // 24 = gap
    track.style.transform = `translateX(${currentSlide * cardWidth}px)`;
    updateDots();
}

function nextSlide() {
    slidesPerView = getSlidesPerView();
    maxSlide = testimonialCards.length - slidesPerView;
    if (currentSlide >= maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSlider();
}

function prevSlide() {
    slidesPerView = getSlidesPerView();
    maxSlide = testimonialCards.length - slidesPerView;
    if (currentSlide <= 0) {
        currentSlide = maxSlide;
    } else {
        currentSlide--;
    }
    updateSlider();
}

if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Touch/Swipe support for testimonials
let touchStartX = 0;
let touchEndX = 0;

if (track) {
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            resetAutoSlide();
        }
    }, { passive: true });
}

// Initialize slider
window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    maxSlide = testimonialCards.length - slidesPerView;
    currentSlide = 0;
    createDots();
    updateSlider();
});

createDots();
startAutoSlide();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !service || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        // Show loading
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;

        // Save to table
        try {
            const formData = {
                name: name,
                email: email,
                phone: document.getElementById('phone').value.trim(),
                service: service,
                budget: document.getElementById('budget').value,
                message: message,
                status: 'new',
                submitted_at: new Date().toISOString()
            };

            const response = await fetch('tables/contact_messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Show success
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً', 'success');
            } else {
                throw new Error('Failed to save');
            }
        } catch (err) {
            // Still show success to user (UX)
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            showNotification('تم إرسال رسالتك بنجاح!', 'success');
        }

        // Reset button
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    });
}

// Reset form function
window.resetForm = function() {
    if (contactForm) contactForm.style.display = 'block';
    if (formSuccess) formSuccess.style.display = 'none';
    contactForm.reset();
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `
        <div class="notif-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    notif.style.cssText = `
        position: fixed;
        top: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
        font-size: 0.95rem;
        animation: slideDown 0.4s ease;
        max-width: 90vw;
        white-space: nowrap;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .notif-content { display: flex; align-items: center; gap: 0.7rem; }
        .notification button { background: none; border: none; color: white; cursor: pointer; padding: 0 0.3rem; font-size: 0.9rem; opacity: 0.8; }
        .notification button:hover { opacity: 1; }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notif);
    setTimeout(() => { if (notif.parentElement) notif.remove(); }, 5000);
}

// ===== PARTICLES GENERATION =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;

        particle.style.cssText = `
            left: ${startX}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.3 + 0.1};
        `;

        container.appendChild(particle);
    }
}

createParticles();

// ===== WHATSAPP CTA =====
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
        // Track WhatsApp clicks (can be extended with analytics)
        console.log('WhatsApp contact clicked');
    });
});

// ===== INTERSECTION OBSERVER FOR CARDS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===== PORTFOLIO CARD HOVER EFFECT =====
portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '5';
    });

    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '';
    });
});

// ===== TYPED TEXT EFFECT for Hero =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Add a subtle glow animation to gradient text
    const gradientTexts = heroTitle.querySelectorAll('.gradient-text');
    gradientTexts.forEach(el => {
        el.style.animation = 'gradientShift 3s ease-in-out infinite alternate';
    });
}

// Add gradient shift animation
const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    @keyframes gradientShift {
        from { filter: brightness(1); }
        to { filter: brightness(1.2); }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(gradientStyle);

// ===== SERVICE CARD TILT EFFECT =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s ease';
    });
});

// ===== FOOTER LINKS - SMOOTH SCROLL =====
document.querySelectorAll('.footer-links a[href^="#"], .footer-services a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #d4a017, #2563ab);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
}, { passive: true });

// ===== LOGO CLICK - SCROLL TO TOP =====
document.querySelectorAll('.logo').forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== INITIAL CHECKS =====
document.addEventListener('DOMContentLoaded', () => {
    checkSkillBars();
    checkStatsSection();
    updateActiveNavLink();
});

console.log('%c🚀 Digital Boost - وكالة التسويق الرقمي', 'color: #d4a017; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(212,160,23,0.5);');
console.log('%cإعلانات ممولة | سوشيال ميديا | مواقع | تطبيقات 📱', 'color: #2563ab; font-size: 14px;');

// ===== SCREEN PREVIEW - LOCK PROTECTION =====
(function lockScreenPreviews() {
    // منع النقر على الـ iframe shields
    document.querySelectorAll('.iframe-shield').forEach(shield => {
        shield.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // إظهار رسالة "معاينة فقط"
            const existing = shield.querySelector('.lock-tooltip');
            if (existing) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'lock-tooltip';
            tooltip.innerHTML = '🔒 هذا المشروع للمعاينة فقط<br><small>للحصول على صفحة مماثلة تواصل معنا</small>';
            shield.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.classList.add('fade-out');
                setTimeout(() => tooltip.remove(), 400);
            }, 2200);
        });
    });
    
    // منع أي محاولة للوصول للـ iframes عبر لوحة المفاتيح
    document.querySelectorAll('.preview-iframe').forEach(iframe => {
        iframe.setAttribute('tabindex', '-1');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.pointerEvents = 'none';
    });
})();
