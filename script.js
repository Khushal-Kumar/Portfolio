// =============== SMOOTH SCROLLING FOR NAVIGATION ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// =============== BACK-TO-TOP BUTTON FUNCTIONALITY ===============
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '⬆️';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    background-color: #0078D4;
    color: #fff;
    border: none;
    padding: 12px 18px;
    cursor: pointer;
    border-radius: 8px;
    z-index: 1000;
    transition: opacity 0.3s ease;
`;
document.body.appendChild(backToTopBtn);

const handleScroll = () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            backToTopBtn.style.display = 'none';
        }, 300);
    }
};

window.addEventListener('scroll', handleScroll);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============== DYNAMIC YEAR IN FOOTER ===============
document.getElementById('year').textContent = new Date().getFullYear();

// =============== DARK MODE TOGGLE WITH LOCAL STORAGE ===============
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check if dark mode is enabled in local storage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save the mode to local storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});

// =============== RESPONSIVE NAVIGATION TOGGLE ===============
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Close menu when clicking on a link (for mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// =============== SCROLL ANIMATION FOR PROGRESS BARS ===============
const progressBars = document.querySelectorAll(".progress");

const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        if (isInViewport(bar)) {
            const width = bar.getAttribute("data-width");
            bar.style.transition = "width 1.5s ease-in-out";
            bar.style.width = `${width}%`;
        }
    });
};

// Debouncing scroll events for better performance
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateProgressBars, 100);
});

// Initial load
animateProgressBars();

// =============== MODAL FUNCTIONALITY WITH TRANSITIONS ===============
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        modal.style.opacity = "1";
        modal.style.transition = "opacity 0.3s ease-in-out";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}

// Close modals when clicking outside them
window.onclick = (event) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
};
