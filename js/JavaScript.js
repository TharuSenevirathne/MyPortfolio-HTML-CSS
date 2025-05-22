// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the typing animation
    const typingTextElement = document.querySelector('.typing-text');
    const textArray = ['Web Developer', 'UI/UX Engineer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function typeText() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingDelay = 500;
        }

        setTimeout(typeText, typingDelay);
    }

    typeText();

    // Mobile Menu Toggle
    const toggleBtn = document.querySelector('.toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    toggleBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    // Active Menu Item on Scroll
    const sections = document.querySelectorAll('section');
    const navItem = document.querySelectorAll('.nav-links ul li a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navItem.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Trigger animations when elements are in viewport
    window.addEventListener('scroll', function() {
        const educationSection = document.getElementById('education');
        if (isInViewport(educationSection)) {
            animateSkillBars();
        }
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.section-title, .about-content, .education-content, .projects-container, .contact-content');

    function animateOnScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('fadeIn');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once when page loads

});