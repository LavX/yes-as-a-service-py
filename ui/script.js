// API Configuration - use relative URL for same-origin requests
const API_BASE_URL = '/no';

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const triggerBtn = document.getElementById('triggerBtn');
const resultCard = document.getElementById('resultCard');
const resultText = document.getElementById('resultText');
const resultPlaceholder = document.querySelector('.result-placeholder');
const copyBtn = document.getElementById('copyBtn');
const notificationContainer = document.getElementById('notificationContainer');
const copyCodeBtns = document.querySelectorAll('.copy-code-btn');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';
    
    notification.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    lucide.createIcons();
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Accordion functionality
function initAccordion() {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            
            // Close all other accordions
            accordionHeaders.forEach(h => {
                if (h !== header) {
                    h.parentElement.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Copy to clipboard helper
async function copyText(text) {
    if (!navigator.clipboard) {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        return false;
    }
}

// Copy to clipboard
async function copyToClipboard() {
    const text = resultText.textContent;
    const success = await copyText(text);
    if (success) {
        showNotification('Copied to clipboard!', 'success');
    } else {
        showNotification('Failed to copy', 'error');
    }
}

// Copy code snippets
copyCodeBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const code = btn.dataset.code;
        const success = await copyText(code);
        if (success) {
            showNotification('Code copied!', 'success');
        } else {
            showNotification('Failed to copy', 'error');
        }
    });
});

// API Call
async function fetchReason() {
    const btnContent = triggerBtn.querySelector('.btn-content');
    const originalHTML = btnContent.innerHTML;
    
    try {
        // Update UI state
        triggerBtn.disabled = true;
        btnContent.innerHTML = '<span class="loading"></span> Loading...';
        
        // Make API request
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display result
        displayResult(data.reason);
        showNotification('Success!', 'success');
        
    } catch (error) {
        console.error('Error fetching reason:', error);
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        // Reset button state
        triggerBtn.disabled = false;
        btnContent.innerHTML = originalHTML;
    }
}

function displayResult(reason) {
    resultPlaceholder.style.display = 'none';
    resultText.textContent = reason;
    resultText.classList.add('show');
    copyBtn.style.display = 'flex';
    
    // Add a subtle animation
    resultText.style.animation = 'none';
    resultText.offsetHeight; // Trigger reflow
    resultText.style.animation = 'fadeInUp 0.5s ease-out';
    
    // Add glow effect to result card
    resultCard.style.boxShadow = 'var(--shadow-xl)';
    setTimeout(() => {
        resultCard.style.boxShadow = 'var(--shadow-lg)';
    }, 300);
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
triggerBtn.addEventListener('click', fetchReason);
copyBtn.addEventListener('click', copyToClipboard);

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === triggerBtn) {
        fetchReason();
    }
});

// Initialize
initTheme();
initAccordion();
lucide.createIcons();

// Add fade-in animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
