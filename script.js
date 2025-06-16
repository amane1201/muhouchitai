document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('header');
    const fadeInElements = document.querySelectorAll('.content-section, .feature-item, .news-item');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    const activeLine = document.createElement('div');
    activeLine.classList.add('active-line');
    mainNav.querySelector('ul').appendChild(activeLine);

    const moveActiveLine = (targetLink) => {
        if (!targetLink || window.innerWidth <= 768) {
            activeLine.style.width = '0px';
            activeLine.style.left = '0px';
            activeLine.style.opacity = '0';
            return;
        }

        const navUlRect = mainNav.querySelector('ul').getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();

        activeLine.style.width = `${linkRect.width}px`;
        activeLine.style.left = `${linkRect.left - navUlRect.left}px`;
        activeLine.style.opacity = '1';
    };

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            let targetElement = null;

            if (targetId === '#home') {
                targetElement = document.body;
            } else {
                targetElement = document.querySelector(targetId);
            }

            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            moveActiveLine(this); 

            if (targetElement) {
                const headerOffset = 80; 
                let offsetPosition;

                if (targetId === '#home') {
                    offsetPosition = 0; 
                } else {
                    offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                }

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');

            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                const currentActiveLink = document.querySelector('.main-nav ul li a.active');
                if (currentActiveLink) {
                    moveActiveLine(currentActiveLink);
                } else {
                    const homeLink = document.querySelector('.main-nav ul li a[href="#home"]');
                    if (homeLink) {
                        homeLink.classList.add('active');
                        moveActiveLine(homeLink);
                    }
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
                menuToggle.style.display = 'none';

                const currentActiveLink = document.querySelector('.main-nav ul li a.active');
                if (currentActiveLink) {
                    moveActiveLine(currentActiveLink);
                } else {
                    const homeLink = document.querySelector('.main-nav ul li a[href="#home"]');
                    if (homeLink) {
                        homeLink.classList.add('active');
                        moveActiveLine(homeLink);
                    }
                }
            } else {
                activeLine.style.opacity = '0';
                activeLine.style.width = '0px';
                menuToggle.style.display = 'flex'; 
            }
        });
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.7)';
            } else {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                header.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                if (entry.target.classList.contains('feature-item')) {
                    entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.3s ease';
                } else if (entry.target.classList.contains('news-item')) {
                    entry.target.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out, box-shadow 0.3s ease';
                } else {
                    entry.target.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -49% 0px', 
        threshold: 0 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));

                const currentNavLink = document.querySelector(`.main-nav ul li a[href="#${entry.target.id}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('active');
                    moveActiveLine(currentNavLink);
                }
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const activateInitialLinkAndMoveLine = () => {
        let targetLink = null;
        const initialHash = window.location.hash;

        if (initialHash) {
            targetLink = document.querySelector(`.main-nav ul li a[href="${initialHash}"]`);
        }

        if (!targetLink) {
            targetLink = document.querySelector('.main-nav ul li a[href="#home"]');
        }

        if (targetLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
            moveActiveLine(targetLink);
        }

        if (window.innerWidth > 768) {
            menuToggle.style.display = 'none';
        } else {
            menuToggle.style.display = 'flex';
        }
    };


    activateInitialLinkAndMoveLine();
    window.addEventListener('hashchange', activateInitialLinkAndMoveLine);
});