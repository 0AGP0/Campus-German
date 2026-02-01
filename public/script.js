// ===== GLOBAL FUNCTIONS (Must be defined before DOMContentLoaded) =====

// FAQ Toggle - Global function for onclick handlers
// Must be defined in global scope (not just window) for onclick attributes to work
function toggleFAQ(button) {
    if (!button) return;
    
    const faqItem = button.parentElement;
    if (!faqItem) return;
    
    const answer = faqItem.querySelector('.faq-answer');
    if (!answer) return;
    
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const otherAnswer = item.querySelector('.faq-answer');
        if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
        }
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
    }
}

// Also expose to window for explicit access
window.toggleFAQ = toggleFAQ;

// ===== STICKY SIDEBAR - CLEAN JAVASCRIPT SOLUTION =====
// Simple, working sticky sidebar implementation with hysteresis to prevent flickering

function initStickySidebars() {
    const sidebars = document.querySelectorAll('.article-sidebar, .mission-sidebar');
    
    if (sidebars.length === 0) {
        return;
    }
    
    const topOffset = 120; // Distance from top when sticky
    
    sidebars.forEach((sidebar, index) => {
        // Find parent container
        const parent = sidebar.closest('.article-section, .mission-statement') || 
                      sidebar.closest('section');
        
        if (!parent) {
            return;
        }
        
        // State
        let originalLeft = null;
        let originalWidth = null;
        let isSticky = false;
        let lastScrollY = -1;
        let initialized = false;
        
        // Save original position once
        function saveOriginalPosition() {
            if (initialized) return;
            
            // Ensure sidebar is in normal flow
            const wasFixed = sidebar.style.position === 'fixed';
            if (wasFixed) {
                sidebar.style.position = '';
                sidebar.style.top = '';
                sidebar.style.left = '';
                sidebar.style.width = '';
            }
            
            // Wait for layout
            requestAnimationFrame(() => {
                const rect = sidebar.getBoundingClientRect();
                originalLeft = rect.left;
                originalWidth = rect.width;
                initialized = true;
            });
        }
        
        // Update sticky state
        function updateSticky() {
            // Only on desktop
            if (window.innerWidth <= 1024) {
                if (isSticky) {
                    sidebar.style.removeProperty('position');
                    sidebar.style.removeProperty('top');
                    sidebar.style.removeProperty('left');
                    sidebar.style.removeProperty('width');
                    isSticky = false;
                }
                return;
            }
            
            // Wait for initialization
            if (!initialized || originalLeft === null || originalWidth === null) {
                saveOriginalPosition();
                return;
            }
            
            const scrollY = window.scrollY || window.pageYOffset;
            
            // Throttle: skip if scroll change is too small
            if (lastScrollY >= 0 && Math.abs(scrollY - lastScrollY) < 5) {
                return;
            }
            lastScrollY = scrollY;
            
            // Get parent boundaries
            const parentRect = parent.getBoundingClientRect();
            const parentTop = parentRect.top + scrollY;
            
            // Get parent's actual bottom in document coordinates
            // getBoundingClientRect().bottom gives viewport-relative bottom
            // To get document coordinates: bottom (viewport) + scrollY
            // But this changes as we scroll, so we need a fixed reference
            // Use offsetTop + offsetHeight which gives fixed document position
            const parentOffsetTop = parent.offsetTop;
            const parentOffsetHeight = parent.offsetHeight;
            const parentBottomFromOffset = parentOffsetTop + parentOffsetHeight;
            
            // Also check scrollHeight for full content (includes overflow)
            const parentScrollHeight = parent.scrollHeight;
            const parentBottomFromScroll = parentTop + parentScrollHeight;
            
            // Use offset-based calculation as primary (most reliable)
            // But also consider scrollHeight if content overflows
            const parentBottom = Math.max(parentBottomFromOffset, parentBottomFromScroll);
            
            // Also check for next section to ensure we stop before it
            let nextSection = parent.nextElementSibling;
            if (!nextSection || (!nextSection.classList.contains('article-section') && !nextSection.classList.contains('mission-statement') && nextSection.tagName.toLowerCase() !== 'section')) {
                // Look for next section in document
                const allSections = document.querySelectorAll('section');
                let foundCurrent = false;
                for (let i = 0; i < allSections.length; i++) {
                    if (allSections[i] === parent) {
                        foundCurrent = true;
                    } else if (foundCurrent) {
                        nextSection = allSections[i];
                        break;
                    }
                }
            }
            
            // If next section exists and is before parent bottom, use it as stopping point
            let actualParentBottom = parentBottom;
            let nextTop = null;
            if (nextSection) {
                const nextRect = nextSection.getBoundingClientRect();
                nextTop = nextRect.top + scrollY;
                // Use the earlier of parent bottom or next section top
                actualParentBottom = Math.min(parentBottom, nextTop);
            }
            
            // Get sidebar height
            const sidebarHeight = sidebar.offsetHeight;
            
            // Calculate thresholds
            const stickThreshold = parentTop - topOffset;
            
            // Unstick calculation:
            // When sidebar is fixed, it's positioned at topOffset from viewport top
            // Sidebar's bottom in viewport = topOffset + sidebarHeight
            // We want to unstick when scrolling would make sidebar's bottom go past parent's bottom
            // In document coordinates: scrollY + (topOffset + sidebarHeight) >= actualParentBottom
            // Rearranged: scrollY >= actualParentBottom - topOffset - sidebarHeight
            const unstickThreshold = actualParentBottom - topOffset - sidebarHeight;
            
            // Decision with hysteresis to prevent flickering
            // Priority: unstick > stick > static
            
            // Check if we should unstick
            // Only unstick if threshold is valid and we've scrolled past it
            const shouldUnstick = unstickThreshold > stickThreshold && unstickThreshold > 0 && scrollY >= unstickThreshold;
            
            // Check if we should stick
            const shouldStick = scrollY >= stickThreshold;
            
            if (shouldUnstick) {
                // Unstick: scrolled past parent bottom - make it absolute at parent bottom
                if (isSticky) {
                    sidebar.style.setProperty('position', 'absolute', 'important');
                    sidebar.style.setProperty('bottom', '0', 'important');
                    sidebar.style.setProperty('left', 'auto', 'important');
                    sidebar.style.setProperty('right', '0', 'important');
                    sidebar.style.setProperty('width', originalWidth + 'px', 'important');
                    sidebar.style.setProperty('z-index', '10', 'important');
                    sidebar.style.removeProperty('top');
                    isSticky = false;
                }
            } else if (shouldStick && !shouldUnstick) {
                // Stick: make it fixed at top
                if (!isSticky) {
                    sidebar.style.setProperty('position', 'fixed', 'important');
                    sidebar.style.setProperty('top', topOffset + 'px', 'important');
                    sidebar.style.setProperty('left', originalLeft + 'px', 'important');
                    sidebar.style.setProperty('width', originalWidth + 'px', 'important');
                    sidebar.style.setProperty('z-index', '10', 'important');
                    sidebar.style.removeProperty('bottom');
                    sidebar.style.removeProperty('right');
                    isSticky = true;
                }
            } else if (!shouldStick && isSticky) {
                // Static: scrolled back up - return to normal flow
                sidebar.style.removeProperty('position');
                sidebar.style.removeProperty('top');
                sidebar.style.removeProperty('left');
                sidebar.style.removeProperty('width');
                sidebar.style.removeProperty('z-index');
                sidebar.style.removeProperty('bottom');
                sidebar.style.removeProperty('right');
                isSticky = false;
            }
        }
        
        // Initialize
        function init() {
            // Save original position after layout settles
            setTimeout(() => {
                saveOriginalPosition();
                setTimeout(() => {
                    updateSticky();
                }, 100);
            }, 500);
        }
        
        // Event listeners
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateSticky();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            initialized = false;
            originalLeft = null;
            originalWidth = null;
            saveOriginalPosition();
            setTimeout(updateSticky, 100);
        }, { passive: true });
        
        // Start
        if (document.readyState === 'complete') {
            init();
        } else {
            window.addEventListener('load', init);
            setTimeout(init, 800);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickySidebars);
} else {
    initStickySidebars();
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    // Open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.style.opacity = '0';
            mobileMenuBtn.style.pointerEvents = 'none';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            // Wait for menu to close before showing button
            setTimeout(() => {
                mobileMenuBtn.style.opacity = '';
                mobileMenuBtn.style.pointerEvents = '';
            }, 300);
        }
    }
    
    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Close button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle mobile submenu toggles (both old and new button styles)
    const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle, .mobile-menu-toggle-arrow');
    mobileMenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other submenus
            document.querySelectorAll('.mobile-submenu').forEach(sub => {
                if (sub !== submenu) {
                    sub.classList.remove('active');
                    sub.classList.remove('open');
                }
            });
            
            // Reset all toggle buttons aria-expanded
            document.querySelectorAll('.mobile-menu-toggle, .mobile-menu-toggle-arrow').forEach(t => {
                if (t !== this) {
                    t.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current submenu
            if (submenu) {
                submenu.classList.toggle('active');
                submenu.classList.toggle('open');
                this.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });
}

// Initialize mobile menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// ===== LANGUAGE DROPDOWN (top header only; direct binding + CSS :focus-within fallback) =====
function initTopLangDropdown() {
    var btn = document.getElementById('topLangBtn');
    var dropdown = document.getElementById('topLangDropdown');
    if (!btn || !dropdown) return;
    function setOpen(open) {
        dropdown.classList.toggle('show', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!dropdown.classList.contains('show'));
    }, true);
    document.addEventListener('click', function(e) {
        if (e.target.closest('.top-header-lang')) return;
        if (dropdown.classList.contains('show')) setOpen(false);
    }, true);
}
function initLanguageDropdown() {
    // Top Header: ID veya class ile bul (build’de DOM sırası farklı olabilir)
    var mobileLangBtn = document.getElementById('mobileLangBtn');
    var mobileLangDropdown = document.getElementById('mobileLangDropdown');
    if (mobileLangBtn && mobileLangDropdown) {
        mobileLangBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mobileLangBtn.getAttribute('aria-expanded') === 'true';
            mobileLangDropdown.classList.toggle('show');
            mobileLangBtn.setAttribute('aria-expanded', String(!isExpanded));
        });
        
        // Close mobile dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileLangBtn && mobileLangDropdown && !mobileLangBtn.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
                mobileLangDropdown.classList.remove('show');
                mobileLangBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initTopLangDropdown();
        initLanguageDropdown();
    });
} else {
    initTopLangDropdown();
    initLanguageDropdown();
}

// ===== COURSE TABS (for dropdown menu) =====
function initCourseTabs() {
    const courseTabs = document.querySelectorAll('.course-tab');
    const coursePanels = document.querySelectorAll('.course-tab-panel');
    
    if (courseTabs.length === 0) return;
    
    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active from all tabs and panels
            courseTabs.forEach(t => t.classList.remove('active'));
            coursePanels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Initialize course tabs when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseTabs);
} else {
    initCourseTabs();
}
