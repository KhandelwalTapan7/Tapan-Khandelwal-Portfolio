// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        setTimeout(() => {
            initAnimations();
            initTypingEffect();
            initCounters();
        }, 500);
    }, 1500);
});

// Navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'AI/ML Engineer',
        'Deep Learning Specialist',
        'NLP Developer',
        'Generative AI Expert',
        'Python Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        counter.textContent = Math.floor(current);
                    }, 20);
                    
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Certificate Modal - Fixed to show actual PDFs
const certificateModal = document.getElementById('certificateModal');
const viewCertificateBtns = document.querySelectorAll('.view-certificate-btn');
const closeModalBtn = document.querySelector('.close-modal');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const pdfViewer = document.getElementById('pdfViewer');
const downloadBtn = document.getElementById('downloadBtn');
const viewOriginalBtn = document.getElementById('viewOriginalBtn');

// Certificate Data with actual PDF links
const certificates = {
    cognus: {
        title: "Internship Certificate - Cognus Technology",
        pdfUrl: "assets/certificates/cognus-certificate.pdf", // Replace with actual path
        downloadUrl: "assets/certificates/cognus-certificate.pdf",
        originalUrl: "assets/certificates/cognus-certificate.pdf"
    },
    igeek: {
        title: "Internship Certificate - Igeeks Technology",
        pdfUrl: "assets/certificates/igeek-certificate.pdf", // Replace with actual path
        downloadUrl: "assets/certificates/igeek-certificate.pdf",
        originalUrl: "assets/certificates/igeek-certificate.pdf"
    }
};

// Open Certificate Modal with PDF Viewer
viewCertificateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const certType = btn.closest('.certificate-card').getAttribute('data-certificate');
        const certificate = certificates[certType];
        
        if (certificate) {
            modalTitle.textContent = certificate.title;
            
            // Create PDF viewer
            pdfViewer.innerHTML = `
                <iframe src="${certificate.pdfUrl}" frameborder="0"></iframe>
                <div class="pdf-placeholder" style="display: none;">
                    <i class="fas fa-file-pdf"></i>
                    <p>PDF Preview Loading...</p>
                </div>
            `;
            
            // Set download and view buttons
            downloadBtn.href = certificate.downloadUrl;
            downloadBtn.download = `${certType}-certificate.pdf`;
            viewOriginalBtn.href = certificate.originalUrl;
            
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Also make entire certificate card clickable
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.view-certificate-btn')) {
            const certType = card.getAttribute('data-certificate');
            const certificate = certificates[certType];
            
            if (certificate) {
                modalTitle.textContent = certificate.title;
                
                pdfViewer.innerHTML = `
                    <iframe src="${certificate.pdfUrl}" frameborder="0"></iframe>
                    <div class="pdf-placeholder" style="display: none;">
                        <i class="fas fa-file-pdf"></i>
                        <p>PDF Preview Loading...</p>
                    </div>
                `;
                
                downloadBtn.href = certificate.downloadUrl;
                downloadBtn.download = `${certType}-certificate.pdf`;
                viewOriginalBtn.href = certificate.originalUrl;
                
                certificateModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

// Close Modal Functions
function closeModal() {
    certificateModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', closeModal);

certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
        closeModal();
    }
});

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize animations
function initAnimations() {
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    document.querySelectorAll('.project-card, .certificate-card, .skill-category, .contact-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTypingEffect();
    initAnimations();
    
    // Add certificate placeholder styles
    const style = document.createElement('style');
    style.textContent = `
        .certificate-card {
            cursor: pointer;
        }
        
        .certificate-card:hover .certificate-icon {
            animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .project-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});