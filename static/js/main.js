// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(this.currentSlide);
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Auto slide every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
}

// Gallery Filter
class GalleryFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        this.init();
    }
    
    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filter = btn.getAttribute('data-filter') || 'all';
                
                // Filter items
                this.filterItems(filter);
            });
        });
    }
    
    filterItems(filter) {
        this.galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
            } else {
                // Show loading state
                const submitBtn = this.form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    submitBtn.classList.add('loading');
                }
            }
        });
    }
    
    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorEl = field.parentElement.querySelector('.error-message') || 
                           this.createErrorElement(field);
            
            if (!field.value.trim()) {
                errorEl.textContent = 'This field is required';
                field.classList.add('error');
                isValid = false;
            } else {
                errorEl.textContent = '';
                field.classList.remove('error');
                
                // Email validation
                if (field.type === 'email' && !this.isValidEmail(field.value)) {
                    errorEl.textContent = 'Please enter a valid email address';
                    field.classList.add('error');
                    isValid = false;
                }
                
                // Phone validation
                if (field.name === 'phone' && !this.isValidPhone(field.value)) {
                    errorEl.textContent = 'Please enter a valid phone number';
                    field.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    createErrorElement(field) {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.style.color = '#dc3545';
        errorEl.style.fontSize = '0.875rem';
        errorEl.style.marginTop = '0.25rem';
        field.parentElement.appendChild(errorEl);
        return errorEl;
    }
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    isValidPhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
}

// Service Selection
class ServiceSelector {
    constructor() {
        this.categorySelect = document.getElementById('category');
        this.serviceSelect = document.getElementById('service');
        this.servicesData = {};
        
        if (this.categorySelect && this.serviceSelect) {
            this.init();
        }
    }
    
    async init() {
        // Fetch services data from the page
        try {
            const response = await fetch('/services-data');
            this.servicesData = await response.json();
        } catch (error) {
            // Fallback to embedded data
            this.servicesData = window.servicesData || {};
        }
        
        this.categorySelect.addEventListener('change', (e) => {
            this.updateServices(e.target.value);
        });
        
        // Initialize with first category
        if (this.categorySelect.value) {
            this.updateServices(this.categorySelect.value);
        }
    }
    
    updateServices(category) {
        // Clear current options
        this.serviceSelect.innerHTML = '<option value="">Select a Service</option>';
        
        // Add new options
        if (this.servicesData[category]) {
            this.servicesData[category].forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                this.serviceSelect.appendChild(option);
            });
        }
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    new TestimonialSlider();
    
    // Initialize gallery filter
    if (document.querySelector('.gallery-filter')) {
        new GalleryFilter();
    }
    
    // Initialize form validation
    new FormValidator('booking-form');
    new FormValidator('contact-form');
    
    // Initialize service selector
    new ServiceSelector();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .gallery-item, .blog-card').forEach(el => {
        observer.observe(el);
    });
    
    // Update copyright year
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Booking date restrictions
function initializeDatePicker() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(today.getMonth() + 3);
        
        dateInput.min = today.toISOString().split('T')[0];
        dateInput.max = maxDate.toISOString().split('T')[0];
        
        // Disable past dates
        dateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            if (selectedDate < today) {
                this.value = today.toISOString().split('T')[0];
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeDatePicker);