    // ===== CAMPUSGERMAN HEADER FUNCTIONALITY =====

    document.addEventListener('DOMContentLoaded', function() {
    
        // ===== MOBILE MENU - YENİ TEMİZ TASARIM =====
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        
        // Mobile menu aç/kapa
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        if (mobileMenuClose && mobileMenu) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Mobile menu toggle butonları
        document.querySelectorAll('.mobile-menu-toggle').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const submenu = document.getElementById(targetId);
                if (submenu) {
                    const isOpen = submenu.classList.contains('open');
                    // Diğer submenu'leri kapat
                    document.querySelectorAll('.mobile-submenu').forEach(sm => {
                        if (sm.id !== targetId) {
                            sm.classList.remove('open');
                            const otherBtn = document.querySelector(`[data-target="${sm.id}"]`);
                            if (otherBtn) {
                                const otherArrow = otherBtn.querySelector('.fa-chevron-down');
                                if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    // Bu submenu'yu toggle et
                    if (isOpen) {
                        submenu.classList.remove('open');
                    } else {
                        submenu.classList.add('open');
                    }
                    // Arrow animasyonu
                    const arrow = this.querySelector('.fa-chevron-down');
                    if (arrow) {
                        arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        });
        
        // Mobile submenu toggle butonları
        document.querySelectorAll('.mobile-submenu-toggle').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const targetId = this.getAttribute('data-target');
                const submenuList = document.getElementById(targetId);
                if (submenuList) {
                    submenuList.classList.toggle('open');
                    const arrow = this.querySelector('.fa-chevron-down');
                    if (arrow) {
                        arrow.style.transform = submenuList.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        });
        
        // Mobile language toggle - yukarı/aşağı otomatik konum
        const mobileLangBtn = document.getElementById('mobileLangBtn');
        const mobileLangDropdown = document.getElementById('mobileLangDropdown');
        
        if (mobileLangBtn && mobileLangDropdown) {
            // Store original parent
            const originalParent = mobileLangDropdown.parentElement;
            
            mobileLangBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isShowing = mobileLangDropdown.classList.contains('show');
                
                if (!isShowing) {
                    // Move to body for positioning
                    if (mobileLangDropdown.parentElement !== document.body) {
                        document.body.appendChild(mobileLangDropdown);
                    }
                    
                    // Get button position
                    const btnRect = mobileLangBtn.getBoundingClientRect();

                    // Make visible temporarily to measure exact size
                    mobileLangDropdown.style.visibility = 'hidden';
                    mobileLangDropdown.style.opacity = '0';
                    mobileLangDropdown.classList.add('show');
                    const menuRect = mobileLangDropdown.getBoundingClientRect();

                    const margin = 8;
                    let openAbove = false;

                    // Decide open direction
                    if (btnRect.bottom + margin + menuRect.height > window.innerHeight) {
                        openAbove = true;
                    }

                    // Calculate position centered on button
                    let left = btnRect.left + (btnRect.width / 2) - (menuRect.width / 2);
                    left = Math.max(10, Math.min(left, window.innerWidth - menuRect.width - 10));
                    let top = openAbove
                        ? Math.max(10, btnRect.top - menuRect.height - margin)
                        : btnRect.bottom + margin;
                    
                    // Set position
                    mobileLangDropdown.style.position = 'fixed';
                    mobileLangDropdown.style.left = left + 'px';
                    mobileLangDropdown.style.top = top + 'px';
                    mobileLangDropdown.style.zIndex = '10003';
                    mobileLangDropdown.style.transform = openAbove ? 'translateY(-4px)' : 'translateY(4px)';

                    // Show dropdown finally
                    requestAnimationFrame(() => {
                        mobileLangDropdown.style.visibility = 'visible';
                        mobileLangDropdown.style.opacity = '1';
                    });
                    
                    // Rotate chevron
                    const chevron = mobileLangBtn.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = openAbove ? 'rotate(180deg)' : 'rotate(180deg)';
                    }
                } else {
                    // Hide dropdown
                    mobileLangDropdown.classList.remove('show');
                    
                    // Move back to original position
                    if (originalParent && !originalParent.contains(mobileLangDropdown)) {
                        originalParent.appendChild(mobileLangDropdown);
                    }
                    mobileLangDropdown.style.position = '';
                    mobileLangDropdown.style.left = '';
                    mobileLangDropdown.style.top = '';
                    mobileLangDropdown.style.zIndex = '';
                    mobileLangDropdown.style.transform = '';
                    mobileLangDropdown.style.visibility = '';
                    mobileLangDropdown.style.opacity = '';
                    
                    // Reset chevron
                    const chevron = mobileLangBtn.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (mobileLangDropdown.classList.contains('show')) {
                    if (!mobileLangBtn.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
                        mobileLangDropdown.classList.remove('show');
                        
                        // Move back to original position
                        if (originalParent && !originalParent.contains(mobileLangDropdown)) {
                            originalParent.appendChild(mobileLangDropdown);
                        }
                        mobileLangDropdown.style.position = '';
                        mobileLangDropdown.style.left = '';
                        mobileLangDropdown.style.top = '';
                        mobileLangDropdown.style.zIndex = '';
                        
                        // Reset chevron
                        const chevron = mobileLangBtn.querySelector('.fa-chevron-down');
                        if (chevron) {
                            chevron.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            });
        }
        
        // ===== COURSES TABBED DROPDOWN FUNCTIONALITY =====
        const coursesDropdown = document.querySelector('.courses-dropdown');
        if (coursesDropdown) {
            const courseTabs = coursesDropdown.querySelectorAll('.course-tab');
            const coursePanels = coursesDropdown.querySelectorAll('.course-tab-panel');
            
            courseTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Remove active class from all tabs
                    courseTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Hide all panels
                    coursePanels.forEach(panel => panel.classList.remove('active'));
                    
                    // Show corresponding panel
                    const tabName = this.getAttribute('data-tab');
                    const targetPanel = coursesDropdown.querySelector(`[data-panel="${tabName}"]`);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
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
                langDropdown.classList.remove('show');
                const arrow = langBtn.querySelector('.lang-arrow');
                arrow.style.transform = 'rotate(0deg)';
                
                // Move dropdown back to original position
                const languageSelector = document.querySelector('.language-selector');
                if (languageSelector && !languageSelector.contains(langDropdown)) {
                    languageSelector.appendChild(langDropdown);
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
            
    
            
            // Parallax effect for top header
            const topHeader = document.querySelector('.top-header');
            if (topHeader) {
                topHeader.style.transform = `translateY(${scrollTop * 0.05}px)`;
            }
            
            lastScrollTop = scrollTop;
        });
        
        // ===== DROPDOWN HOVER EFFECTS =====
        // Dropdowns are now handled via CSS hover, no JavaScript needed
        
        // ===== CTA BUTTON - NO ANIMATIONS, NO SIZE CHANGES =====
        const ctaButtons = document.querySelectorAll('.cta-button, .mobile-cta');
        
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
        
        // ===== SOCIAL MEDIA HOVER EFFECTS =====
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        });
        
    
        
    
        
        // ===== NOTIFICATION SYSTEM =====
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Add styles
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : '#17a2b8'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10001;
                display: flex;
                align-items: center;
                gap: 15px;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Close button functionality
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.transform = 'translateX(400px)';
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }
            }, 5000);
        }
        
    
        
        // ===== WINDOW RESIZE HANDLER =====
        window.addEventListener('resize', function() {
            // Handle responsive adjustments
            if (mobileMenu && window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Reset hamburger animation
                if (mobileMenuBtn) {
                    const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
                    lines[0].style.transform = 'none';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = 'none';
                }
            }
        });
        
        // ===== KEYBOARD NAVIGATION =====
        document.addEventListener('keydown', function(e) {
            // ESC key closes mobile menu
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Reset hamburger animation
                const lines = mobileMenuBtn.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
        
    
        
        // ===== INITIALIZATION =====
        console.log('CampusGerman Header initialized successfully! 🎓🇩🇪');
        
        // Show welcome notification - REMOVED
        // setTimeout(() => {
        //     showNotification('CampusGerman\'e hoş geldiniz! 🎓', 'success');
        // }, 1000);
    });
    
    // ===== GLOBAL FUNCTIONS =====
    window.CampusGerman = {
        showNotification: function(message, type) {
            // This function can be called from other scripts
            if (typeof showNotification === 'function') {
                showNotification(message, type);
            }
        },
        
        changeLanguage: function(lang) {
            // This function can be called from other scripts
            console.log('Language change requested:', lang);
            // Implement language change logic here
        }
    };
    
    // ===== REVIEWS SLIDER FUNCTIONALITY =====
    document.addEventListener('DOMContentLoaded', function() {
        const reviewsTrack = document.querySelector('.reviews-track');
        const prevBtn = document.getElementById('prevReview');
        const nextBtn = document.getElementById('nextReview');
        const dots = document.querySelectorAll('.nav-dots .dot');
        
        if (!reviewsTrack || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        const totalReviews = document.querySelectorAll('.review-card').length;
        
        // Calculate card width dynamically (100% of container)
        function getCardWidth() {
            const slider = document.querySelector('.reviews-slider');
            return slider ? slider.offsetWidth : 380;
        }
        let cardWidth = getCardWidth();
        
        // Update card width on resize
        window.addEventListener('resize', () => {
            cardWidth = getCardWidth();
            goToReview(currentIndex);
        });
        
        // Initialize dots
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Move to specific review
        function goToReview(index) {
            currentIndex = Math.max(0, Math.min(index, totalReviews - 1));
            const translateX = -currentIndex * cardWidth;
            reviewsTrack.style.transform = `translateX(${translateX}px)`;
            updateDots();
        }
        
        // Next review
        function nextReview() {
            if (currentIndex < totalReviews - 1) {
                goToReview(currentIndex + 1);
            }
        }
        
        // Previous review
        function prevReview() {
            if (currentIndex > 0) {
                goToReview(currentIndex - 1);
            }
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextReview);
        prevBtn.addEventListener('click', prevReview);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToReview(index));
        });
        
        // Auto-play (optional)
        let autoPlayInterval = setInterval(nextReview, 5000);
        
        // Pause auto-play on hover
        const reviewsSlider = document.querySelector('.reviews-slider');
        if (reviewsSlider) {
            reviewsSlider.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            
            reviewsSlider.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextReview, 5000);
            });
        }
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        reviewsTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        reviewsTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextReview(); // Swipe left
                } else {
                    prevReview(); // Swipe right
                }
            }
        });
        
        // Initialize
        updateDots();
        
        console.log('Reviews slider initialized successfully! ⭐');
    });
    
    // ===== FAQ TOGGLE FUNCTIONALITY =====
    function toggleFAQ(button) {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }
    
    // FAQ keyboard navigation
    document.addEventListener('DOMContentLoaded', function() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(this);
                }
            });
        });
        
        console.log('FAQ functionality initialized successfully! ❓');
    });
    