document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');
    const body = document.body;
    const logoLink = document.querySelector('.logo-link'); 

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll'); 
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    function smoothScrollTo(targetId) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight; 

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    document.querySelectorAll('.nav-list a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute('href'));
        });
    });

    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute('href'));
        });
    }

    const sections = document.querySelectorAll('.common-section'); 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.section-title');
                if (title) {
                    title.style.opacity = 1;
                    title.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('features-section')) {
                    entry.target.querySelectorAll('.feature-item').forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'translateY(0)';
                        }, index * 150); 
                    });
                } else {
                    entry.target.querySelectorAll('.about-content, .step-item, .news-list, .btn-secondary, .btn-more-news').forEach((item, index) => {
                         setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'translateY(0)';
                        }, index * 120); 
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); 

    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            title.style.opacity = 0;
            title.style.transform = 'translateY(30px)';
            title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        }

        if (section.classList.contains('features-section')) {
            section.querySelectorAll('.feature-item').forEach(item => {
                item.style.opacity = 0;
                item.style.transform = 'translateY(40px)';
                item.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            });
        } else {
             section.querySelectorAll('.about-content, .step-item, .news-list, .btn-secondary, .btn-more-news').forEach(item => {
                item.style.opacity = 0;
                item.style.transform = 'translateY(40px)';
                item.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            });
        }
        observer.observe(section);
    });

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        .no-scroll {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    document.head.appendChild(styleSheet);
});