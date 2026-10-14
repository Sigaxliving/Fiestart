// --- BACKGROUND CANVAS (DYNAMIC PARTICLES) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const particleCount = window.innerWidth < 768 ? 40 : 90;
const connectionDistance = 120;
let mouse = {
    x: null,
    y: null,
    radius: 150
};

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Capture mouse movement
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Clear mouse coordinates when leaving window
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? '#a855f7' : '#06b6d4';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        // Mouse attraction/push effect (micro-interaction)
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                // Gently drift towards/away from mouse
                const force = (mouse.radius - distance) / mouse.radius;
                this.x -= dx / distance * force * 0.6;
                this.y -= dy / distance * force * 0.6;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles array
function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

// Check distances and draw connecting lines
function drawConnections() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                // Calculate opacity based on distance
                let opacity = (1 - (distance / connectionDistance)) * 0.15;
                
                // Draw line with gradient or cyan/purple blend
                ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

        // Also connect to mouse if close
        if (mouse.x !== null && mouse.y !== null) {
            let dx = particlesArray[a].x - mouse.x;
            let dy = particlesArray[a].y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                let opacity = (1 - (distance / mouse.radius)) * 0.25;
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`; // Cyan connector to mouse
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle glowing background radial gradient centered on cursor (if active)
    if (mouse.x !== null && mouse.y !== null) {
        let radialGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 250);
        radialGrad.addColorStop(0, 'rgba(168, 85, 247, 0.04)');
        radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    drawConnections();
    requestAnimationFrame(animate);
}

// Start particles
initParticles();
animate();


// --- TRANSITION LOGIC ---
const heroSection = document.getElementById('hero-section');
const quoteSection = document.getElementById('quote-section');
const btnStart = document.getElementById('btn-start');
const btnCloseForm = document.getElementById('btn-close-form');
const btnRestart = document.getElementById('btn-restart');
const interactiveForm = document.getElementById('interactive-form');
const successScreen = document.getElementById('success-screen');

// Open form
btnStart.addEventListener('click', () => {
    heroSection.classList.remove('active');
    setTimeout(() => {
        quoteSection.classList.add('active');
        updateProgressBar();
    }, 400); // Matches CSS transition duration
});

// Close form (Return to Hero)
function returnToHome() {
    quoteSection.classList.remove('active');
    setTimeout(() => {
        heroSection.classList.add('active');
        resetFormState();
    }, 400);
}

btnCloseForm.addEventListener('click', returnToHome);
btnRestart.addEventListener('click', returnToHome);


// --- MULTI-STEP FORM & CALCULATOR LOGIC ---
let currentStep = 1;
const totalSteps = 4;

const steps = document.querySelectorAll('.form-step');
const stepDots = document.querySelectorAll('.step-dot');
const progressBar = document.getElementById('progress-bar');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// Inputs & Labels
const durationSlider = document.getElementById('duration-slider');
const durationValLabel = document.getElementById('duration-val');

// Event listener for duration slider value display
durationSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    durationValLabel.textContent = val == 1 ? '1 minuto' : `${val} minutos`;
    calculatePrice();
});

// Calculate price whenever any input changes
interactiveForm.addEventListener('change', calculatePrice);

function getSelectedRadioValue(name) {
    const element = interactiveForm.querySelector(`input[name="${name}"]:checked`);
    return element ? element.value : null;
}

// Dynamic Price Calculation
function calculatePrice() {
    // Safety check in case pricing table is not loaded
    if (typeof VIDEO_PRICING_TABLE === 'undefined') {
        console.error("Tabulador de precios (VIDEO_PRICING_TABLE) no encontrado.");
        return;
    }

    let price = 0;
    
    // 1. Base price by video category
    const videoType = getSelectedRadioValue('video_type'); // animations, intros, editions, loops
    const categoryConfig = VIDEO_PRICING_TABLE.categories[videoType] || VIDEO_PRICING_TABLE.categories.editions;
    const basePrice = categoryConfig.basePrice;
    const typeName = categoryConfig.name;

    // 2. Duration factor
    const duration = parseInt(durationSlider.value);
    const perMinuteCost = categoryConfig.perMinuteCost;
    const durationCost = (duration - 1) * perMinuteCost;
    
    price += basePrice + durationCost;

    // 3. Format / Aspect Ratio details for summary
    const format = getSelectedRadioValue('format');
    let formatName = 'Vertical (9:16)';
    if (format === 'horizontal') formatName = 'Horizontal (16:9)';
    if (format === 'square') formatName = 'Cuadrado (1:1)';

    // 4. Priority multiplier
    const priority = getSelectedRadioValue('priority');
    const priorityMultiplier = VIDEO_PRICING_TABLE.priorityMultipliers[priority] || 1.0;
    let deliveryName = 'Estándar (3-5 días)';
    if (priority === 'express') deliveryName = 'Exprés (24-48h)';
    if (priority === 'instant') deliveryName = 'Ultra Rápido (Mismo día)';

    price *= priorityMultiplier;

    // 5. Traditional Add-ons
    const addons = interactiveForm.querySelectorAll('input[name="addons"]:checked');
    let addonsCost = 0;
    addons.forEach(addon => {
        const cost = VIDEO_PRICING_TABLE.addons[addon.value];
        if (cost) addonsCost += cost;
    });
    price += addonsCost;

    // 6. Subtitles specifications
    const subtitlesChecked = interactiveForm.querySelector('input[name="spec_subtitles"]').checked;
    let subtitlesCost = 0;
    if (subtitlesChecked) {
        subtitlesCost = VIDEO_PRICING_TABLE.specifications.subtitles;
    }
    price += subtitlesCost;

    // 7. Brand Identity specifications
    const brandIdentity = getSelectedRadioValue('brand_identity');
    const identityCost = VIDEO_PRICING_TABLE.specifications.brandIdentity[brandIdentity] || 0;
    price += identityCost;

    // 8. Raw Footage specifications
    const rawFootage = getSelectedRadioValue('raw_footage');
    const footageCost = VIDEO_PRICING_TABLE.specifications.rawFootage[rawFootage] || 0;
    price += footageCost;

    // Round final price
    const finalPrice = Math.round(price);

    // Update Summary Screen UI Elements
    document.getElementById('summary-type-val').textContent = typeName;
    document.getElementById('summary-specs-val').textContent = `${duration} min / ${formatName}`;
    document.getElementById('summary-delivery-val').textContent = deliveryName;
    
    // Subtitles display
    document.getElementById('summary-subtitles-val').textContent = subtitlesChecked ? 'Sí (+30 USD)' : 'No';
    
    // Brand identity display
    const identityText = brandIdentity === 'yes' ? 'Tengo identidad' : 'Diseñar identidad (+100 USD)';
    document.getElementById('summary-identity-val').textContent = identityText;

    // Raw footage display
    const footageText = rawFootage === 'yes' ? 'Tengo material grabado' : 'Generar material (+200 USD)';
    document.getElementById('summary-footage-val').textContent = footageText;

    // Total Price
    document.getElementById('summary-total-val').textContent = `$${finalPrice} USD`;
}

// Progress Bar & Navigation handler
function updateProgressBar() {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${percentage}%`;

    stepDots.forEach((dot, index) => {
        if (index + 1 < currentStep) {
            dot.classList.add('completed');
            dot.classList.remove('active');
        } else if (index + 1 === currentStep) {
            dot.classList.add('active');
            dot.classList.remove('completed');
        } else {
            dot.classList.remove('active', 'completed');
        }
    });
}

