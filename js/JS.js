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
