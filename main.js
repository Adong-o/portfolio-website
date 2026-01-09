document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileBtn) mobileBtn.classList.remove('active');
            if (nav) nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Experience Modal Logic
    const experienceBtn = document.getElementById('view-experience-btn');
    const modal = document.getElementById('experience-modal');
    const closeModal = document.querySelector('.close-modal');

    if (experienceBtn && modal) {
        experienceBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    // Close on click outside
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
    // Interactive Projects Logic
    const interactiveArea = document.querySelector('.interactive-area');
    const draggables = document.querySelectorAll('.draggable-item');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const infoTags = document.getElementById('info-tags');
    const infoLink = document.getElementById('info-link');

    if (interactiveArea && draggables.length > 0) {

        // Initial positions (scattered)
        const positions = [
            { top: '15%', left: '15%' },
            { top: '45%', left: '55%' },
            { top: '10%', left: '60%' },
            { top: '55%', left: '10%' }
        ];

        draggables.forEach((el, index) => {
            // Set initial position
            if (positions[index]) {
                el.style.top = positions[index].top;
                el.style.left = positions[index].left;
            } else {
                el.style.top = (Math.random() * 50 + 10) + '%';
                el.style.left = (Math.random() * 60 + 5) + '%';
            }

            // Init draggable
            makeDraggable(el);
        });

        function makeDraggable(element) {
            let isDragging = false;
            let startX, startY, initialLeft, initialTop;
            let hasMoved = false;

            // Mouse Down
            element.addEventListener('mousedown', dragStart);
            element.addEventListener('touchstart', dragStart, { passive: false });

            function dragStart(e) {
                if (e.type === 'touchstart') {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                } else {
                    startX = e.clientX;
                    startY = e.clientY;
                }

                initialLeft = element.offsetLeft;
                initialTop = element.offsetTop;

                isDragging = true;
                hasMoved = false;

                // Bring to front
                draggables.forEach(d => d.style.zIndex = 10);
                element.style.zIndex = 100;
                element.classList.add('is-dragging');

                // Attach global move/up listeners
                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', drag, { passive: false });
                document.addEventListener('mouseup', dragEnd);
                document.addEventListener('touchend', dragEnd);
            }

            function drag(e) {
                if (!isDragging) return;
                // Only prevent default if we are actually dragging
                e.preventDefault();
                hasMoved = true;

                let clientX, clientY;
                if (e.type === 'touchmove') {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }

                const dx = clientX - startX;
                const dy = clientY - startY;

                let newLeft = initialLeft + dx;
                let newTop = initialTop + dy;

                // Boundaries
                const parentRect = interactiveArea.getBoundingClientRect();
                const maxLeft = parentRect.width - element.offsetWidth;
                const maxTop = parentRect.height - element.offsetHeight;

                newLeft = Math.max(0, Math.min(newLeft, maxLeft));
                newTop = Math.max(0, Math.min(newTop, maxTop));

                element.style.left = newLeft + 'px';
                element.style.top = newTop + 'px';
            }

            function dragEnd() {
                if (!isDragging) return;
                isDragging = false;
                element.classList.remove('is-dragging');

                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', dragEnd);
                document.removeEventListener('touchend', dragEnd);

                if (!hasMoved) {
                    updateProjectInfo(element);
                } else {
                    // Update info on drag end too? Or just on click? 
                    // Let's update on drag end as well so they see what they moved
                    updateProjectInfo(element);
                }
            }
        }

        function updateProjectInfo(element) {
            const dataDiv = element.querySelector('.project-data');
            if (dataDiv) {
                const title = dataDiv.querySelector('[data-key="title"]').innerText;
                const desc = dataDiv.querySelector('[data-key="desc"]').innerText;
                const tagsJson = dataDiv.querySelector('[data-key="tags"]').innerText;
                const link = dataDiv.querySelector('[data-key="link"]').innerText;

                // Animate change
                const infoContent = document.querySelector('.info-content');
                infoContent.style.opacity = 0;

                setTimeout(() => {
                    infoTitle.textContent = title;
                    infoDesc.textContent = desc;
                    infoLink.href = link;
                    infoLink.classList.remove('hidden');

                    try {
                        const tags = JSON.parse(tagsJson);
                        infoTags.style.display = 'flex';
                        infoTags.innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');
                    } catch (err) {
                        infoTags.innerHTML = '';
                    }

                    infoContent.style.opacity = 1;
                }, 200);
            }
        }
    }
});
