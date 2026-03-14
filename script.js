// BRAVOO V4 - SCRIPT.JS - NIVEAU AGENCE PREMIUM
// Refonte complète par Viktor — Mars 2026

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // HERO TITLE — MOT PAR MOT AVEC STAGGER
    // ========================================
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        const words = text.split(' ');
        
        heroTitle.innerHTML = words.map((word, index) => {
            const isFirst = index === 0;
            const delay = index * 150;
            return `<span class="word ${isFirst ? 'highlight' : ''}" style="animation-delay: ${delay}ms;">${word}</span>`;
        }).join(' ');
    }
    
    // ========================================
    // MENU MOBILE TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animation toggle icon
            if (navLinks.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });

        // Fermer le menu en cliquant sur un lien
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            });
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(event) {
            const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }

    // ========================================
    // ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
    // Toutes les sections apparaissent avec fade-in + translateY
    // ========================================
    const fadeInElements = document.querySelectorAll('.fade-in');
    const sectionHeaders = document.querySelectorAll('.section-header');
    const catalogueCards = document.querySelectorAll('.catalogue-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const stepCards = document.querySelectorAll('.step-card');
    const statsItems = document.querySelectorAll('.stats-section .stats-item');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments
    fadeInElements.forEach(element => observer.observe(element));
    sectionHeaders.forEach(element => observer.observe(element));
    catalogueCards.forEach(element => observer.observe(element));
    featureCards.forEach(element => observer.observe(element));
    testimonialCards.forEach(element => observer.observe(element));
    stepCards.forEach(element => observer.observe(element));
    statsItems.forEach(element => observer.observe(element));

    // ========================================
    // STAGGER DELAYS POUR TOUTES LES CARTES
    // Chaque type de carte a son propre délai
    // ========================================
    catalogueCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    stepCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    statsItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // ========================================
    // SMOOTH SCROLL POUR LES ANCRES
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens # vides ou les liens sans target valide
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // STICKY NAV SHADOW ON SCROLL
    // ========================================
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            nav.style.boxShadow = '0 4px 24px rgba(91, 79, 233, 0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });

    // ========================================
    // PHONE 3D PARALLAX EFFECT (subtle)
    // Rotation au hover + Parallax au scroll
    // ========================================
    const phone3d = document.querySelector('.phone-3d');
    const phone3dContainer = document.querySelector('.phone-3d-container');
    
    if (phone3d && phone3dContainer) {
        let isHovering = false;
        
        phone3d.addEventListener('mouseenter', function() {
            isHovering = true;
        });
        
        phone3d.addEventListener('mouseleave', function() {
            isHovering = false;
            // Reset to floating animation
            phone3d.style.animation = 'phoneFloat 6s ease-in-out infinite';
        });
        
        phone3d.addEventListener('mousemove', function(e) {
            if (!isHovering) return;
            
            // Pause floating animation during hover
            phone3d.style.animation = 'none';
            
            const rect = phone3d.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 5;
            const rotateY = -12 + ((x - centerX) / centerX) * 10;
            
            phone3d.style.transform = `rotateY(${rotateY}deg) rotateX(${3 - rotateX}deg)`;
        });
        
        // Parallax au scroll (phone se déplace plus lentement que le texte)
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking && window.innerWidth > 768) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const heroHeight = document.querySelector('.hero').offsetHeight;
                    
                    if (scrolled < heroHeight) {
                        const parallaxOffset = scrolled * 0.3;
                        phone3dContainer.style.transform = `translateY(${parallaxOffset}px)`;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // ========================================
    // STATS COUNTER ANIMATION (count-up au scroll)
    // Déclenché APRÈS l'animation fade-in
    // ========================================
    const statsNumbers = document.querySelectorAll('.stats-item h3');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        // Attendre 500ms pour que le fade-in se termine avant de compter
        setTimeout(() => {
            statsNumbers.forEach(stat => {
            const target = stat.textContent;
            
            // Extract number from text (e.g., "5 000+" => 5000, "+2.3" => 2.3)
            const numberMatch = target.match(/[\d\s,.]+/);
            if (!numberMatch) return;
            
            const numStr = numberMatch[0].replace(/\s/g, '');
            
            // Check if decimal
            const isDecimal = numStr.includes('.') || numStr.includes(',');
            const targetNum = parseFloat(numStr.replace(',', '.'));
            
            if (isNaN(targetNum)) return;
            
            const suffix = target.replace(numberMatch[0], '').trim();
            const duration = 2000;
            const increment = targetNum / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    current = targetNum;
                    clearInterval(timer);
                }
                
                let formatted;
                if (isDecimal) {
                    formatted = current.toFixed(1);
                } else {
                    formatted = Math.floor(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                }
                
                stat.textContent = formatted + (suffix ? ' ' + suffix : '');
            }, 16);
            });
            
            statsAnimated = true;
        }, 500);
    }

    // Trigger stats animation when stats section is visible
    if (statsItems.length > 0) {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            statsObserver.observe(statsSection);
        }
    }

    // ========================================
    // CONFETTIS CSS INJECTION (écran Bravo)
    // Injecte 20 éléments confetti dans .success-container
    // ========================================
    const successContainer = document.querySelector('.success-container');
    
    if (successContainer) {
        // Ne créer les confettis qu'une seule fois
        const existingConfetti = successContainer.querySelectorAll('.confetti');
        
        if (existingConfetti.length === 0) {
            const colors = ['#F59E0B', '#EF4444', '#10B981', '#10B981', '#3B82F6', '#EC4899'];
            
            for (let i = 0; i < 20; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                confetti.style.animationDuration = `${2.5 + Math.random() * 1}s`;
                successContainer.appendChild(confetti);
            }
        }
    }

    // ========================================
    // CTA BUTTONS INTERACTION (gradient shift + scale)
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
    });

    // ========================================
    // MARQUEES DUPLICATION (infini)
    // Duplique le contenu pour un scroll infini fluide
    // ========================================
    const pressLogos = document.querySelector('.press-logos');
    const tickerContent = document.querySelector('.ticker-content');
    
    if (pressLogos) {
        // Clone les logos pour créer une boucle infinie
        const logosContent = pressLogos.innerHTML;
        pressLogos.innerHTML += logosContent; // Duplique
    }
    
    // Note: Le ticker est déjà dupliqué dans le HTML pour éviter FOUC

    // ========================================
    // FAQ CATEGORIES FILTER (si page FAQ)
    // ========================================
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqCategories.length > 0 && faqItems.length > 0) {
        faqCategories.forEach(category => {
            category.addEventListener('click', function() {
                // Remove active from all categories
                faqCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active to clicked category
                this.classList.add('active');
                
                const filterValue = this.textContent.toLowerCase().trim();
                
                // Show all if "Toutes" is selected
                if (filterValue === 'toutes') {
                    faqItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    // Basic filter based on keywords in question text
                    faqItems.forEach(item => {
                        const questionText = item.querySelector('h3').textContent.toLowerCase();
                        const answerText = item.querySelector('p').textContent.toLowerCase();
                        const fullText = questionText + ' ' + answerText;
                        
                        let shouldShow = false;
                        
                        if (filterValue === 'fonctionnement') {
                            shouldShow = fullText.includes('fonctionne') || 
                                       fullText.includes('comment') || 
                                       fullText.includes('ia') ||
                                       fullText.includes('diagnostic');
                        } else if (filterValue === 'formations') {
                            shouldShow = fullText.includes('formation') || 
                                       fullText.includes('matière') || 
                                       fullText.includes('code') ||
                                       fullText.includes('concours') ||
                                       fullText.includes('langue');
                        } else if (filterValue === 'tarifs') {
                            shouldShow = fullText.includes('coûte') || 
                                       fullText.includes('prix') || 
                                       fullText.includes('résilier') ||
                                       fullText.includes('abonnement') ||
                                       fullText.includes('satisfait') ||
                                       fullText.includes('€');
                        } else if (filterValue === 'technique') {
                            shouldShow = fullText.includes('mobile') || 
                                       fullText.includes('ordinateur') || 
                                       fullText.includes('hors ligne') ||
                                       fullText.includes('données') ||
                                       fullText.includes('sécurisées');
                        }
                        
                        item.style.display = shouldShow ? 'block' : 'none';
                    });
                }
            });
        });
    }

    // ========================================
    // HERO STATS COUNT-UP (même logique que stats section)
    // ========================================
    const heroStatsNumbers = document.querySelectorAll('.hero-stats .stat-number');
    let heroStatsAnimated = false;

    function animateHeroStats() {
        if (heroStatsAnimated) return;
        
        heroStatsNumbers.forEach(stat => {
            const target = stat.textContent;
            
            const numberMatch = target.match(/[\d\s,.]+/);
            if (!numberMatch) return;
            
            const numStr = numberMatch[0].replace(/\s/g, '');
            const isDecimal = numStr.includes('.') || numStr.includes(',');
            const targetNum = parseFloat(numStr.replace(',', '.'));
            
            if (isNaN(targetNum)) return;
            
            const suffix = target.replace(numberMatch[0], '').trim();
            const duration = 1500;
            const increment = targetNum / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    current = targetNum;
                    clearInterval(timer);
                }
                
                let formatted;
                if (isDecimal) {
                    formatted = current.toFixed(1);
                } else {
                    formatted = Math.floor(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                }
                
                stat.textContent = formatted + (suffix ? ' ' + suffix : '');
            }, 16);
        });
        
        heroStatsAnimated = true;
    }

    // Trigger hero stats animation on load (slight delay)
    if (heroStatsNumbers.length > 0) {
        setTimeout(animateHeroStats, 800);
    }

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const scrollProgress = document.createElement('div');
    scrollProgress.classList.add('scroll-progress');
    document.body.prepend(scrollProgress);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ========================================
    // PARTICULES FLOTTANTES DANS LE HERO
    // ========================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('hero-particles');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particlesContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particlesContainer);
    }

    // ========================================
    // CARDS HOVER 3D (CATALOGUE & FEATURES)
    // ========================================
    const cards3D = document.querySelectorAll('.catalogue-card, .feature-card');
    
    cards3D.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ========================================
    // LOG READY
    // ========================================
    console.log('🎓 Bravoo V4 — Niveau Agence Premium loaded successfully');
    console.log('✨ Animations WOW activées : shimmer, glow, particles, 3D hover, scroll progress');
});
