// Tab Functionality (ONLY for course details section)
document.addEventListener('DOMContentLoaded', function() {
    const courseDetailsSection = document.querySelector('.course-details-section');
    if (!courseDetailsSection) return; // Exit if not on a course detail page
    
    const tabButtons = courseDetailsSection.querySelectorAll('.tab-btn');
    const tabContents = courseDetailsSection.querySelectorAll('.tab-content');

    // Tab switching function
    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        const activeButton = courseDetailsSection.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Initialize with first tab active
    if (tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
    
    // Note: Mobile menu, dropdowns, language selector, and other header functionality 
    // are all handled by script.js to avoid conflicts
});

// FAQ Functionality
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = '0';
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = '0';
    }
}
