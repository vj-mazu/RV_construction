/* ==========================================
   RV CONSTRUCTION PREMIUM CORE JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. INTRO SPLASH SCREEN
    const splash = document.getElementById('intro-splash');
    if (splash) {
        // Start text reveal animation
        setTimeout(() => {
            splash.classList.add('animate');
        }, 100);

        // Hide splash screen after animation completes
        setTimeout(() => {
            splash.style.opacity = '0';
            document.body.classList.add('splash-done');
            setTimeout(() => {
                splash.style.display = 'none';
            }, 800); // match transition duration
        }, 2200);
    } else {
        document.body.classList.add('splash-done');
    }

    // 2. STICKY NAVBAR & ACTIVE LINKS
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. MOBILE MENU (HAMBURGER)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 4. HERO SLIDER
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 6000; // 6 seconds per slide

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }

    // 5. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));

    // 6. GALLERY & PORTFOLIO FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    // Trigger tiny scale animation
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 400);
                }
            });
        });
    });

    // 7. COUNTER DYNAMIC STATISTICS
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedCounters = false;

    function startCounters() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const increment = target / 50; // speed control

            const updateCount = () => {
                const currentVal = +stat.innerText;
                if (currentVal < target) {
                    stat.innerText = Math.ceil(currentVal + increment);
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    }

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedCounters) {
                    startCounters();
                    animatedCounters = true;
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // 8. TESTIMONIAL AUTOMATIC SLIDER
    const tSlides = document.querySelectorAll('.testimonial-slide');
    const tDots = document.querySelectorAll('.testimonial-dots .dot');
    let activeTestimonial = 0;

    function showTestimonial(index) {
        tSlides.forEach(s => s.classList.remove('active'));
        tDots.forEach(d => d.classList.remove('active'));
        
        tSlides[index].classList.add('active');
        tDots[index].classList.add('active');
        activeTestimonial = index;
    }

    if (tSlides.length > 0 && tDots.length > 0) {
        tDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showTestimonial(idx);
            });
        });

        setInterval(() => {
            let next = (activeTestimonial + 1) % tSlides.length;
            showTestimonial(next);
        }, 5000); // 5 seconds per testimonial
    }

    // 9. FAQ ACCORDION INTERACTIVITY
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const card = question.parentElement;
            const isOpen = card.classList.contains('open');

            // Close all first
            document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));

            if (!isOpen) {
                card.classList.add('open');
            }
        });
    });

    // 10. LIGHTBOX POPUP FOR GALLERY IMAGES
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Unlock scrolling
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 11. PRIVACY MODAL DIALOG TOGGLE
    const privacyLink = document.getElementById('privacy-policy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const privacyClose = document.getElementById('privacy-modal-close');

    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closePrivacyModal = () => {
            privacyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (privacyClose) {
            privacyClose.addEventListener('click', closePrivacyModal);
        }
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                closePrivacyModal();
            }
        });
    }

    // 12. FORM SUBMISSION HANDLER (WHATSAPP INTENT TRIGGER)
    const form = document.getElementById('consultation-form');
    const formStatus = document.getElementById('form-status');

    if (form && formStatus) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Form Values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const projectType = document.getElementById('project-type').value;
            const message = document.getElementById('message').value;

            // Simple user validation
            formStatus.innerHTML = '<span style="color: var(--primary);">Sending your request...</span>';

            // Simulate form submission to backend/whatsapp
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = 'Thank you! Your quote request has been sent to Raju. We will call you shortly.';
                
                // Optional: Open WhatsApp with prefilled message
                const waMessage = `Hello Raju, I am ${name}. I would like to query about a ${projectType} project. Details: ${message}. Contact: ${phone}`;
                const encodedMsg = encodeURIComponent(waMessage);
                setTimeout(() => {
                    window.open(`https://wa.me/916364231954?text=${encodedMsg}`, '_blank');
                }, 1500);

                form.reset();
            }, 1000);
        });
    }
});
