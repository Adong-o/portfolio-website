const titles = [
    "Human Being","Web Developer","Front-End Developer","Problem Solver","Entrepreneur","Indie Maker"
    
];

let currentIndex = 0;
const textElement = document.querySelector('.animated-text');

function animateText() {
    // Fade out
    textElement.style.opacity = '0';
    
    setTimeout(() => {
        // Change text
        textElement.textContent = titles[currentIndex];
        
        // Fade in
        textElement.style.opacity = '1';
        
        // Update index
        currentIndex = (currentIndex + 1) % titles.length;
    }, 500); // Half of the total animation time
}

// Initial text
textElement.textContent = titles[0];

// Start animation cycle
setInterval(animateText, 2000);

document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const totalProjects = document.querySelectorAll('.project-card').length;
    
    let currentProject = 0;

    function updateButtons() {
        prevBtn.classList.toggle('disabled', currentProject === 0);
        nextBtn.classList.toggle('disabled', currentProject === totalProjects - 1);
    }

    function scrollToProject(index) {
        currentProject = index;
        const scrollAmount = -100 * currentProject;
        projectsGrid.style.transform = `translateX(${scrollAmount}%)`;
        updateButtons();
    }

    prevBtn.addEventListener('click', () => {
        if (currentProject > 0) {
            scrollToProject(currentProject - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentProject < totalProjects - 1) {
            scrollToProject(currentProject + 1);
        }
    });

    // Initial button state
    updateButtons();

    initThemeToggle();
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.style.backgroundColor = savedTheme === 'dark' ? '#1a1a1a' : '#f0f0f0';
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.style.backgroundColor = newTheme === 'dark' ? '#1a1a1a' : '#f0f0f0';
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function openModal() {
    document.getElementById('resumeModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    document.getElementById('resumeModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('resumeModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
