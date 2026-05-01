//#region Sci-Fi Portfolio JavaScript

// Sci-Fi Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initParticleSystem();
    initFormHandling();
    initSkillAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });

    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .about-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Particle system for background effects
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Create initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Skill bar animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.cyber-form');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const visitorName = formData.get('name')?.toString().trim() || 'Website Visitor';
            const visitorEmail = formData.get('email')?.toString().trim() || 'No email provided';
            const visitorMessage = formData.get('message')?.toString().trim() || 'No message provided';

            const recipient = (window.portfolioData && window.portfolioData.email) ? window.portfolioData.email : 'rachitbhatt2000@gmail.com';
            const subject = `Portfolio Contact from ${visitorName}`;
            const emailBody = `Name: ${visitorName}\nEmail: ${visitorEmail}\n\nMessage:\n${visitorMessage}\n\nSent from the portfolio contact form.`;
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;

            // Attempt to open the user's email client with a prefilled email.
            const anchor = document.createElement('a');
            anchor.href = mailtoLink;
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);

            const clipboardPayload = `To: ${recipient}\nSubject: ${subject}\n\n${emailBody}`;
            let copySuccess = false;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(clipboardPayload);
                    copySuccess = true;
                } catch (error) {
                    console.warn('Clipboard copy failed:', error);
                }
            }

            setTimeout(() => {
                submitBtn.textContent = 'TRANSMITTED!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
                submitBtn.style.color = '#000';

                const message = copySuccess
                    ? 'If your email client did not open, the email contents have been copied to your clipboard so you can paste them into your mail app.'
                    : 'Your email client should open with the message prefilled. If it does not, please copy the contact details manually.';
                alert(message);

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    const text = titleElement.textContent;
    titleElement.textContent = '';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

// Matrix rain effect (optional advanced feature)
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-3';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matrixArray = matrix.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize advanced effects if desired
// initTypingEffect(); // Uncomment for typing effect
// initMatrixRain(); // Uncomment for matrix rain background

//#endregion

// Portfolio data embedded directly (no CORS issues!)
// NOTE: Data is now in data.js for better file organization
// The portfolioData constant is available globally from data.js

// Function to load and display portfolio data
function loadPortfolioData() {
    try {
        // Use embedded data instead of fetch
        const data = portfolioData;
        console.log('Portfolio data loaded successfully:', data);

        // Update the DOM with portfolio data
        updatePortfolioWithData(data);

        return data;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        showPortfolioError();
        return null;
    }
}

// Function to update portfolio with data
function updatePortfolioWithData(data) {
    // Update basic info
    const nameElement = document.getElementById('name');
    if (nameElement) nameElement.textContent = data.name || '';

    const locationElement = document.getElementById('location');
    if (locationElement) locationElement.textContent = data.location || '';

    const emailElement = document.getElementById('email');
    if (emailElement) emailElement.textContent = data.email || '';

    const phoneElement = document.getElementById('phone');
    if (phoneElement) phoneElement.textContent = data.phone || '';

    const linkedinElement = document.getElementById('linkedin');
    if (linkedinElement) {
        linkedinElement.textContent = data.linkedin || '';
        linkedinElement.href = data.linkedin || '#';
    }

    const githubElement = document.getElementById('github');
    if (githubElement) {
        githubElement.textContent = data.github || '';
        githubElement.href = data.github || '#';
    }

    // Update title and summary
    const titleElement = document.querySelector('.hero-title');
    if (titleElement) titleElement.textContent = data.title || '';

    const summaryElement = document.querySelector('.hero-subtitle');
    if (summaryElement) summaryElement.textContent = data.summary || '';

    // Update skills
    updateSkillsSection(data.technicalSkills);

    // Update experience
    updateExperienceSection(data.experience);

    // Update projects
    updateProjectsSection(data.projects);

    // Update education
    updateEducationSection(data.education);

    console.log('Portfolio updated with data');
}

// Function to update skills section
function updateSkillsSection(skills) {
    if (!skills) return;

    // Update languages
    const languagesList = document.querySelector('.languages-list');
    if (languagesList && skills.languages) {
        languagesList.innerHTML = skills.languages.map(lang => `<li>${lang}</li>`).join('');
    }

    // Update frameworks
    const frameworksList = document.querySelector('.frameworks-list');
    if (frameworksList && skills.frameworks) {
        frameworksList.innerHTML = skills.frameworks.map(fw => `<li>${fw}</li>`).join('');
    }

    // Update tools
    const toolsList = document.querySelector('.tools-list');
    if (toolsList && skills.tools) {
        toolsList.innerHTML = skills.tools.map(tool => `<li>${tool}</li>`).join('');
    }

    // Update processes
    const processesList = document.querySelector('.processes-list');
    if (processesList && skills.processes) {
        processesList.innerHTML = skills.processes.map(process => `<li>${process}</li>`).join('');
    }
}

// Function to update experience section
function updateExperienceSection(experience) {
    if (!experience) return;

    const experienceContainer = document.querySelector('.experience-list');
    if (experienceContainer) {
        experienceContainer.innerHTML = experience.map(exp => `
            <div class="experience-item">
                <h3>${exp.position}</h3>
                <h4>${exp.company}${exp.location ? ` - ${exp.location}` : ''}</h4>
                <p class="date">${exp.startDate} - ${exp.endDate}</p>
                <ul>
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }
}

// Function to update projects section
function updateProjectsSection(projects) {
    if (!projects) return;

    const projectsContainer = document.querySelector('.projects-grid');
    if (projectsContainer) {
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p class="project-duration">${project.duration}</p>
                <p class="project-tech">${project.techStack}</p>
                <ul class="project-features">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">View on GitHub</a>` : ''}
            </div>
        `).join('');
    }
}

// Function to update education section
function updateEducationSection(education) {
    if (!education) return;

    const educationContainer = document.querySelector('.education-list');
    if (educationContainer) {
        educationContainer.innerHTML = education.map(edu => `
            <div class="education-item">
                <h3>${edu.degree}</h3>
                <h4>${edu.institution}</h4>
                <p class="date">${edu.startDate} - ${edu.endDate}</p>
            </div>
        `).join('');
    }
}

// Function to show error message
function showPortfolioError() {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 1000;
        max-width: 300px;
    `;
    errorDiv.innerHTML = `
        <strong>Portfolio Error:</strong><br>
        Unable to load portfolio data.<br>
        <small>Try opening index.html directly in your browser instead of using a file:// URL.</small>
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load portfolio data immediately (no fetch needed!)
    loadPortfolioData();
});