function showStep(stepNum) {
    steps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) === stepNum) {
            step.classList.add('active');
        }
    });

    // Control visibility of navigation buttons
    btnPrev.style.visibility = stepNum === 1 ? 'hidden' : 'visible';
    
    if (stepNum === totalSteps) {
        btnNext.textContent = 'Enviar Solicitud';
        btnNext.classList.add('btn-submit-mode');
    } else {
        btnNext.textContent = 'Siguiente';
        btnNext.classList.remove('btn-submit-mode');
    }

    updateProgressBar();
}

// Navigation Button Listeners
btnPrev.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        if (currentStep === totalSteps) {
            // Recalculate price just to be absolutely sure values are synced
            calculatePrice();
        }
    } else {
        // We are on Step 4 - Submit Form
        if (validateContactStep()) {
            submitForm();
        }
    }
});

// Validation for Step 4
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');

function validateContactStep() {
    let isValid = true;

    // Reset error classes
    userNameInput.parentElement.classList.remove('invalid');
    userEmailInput.parentElement.classList.remove('invalid');

    // Validate Name
    if (!userNameInput.value.trim()) {
        userNameInput.parentElement.classList.add('invalid');
        isValid = false;
    }

    // Validate Email (simple regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmailInput.value.trim() || !emailPattern.test(userEmailInput.value)) {
        userEmailInput.parentElement.classList.add('invalid');
        isValid = false;
    }

    return isValid;
}

// Clear validation messages on input
userNameInput.addEventListener('input', () => userNameInput.parentElement.classList.remove('invalid'));
userEmailInput.addEventListener('input', () => userEmailInput.parentElement.classList.remove('invalid'));

// Mock submit logic
function submitForm() {
    btnNext.disabled = true;
    btnPrev.disabled = true;
    btnNext.textContent = 'Enviando...';

    // Simulate server call
    setTimeout(() => {
        // Generate random consultation ID
        const randomId = 'VM-' + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('consult-id').textContent = randomId;

        // Hide form inputs/nav & show success screen
        interactiveForm.style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        successScreen.classList.add('active');
    }, 1500);
}

// Full reset of form fields and navigation back to Step 1
function resetFormState() {
    currentStep = 1;
    btnNext.disabled = false;
    btnPrev.disabled = false;
    btnNext.textContent = 'Siguiente';
    btnNext.classList.remove('btn-submit-mode');
    
    // Reset fields
    interactiveForm.reset();
    durationValLabel.textContent = '1 minuto';
    
    // Reset displays
    interactiveForm.style.display = 'block';
    document.querySelector('.progress-container').style.display = 'block';
    successScreen.classList.remove('active');
    
    // Clear validation invalid borders
    userNameInput.parentElement.classList.remove('invalid');
    userEmailInput.parentElement.classList.remove('invalid');

    showStep(currentStep);
    calculatePrice();
}

// Run initial price calculation on page load
calculatePrice();
