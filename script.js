// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;
    
    // Simple validation
    if (name.trim() && email.trim() && message.trim()) {
        // Show success message
        alert(`Thank you ${name}! Your message has been received. We'll get back to you soon at ${email}.`);
        
        // Reset form
        form.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

// Add scroll animation to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll effect to cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all cards
    const cards = document.querySelectorAll('.course-card, .about-card, .resource-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add active state to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--light-blue)';
            } else {
                link.style.color = 'var(--text-light)';
            }
        });
    });

    // Add click handlers to course buttons
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseTitle = this.parentElement.querySelector('h3').textContent;
            alert(`You selected: ${courseTitle}\n\nCourse content coming soon!`);
        });
    });

    // Add click handlers to resource items
    const resourceItems = document.querySelectorAll('.resource-item li');
    resourceItems.forEach(item => {
        item.addEventListener('click', function() {
            alert(`Selected: ${this.textContent}`);
        });
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Handle escape key if needed
    }
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}
