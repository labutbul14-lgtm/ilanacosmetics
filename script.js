// JavaScript לקוד
document.addEventListener('DOMContentLoaded', function() {
    // הצגת גלריה
    const galleryPreview = document.getElementById('galleryPreview');
    const fullGallery = document.getElementById('fullGallery');
    const galleryCounter = document.getElementById('galleryCounter');
    
    window.showGallery = function() {
        galleryPreview.style.display = 'none';
        fullGallery.style.display = 'grid';
        galleryCounter.style.display = 'block';
        
        // גלילה לגלריה
        fullGallery.scrollIntoView({ behavior: 'smooth' });
    }
    
    // נווט חלקה
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // טופס יצירת קשר
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // כאן יהיה הקוד לשליחת הטופס לשרת
            // לדוגמה: שימוש ב-Fetch API לשליחה לשרת
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // הדמיית שליחה (במציאות צריך לשלוח לשרת)
            console.log('נתוני הטופס:', data);
            
            // הודעת הצלחה
            showNotification('תודה על פנייתך! ניצור איתך קשר בהקדם.', 'success');
            contactForm.reset();
            
            // פתיחת WhatsApp אחרי מילוי הטופס
            setTimeout(() => {
                window.open('https://wa.me/972523549007?text=שלום%20אילנה,%20מילאתי%20טופס%20באתר%20ואשמח%20לתאם%20תור', '_blank');
            }, 1500);
        });
    }
    
    // Modal להצגת תמונות
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            imageModal.style.display = 'block';
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            
            // מניעת גלילה מאחורי המודל
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // סגירת מודל עם Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ניווט סטיקי עם אנימציה
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.12)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
            header.style.padding = '15px 0';
        }
        
        // החלקה של ההדר
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // גלילה למטה - הסתרת הדר
            header.style.transform = 'translateY(-100%)';
        } else {
            // גלילה למעלה - הצגת הדר
            header.style.transform = 'translateY(0)';
        }
        
        header.style.transition = 'transform 0.3s ease, padding 0.3s ease';
        lastScrollTop = scrollTop;
    });
    
    // אנימציה למעבר בין סעיפים
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // עיצוב אנימציה לאלמנטים
    document.querySelectorAll('.service-card, .gallery-item, .contact-detail').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // פונקציה להצגת התראות
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        // עיצוב בסיסי להתראה
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // סגירת ההתראה
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // סגירה אוטומטית לאחר 5 שניות
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // הוספת אנימציות
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .close-notification {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-right: 0;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    // טיימר לטיפ מיוחד
    setTimeout(() => {
        if (!sessionStorage.getItem('tipShown')) {
            showNotification('💡 טיפ: הזמיני תור דרך WhatsApp וקבלי 10% הנחה לטיפול הראשון!', 'success');
            sessionStorage.setItem('tipShown', 'true');
        }
    }, 10000);
    
    // טעינה איטית לתמונות
    if ('loading' in HTMLImageElement.prototype) {
        // הדפדפן תומך ב-lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // פוליפיל ל-lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ניתוח לחיצות על כפתורי WhatsApp
    document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]').forEach(button => {
        button.addEventListener('click', function() {
            // כאן ניתן להוסיף קוד לניתוח סטטיסטיקות (Google Analytics, Facebook Pixel, etc.)
            console.log('לחיצה על WhatsApp:', this.href);
            
            // דוגמה לשליחה ל-Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': this.href
                });
            }
        });
    });
});
