// Form Security Utilities

// Rate limiting - localStorage based
export function checkRateLimit(formType: string, maxRequests: number = 5, windowMinutes: number = 1): boolean {
    const key = `form_rate_limit_${formType}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    
    const stored = localStorage.getItem(key);
    if (!stored) {
        localStorage.setItem(key, JSON.stringify([now]));
        return true;
    }
    
    const requests: number[] = JSON.parse(stored);
    const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);
    
    if (recentRequests.length >= maxRequests) {
        return false;
    }
    
    recentRequests.push(now);
    localStorage.setItem(key, JSON.stringify(recentRequests));
    return true;
}

// Input sanitization - XSS protection
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// Sanitize object recursively
export function sanitizeObject(obj: any): any {
    if (typeof obj === 'string') {
        return sanitizeInput(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    } else if (obj && typeof obj === 'object') {
        const sanitized: any = {};
        for (const key in obj) {
            sanitized[key] = sanitizeObject(obj[key]);
        }
        return sanitized;
    }
    return obj;
}

// Validate email format
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format (basic)
export function validatePhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

// Check honeypot field
export function checkHoneypot(form: HTMLFormElement, honeypotFieldName: string = 'website'): boolean {
    const honeypot = form.querySelector(`[name="${honeypotFieldName}"]`) as HTMLInputElement;
    if (honeypot && honeypot.value) {
        return false; // Bot detected
    }
    return true;
}

// Initialize reCAPTCHA v3
export function initRecaptcha(siteKey: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !(window as any).grecaptcha) {
            // Load reCAPTCHA script if not loaded
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                executeRecaptcha(siteKey).then(resolve).catch(reject);
            };
            script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
            document.head.appendChild(script);
        } else {
            executeRecaptcha(siteKey).then(resolve).catch(reject);
        }
    });
}

// Execute reCAPTCHA v3
function executeRecaptcha(siteKey: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            (window as any).grecaptcha.ready(() => {
                (window as any).grecaptcha.execute(siteKey, { action: 'submit' })
                    .then((token: string) => resolve(token))
                    .catch((error: any) => reject(error));
            });
        } catch (error) {
            reject(error);
        }
    });
}



