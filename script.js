// פונקציה להצגת הגלריה המלאה
function showGallery() {
    // הסתר את התצוגה המקדימה
    document.getElementById('galleryPreview').style.display = 'none';
    
    // הצג את הגלריה המלאה
    document.getElementById('fullGallery').classList.add('active');
    
    // הצג את מונה התמונות
    document.getElementById('galleryCounter').classList.add('active');
    
    // גלול לגלריה
    document.getElementById('fullGallery').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // הוסף אירועי לחיצה לתמונות
    setTimeout(addImageClickEvents, 500);
}

// הוסף אירועי לחיצה לכל התמונות
function addImageClickEvents() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            // קבל את מקור התמונה ואת הטקסט החלופי
            let imgSrc = this.src;
            const imgAlt = this.alt || `תמונה ${index + 1} - Ilana Ichie Cosmetics`;
            
            // החלף ל-high quality אם אפשר
            if (imgSrc.includes('i.ibb.co') && !imgSrc.includes('h.jpg') && !imgSrc.includes('h.jpeg') && !imgSrc.includes('h.png')) {
                imgSrc = imgSrc.replace(/\.(jpg|jpeg|png)/, 'h.$1');
            }
            
            // הצג את התמונה במודל
            showImageModal(imgSrc, imgAlt);
        });
        
        // הוסף אפקט hover לתמונות
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// פונקציה להצגת תמונה מוגדלת במודל
function showImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalInfo = document.getElementById('modalInfo');
    
    // הצג את המודל עם אנימציה
    modal.classList.add('active');
    
    // הגדר את מקור התמונה
    modalImg.src = src;
    modalImg.alt = alt;
    
    // הוסף מידע על התמונה
    modalInfo.textContent = alt;
    
    // סגירה בלחיצה על X
    document.querySelector('.close-modal').onclick = function() {
        modal.classList.remove('active');
    }
    
    // סגירה בלחיצה מחוץ לתמונה
    modal.onclick = function(e) {
        if (e.target === modal || e.target.classList.contains('image-modal-content')) {
            modal.classList.remove('active');
        }
    }
    
    // סגירה עם מקש Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    // אפשרות ניווט עם מקשי חצים
    document.addEventListener('keydown', function navigateImages(e) {
        if (!modal.classList.contains('active')) return;
        
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const currentIndex = Array.from(galleryItems).findIndex(img => {
            let imgSrc = img.src;
            if (imgSrc.includes('i.ibb.co') && !imgSrc.includes('h.jpg') && !imgSrc.includes('h.jpeg') && !imgSrc.includes('h.png')) {
                imgSrc = imgSrc.replace(/\.(jpg|jpeg|png)/, 'h.$1');
            }
            return imgSrc === src;
        });
        
        if (e.key === 'ArrowRight' && currentIndex > 0) {
            // תמונה קודמת
            const prevImg = galleryItems[currentIndex - 1];
            let prevSrc = prevImg.src;
            if (prevSrc.includes('i.ibb.co') && !prevSrc.includes('h.jpg') && !prevSrc.includes('h.jpeg') && !prevSrc.includes('h.png')) {
                prevSrc = prevSrc.replace(/\.(jpg|jpeg|png)/, 'h.$1');
            }
            modalImg.src = prevSrc;
            modalImg.alt = prevImg.alt || `תמונה ${currentIndex} - Ilana Ichie Cosmetics`;
            modalInfo.textContent = prevImg.alt || `תמונה ${currentIndex} - Ilana Ichie Cosmetics`;
        }
        
        if (e.key === 'ArrowLeft' && currentIndex < galleryItems.length - 1) {
            // תמונה הבאה
            const nextImg = galleryItems[currentIndex + 1];
            let nextSrc = nextImg.src;
            if (nextSrc.includes('i.ibb.co') && !nextSrc.includes('h.jpg') && !nextSrc.includes('h.jpeg') && !nextSrc.includes('h.png')) {
                nextSrc = nextSrc.replace(/\.(jpg|jpeg|png)/, 'h.$1');
            }
            modalImg.src = nextSrc;
            modalImg.alt = nextImg.alt || `תמונה ${currentIndex + 2} - Ilana Ichie Cosmetics`;
            modalInfo.textContent = nextImg.alt || `תמונה ${currentIndex + 2} - Ilana Ichie Cosmetics`;
        }
    });
}

// טופס יצירת קשר
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // אנימציה של שליחה
    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
    button.disabled = true;
    
    // הדמיית שליחה
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> נשלח בהצלחה!';
        button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// ניווט חלק לכל הקישורים
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        // אם לוחצים על קישור לגלריה והגלריה עוד לא נטענה
        if(targetId === '#gallery') {
            const galleryLoaded = document.getElementById('fullGallery').classList.contains('active');
            if(!galleryLoaded) {
                showGallery();
                return;
            }
        }
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// אפקט scroll לכותרת
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// WhatsApp click tracking
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp clicked from: ' + this.closest('section')?.id || 'unknown');
    });
});

// טען אוטומטית את אירועי התמונות כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    // המתן שהדף יטען לחלוטין
    setTimeout(() => {
        addImageClickEvents();
    }, 1000);
    
    // הוסף טעינה איטית לתמונות
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});