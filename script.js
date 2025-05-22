      // Update tahun di footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Smooth scrolling untuk anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Efek scroll untuk header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 0);
        });

        // Form submission dengan Telegram
        document.getElementById('telegramForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const notification = document.getElementById('notification');
            const formData = new FormData(this);
            
            // Ubah tombol submit menjadi loading
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            fetch('send_to_telegram.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Tampilkan notifikasi
                notification.textContent = data.message;
                notification.style.display = 'block';
                
                if (data.message.includes('Terima kasih')) {
                    notification.className = 'notification';
                    this.reset();
                } else {
                    notification.className = 'notification error';
                }
                
                // Sembunyikan notifikasi setelah 5 detik
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                notification.textContent = 'Terjadi kesalahan. Silakan coba lagi nanti.';
                notification.className = 'notification error';
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
        
        // Tambahkan di JavaScript
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Fungsi untuk mengecek elemen yang terlihat di viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Fungsi untuk menangani scroll animasi
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.timeline-item, .fade-in');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Event listeners
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Scroll Animation Trigger
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
    
    // Add active class to hero section immediately
    document.querySelector('#home').classList.add('active');
});