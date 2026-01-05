// ===== CAMPUSGERMAN HEADER FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate hamburger to X
            const lines = this.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        });
    }
    
    // Mobile menu close
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset hamburger animation
            const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    }
    
    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Reset hamburger animation
                const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }
    
    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.mobile-dropdown-btn');
        if (toggle) {
            toggle.addEventListener('click', function() {
                dropdown.classList.toggle('active');
                
                // Animate arrow
                const arrow = this.querySelector('.fa-chevron-down');
                if (dropdown.classList.contains('active')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
    
    // ===== MOBILE LANGUAGE SELECTOR FUNCTIONALITY =====
    const mobileLangBtn = document.getElementById('mobileLangBtn');
    const mobileLangDropdown = document.getElementById('mobileLangDropdown');
    
    if (mobileLangBtn && mobileLangDropdown) {
        mobileLangBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileLangDropdown.classList.toggle('show');
            
            const arrow = this.querySelector('.mobile-lang-arrow');
            if (mobileLangDropdown.classList.contains('show')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
        
        // Hide mobile language dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileLangBtn.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
                mobileLangDropdown.classList.remove('show');
                const arrow = mobileLangBtn.querySelector('.mobile-lang-arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // ===== LANGUAGE SELECTOR FUNCTIONALITY =====
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (langBtn && langDropdown) {
        // Toggle language dropdown
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
            
            // Calculate dropdown position
            if (langDropdown.classList.contains('show')) {
                const btnRect = this.getBoundingClientRect();
                
                // Move dropdown to body to avoid clipping
                document.body.appendChild(langDropdown);
                
                // Position dropdown below the button
                langDropdown.style.position = 'fixed';
                langDropdown.style.top = (btnRect.bottom + 5) + 'px';
                langDropdown.style.right = (window.innerWidth - btnRect.right) + 'px';
                langDropdown.style.zIndex = '2147483647';
                langDropdown.style.display = 'block';
            } else {
                // Move dropdown back to original position when hidden
                const languageSelector = document.querySelector('.language-selector');
                if (languageSelector && !languageSelector.contains(langDropdown)) {
                    languageSelector.appendChild(langDropdown);
                }
            }
            
            // Animate arrow
            const arrow = this.querySelector('.lang-arrow');
            if (langDropdown.classList.contains('show')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
        
        // Hide language dropdown when clicking outside
        document.addEventListener('click', function() {
            if (langDropdown.classList.contains('show')) {
                langDropdown.classList.remove('show');
                const arrow = langBtn.querySelector('.lang-arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
                
                // Move dropdown back to original position
                const languageSelector = document.querySelector('.language-selector');
                if (languageSelector && !languageSelector.contains(langDropdown)) {
                    languageSelector.appendChild(langDropdown);
                }
            }
        });
        
        // Language selection - direct navigation
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Don't prevent default - let the link work normally
                // The href attribute will handle the navigation
                console.log('Navigating to:', this.href);
            });
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Reset hamburger animation
                    const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
                    lines[0].style.transform = 'none';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = 'none';
                }
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECTS =====
    const mainHeader = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        lastScrollTop = scrollTop;
    });
    
    // ===== DROPDOWN HOVER EFFECTS =====
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-panel');
        
        if (dropdown) {
            item.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            item.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            });
        }
    });
    
    // ===== CTA BUTTON - NO ANIMATIONS, NO SIZE CHANGES =====
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-primary, .mobile-cta');
    
    ctaButtons.forEach(button => {
        // Remove all inline styles that might affect size
        const lockSize = function() {
            button.style.removeProperty('transform');
            button.style.removeProperty('scale');
            button.style.removeProperty('width');
            button.style.removeProperty('height');
            button.style.removeProperty('min-width');
            button.style.removeProperty('max-width');
            button.style.removeProperty('min-height');
            button.style.removeProperty('max-height');
            button.style.removeProperty('padding');
        };
        
        // Lock size on all events
        ['mousedown', 'mouseup', 'click', 'mouseenter', 'mouseleave', 'focus', 'blur'].forEach(eventType => {
            button.addEventListener(eventType, lockSize);
        });
        
        // Remove any child elements that might affect size (like ripple)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && (node.classList.contains('ripple') || node.tagName === 'SPAN' && node !== button.querySelector('span:not(.ripple)'))) {
                        node.remove();
                    }
                });
            });
        });
        
        observer.observe(button, { childList: true });
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== WINDOW RESIZE HANDLER =====
const handleResize = debounce(function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}, 250);

window.addEventListener('resize', handleResize);

// Initialize on page load
handleResize();

// ===== SCROLL TO TOP FUNCTIONALITY =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF8888 0%, #FFF193 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(255, 136, 136, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 8px 25px rgba(255, 136, 136, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 5px 15px rgba(255, 136, 136, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===== SCROLL EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

