const titles = [
    "Human Being","Web Developer","Solopreneur","Problem Solver","Indie Maker"
    
];

let currentIndex = 0;
const textElement = document.querySelector('.animated-text');

function animateText() {
    textElement.style.opacity = '0';
    
    setTimeout(() => {
        textElement.textContent = titles[currentIndex];
        
        textElement.style.opacity = '1';
        
        currentIndex = (currentIndex + 1) % titles.length;
    }, 500); 
}

textElement.textContent = titles[0];

setInterval(animateText, 2000);

document.addEventListener('DOMContentLoaded', function() {
    const typeButtons = document.querySelectorAll('.type-btn');
    const projectContainers = document.querySelectorAll('.projects-container');
    const sideProjectsGrid = document.querySelector('#side-projects .projects-grid');
    const prevBtn = document.querySelector('#side-projects .prev-btn');
    const nextBtn = document.querySelector('#side-projects .next-btn');
    const totalProjects = document.querySelectorAll('#side-projects .project-card').length;
    
    let currentProject = 0;

    function updateButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.classList.toggle('disabled', currentProject === 0);
            nextBtn.classList.toggle('disabled', currentProject === totalProjects - 1);
        }
    }

    function scrollToProject(index) {
        currentProject = index;
        const scrollAmount = -100 * currentProject;
        sideProjectsGrid.style.transform = `translateX(${scrollAmount}%)`;
        updateButtons();
    }

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetType = button.dataset.type;
            projectContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === targetType) {
                    container.classList.add('active');
                    if (targetType === 'side-projects') {
                        currentProject = 0;
                        scrollToProject(0);
                    }
                }
            });
        });
    });

    if (prevBtn && nextBtn) {
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
    }

    updateButtons();
    initThemeToggle();

    const spaceship = document.querySelector('.spaceship-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let spaceshipX = 0;
    let spaceshipY = 0;
    let speed = 0.1; 

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const dx = mouseX - spaceshipX;
        const dy = mouseY - spaceshipY;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        spaceship.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${angle}deg)`;
    });

    function animate() {
        spaceshipX += (mouseX - spaceshipX) * speed;
        spaceshipY += (mouseY - spaceshipY) * speed;
        
        requestAnimationFrame(animate);
    }
    animate();

    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        document.body.appendChild(starsContainer);

        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            starsContainer.appendChild(star);
        }
    }

    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        
        const existingStars = document.querySelector('.stars-container');
        if (theme === 'dark' && !existingStars) {
            createStars();
        } else if (theme === 'light' && existingStars) {
            existingStars.remove();
        }

        if (theme === 'light') {
            setInterval(createSandParticles, 2000);
        }
    }

    function createMegaShootingStar() {
        if (document.documentElement.getAttribute('data-theme') !== 'dark') return;

        const star = document.createElement('div');
        star.className = 'mega-shooting-star';
        
        const startPos = Math.random() * 30;
        star.style.left = `${startPos}%`;
        star.style.top = `${startPos / 2}%`;
        
        const flash = document.createElement('div');
        flash.className = 'flash-overlay';
        
        document.body.appendChild(star);
        document.body.appendChild(flash);

        star.style.animation = 'megaShoot 1s ease-out forwards';

        setTimeout(() => {
            star.remove();
            flash.remove();
        }, 1000);
    }

    setInterval(createMegaShootingStar, 100000); //the more zeros causes the delay, best

    let scrollTimeout;
    document.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            createMegaShootingStar();
        }, 100); 
    });

    // station type navigation
    document.addEventListener('keydown', function(e) {
        if (!(e.ctrlKey || e.metaKey) || document.documentElement.getAttribute('data-theme') !== 'dark') return;

        switch(e.key.toLowerCase()) {
            case 'g':
                e.preventDefault();
                window.open('https://github.com/Adong-o', '_blank');
                break;
            case 'x':
                e.preventDefault();
                window.open('https://twitter.com/AdongoJakes', '_blank');
                break;
            case 'i':
                e.preventDefault();
                window.open('https://www.instagram.com/lord.adongo', '_blank');
                break;
            case 'm':
                e.preventDefault();
                window.open('mailto:adongojakes@gmail.com', '_blank');
                break;
            case 'b':
                e.preventDefault();
                const audioToggle = document.querySelector('.space-audio-toggle');
                audioToggle.click();
                break;
            case 'q':
                e.preventDefault();
                const themeToggle = document.querySelector('.theme-toggle');
                themeToggle.click(); // This will switch to light mode
                break;
        }
    });

    // Add visual feedback when keyboard shortcuts are used
    document.addEventListener('keydown', function(e) {
        if (!e.ctrlKey || document.documentElement.getAttribute('data-theme') !== 'dark') return;
        
        const key = e.key.toLowerCase();
        const commandItem = document.querySelector(`.command-item[data-key="${key}"]`);
        
        if (commandItem) {
            commandItem.classList.add('active');
            setTimeout(() => commandItem.classList.remove('active'), 500);
        }
    });

    // Add minimize/maximize functionality
    const stationToggle = document.createElement('div');
    stationToggle.className = 'station-toggle';
    stationToggle.innerHTML = '<i class="fas fa-minus"></i>';
    document.querySelector('.space-station').appendChild(stationToggle);

    stationToggle.addEventListener('click', () => {
        const station = document.querySelector('.space-station');
        station.classList.toggle('minimized');
        stationToggle.innerHTML = station.classList.contains('minimized') ? 
            '<i class="fas fa-plus"></i>' : 
            '<i class="fas fa-minus"></i>';
    });

    function initSpaceFeatures() {
        const spaceAmbience = document.getElementById('spaceAmbience');
        const commandSound = document.getElementById('commandSound');
        const audioToggle = document.querySelector('.space-audio-toggle');
        let audioEnabled = false;

        // Configure space ambience
        spaceAmbience.volume = 0.5;
        
        // Audio toggle with fade effect
        audioToggle.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            audioToggle.innerHTML = audioEnabled ? 
                '<i class="fas fa-volume-up"></i>' : 
                '<i class="fas fa-volume-mute"></i>';
            
            if (audioEnabled) {
                spaceAmbience.play();
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.5) {
                        volume += 0.02;
                        spaceAmbience.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 50);
            } else {
                let volume = spaceAmbience.volume;
                const fadeOut = setInterval(() => {
                    if (volume > 0) {
                        volume -= 0.02;
                        spaceAmbience.volume = volume;
                    } else {
                        spaceAmbience.pause();
                        clearInterval(fadeOut);
                    }
                }, 50);
            }
        });

        commandSound.volume = 0.9;


        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && audioEnabled && 
                ['g', 'x', 'i', 'm', 'b'].includes(e.key.toLowerCase())) {
                commandSound.currentTime = 0;
                commandSound.play();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initSpaceFeatures();
    });


    //from here the code was made by cursor agent for the sand/desert effect that i ended up not using, went matrix instead.
    function createSandEffect(element, event) {
        if (document.documentElement.getAttribute('data-theme') !== 'light') return;

        const rect = element.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'sand-particle';

            // Set initial position at mouse point
            particle.style.left = `${mouseX}px`;
            particle.style.top = `${mouseY}px`;

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 30;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            // Animate the particle
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 0.8
                },
                {
                    transform: `translate(${vx}px, ${vy}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 500 + 500,
                easing: 'ease-out'
            });

            element.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Add event listeners when DOM is loaded
    const elements = document.querySelectorAll('h1, h2, h3, .profile-picture');
    
    elements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            createSandEffect(element, e);
        });
    });

    // Add background to navbar when scrolling
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbarCollapse.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && 
            !navbarCollapse.contains(e.target) && 
            navbarCollapse.classList.contains('show')) {
            menuToggle.classList.remove('active');
            navbarCollapse.classList.remove('show');
        }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbarCollapse.classList.remove('show');
        });
    });
});

