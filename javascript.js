// 1. Toggle Mobile Menu
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}

// 2. Global Smooth Scroll for all Nav Links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only trigger for internal links (those starting with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);

            if (targetElement) {
                // Calculate offset to account for your fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Automatically close the mobile menu after clicking
                const nav = document.getElementById('nav-menu');
                if (nav && nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        }
    });
});

// 3. Auto-Enlighten Links on Scroll (Scrollspy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

const observerOptions = {
    threshold: 0.6 // Highlights the link when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Check if the link's href matches the ID of the section in view
                if (link.getAttribute('href').includes(entry.target.id)) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});