// Projects filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Projects tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
});

// Projects category switching
document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCategories = document.querySelectorAll('.project-category');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all categories
            projectCategories.forEach(category => {
                category.classList.remove('active');
            });

            // Show selected category
            const targetCategory = document.getElementById(btn.dataset.category);
            setTimeout(() => {
                targetCategory.classList.add('active');
            }, 50);
        });
    });
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

function createDesertEffects() {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        // Create mirage effect
        const mirage = document.createElement('div');
        mirage.className = 'mirage';
        document.body.appendChild(mirage);

        // Create dust storm effect
        const dustStorm = document.createElement('div');
        dustStorm.className = 'dust-storm';
        document.body.appendChild(dustStorm);

        // Enhanced sand particles
        createSandParticles();
    }
}

function createSandParticles() {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'sand-particle';
            
            // Random size between 1 and 4 pixels
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random starting position
            particle.style.left = `${Math.random() * -20}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            
            // Random animation duration and delay
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 5;
            particle.style.animation = `sandFloat ${duration}s ${delay}s infinite linear`;
            
            document.body.appendChild(particle);
            
            // Clean up
            setTimeout(() => particle.remove(), (duration + delay) * 1000);
        }
    }
}

// Update theme toggle to include desert effects
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Remove existing effects
    document.querySelectorAll('.mirage, .dust-storm, .sand-particle').forEach(el => el.remove());
    
    // Add effects for light theme
    if (theme === 'light') {
        createDesertEffects();
        setInterval(createSandParticles, 2000);
    }
}

// Typewriter effect for text elements
function initTypewriterEffects() {
    const textElements = document.querySelectorAll('.typing-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('typing-effect');
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, Math.random() * 100 + 50);
            } else {
                element.classList.remove('typing-effect');
            }
        };
        
        typeChar();
    });
}

// Matrix background effect
function createMatrixBackground() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    document.body.appendChild(matrixBg);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const character = document.createElement('span');
        character.className = 'matrix-character';
        character.style.left = `${i * 20}px`;
        character.style.animationDelay = `${Math.random() * 2}s`;
        character.style.animationDuration = `${Math.random() * 3 + 2}s`;
        character.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixBg.appendChild(character);
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTypewriterEffects();
    createMatrixBackground();
});

// Update HTML elements to use the typing effect
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('.centered-content h1');
    mainTitle.classList.add('typing-text');
});

//updates for this portfolio

//  - restyle the projects section to look more like agency projects showcase
//  - add a 2 SpeechRecognitionResult, what i do and the pricebox feature for what i build and the prices with a button to reach out to me
//  - meta tags with the relevant titles for seo for google outreach. 
//  - start doing blogs in this website after purchasing domains. 
//  - buy a domain and subscription to lovable maybe this year.
