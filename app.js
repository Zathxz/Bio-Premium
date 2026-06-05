// --- Custom Cursor Logic ---
const cursor = document.getElementById('custom-cursor');
const follower = document.getElementById('custom-cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position target cursor immediately
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

// Follower cursor lag/smooth animation loop
function updateFollower() {
    // Linear interpolation: follower follows mouse with 0.12 ease factor
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    
    requestAnimationFrame(updateFollower);
}
updateFollower();

// Bind hover states to interactive elements
function setupCursorHovers() {
    const interactives = document.querySelectorAll('a, button, input[type="range"], .theme-dot');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}
setupCursorHovers();


// --- Canvas Particles Background Animation ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationFrameId;
let currentTheme = 'cyberpunk';

// Setup canvas sizing
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.color = this.getThemeColor();
    }

    getThemeColor() {
        switch (currentTheme) {
            case 'retrowave':
                return `rgba(255, 85, 184, ${Math.random() * 0.4 + 0.1})`;
            case 'cosmic':
                return `rgba(0, 242, 254, ${Math.random() * 0.4 + 0.1})`;
            case 'minimalist':
                return `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
            case 'cyberpunk':
            default:
                return Math.random() > 0.5 
                    ? `rgba(255, 0, 85, ${Math.random() * 0.4 + 0.1})` 
                    : `rgba(0, 240, 255, ${Math.random() * 0.4 + 0.1})`;
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Interaction with mouse pointer (repulsion)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < 120) {
            const force = (120 - distance) / 120;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
        }

        // Boundary wrap
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize Particle Array
function initParticles() {
    particles = [];
    const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Main Animation Loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Process particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connecting node lines (exclusive to cyberpunk and cosmic themes)
    if (currentTheme === 'cyberpunk' || currentTheme === 'cosmic') {
        const lineColor = currentTheme === 'cyberpunk' ? 'rgba(0, 240, 255, 0.04)' : 'rgba(0, 242, 254, 0.04)';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Grid details (exclusive to Retrowave)
    if (currentTheme === 'retrowave') {
        drawRetroGrid();
    }

    animationFrameId = requestAnimationFrame(animateParticles);
}
animateParticles();

// Retrowave sunset wireframe grid helper
function drawRetroGrid() {
    ctx.strokeStyle = 'rgba(255, 85, 184, 0.04)';
    ctx.lineWidth = 1;
    
    const gridSpacing = 40;
    const verticalLines = Math.ceil(canvas.width / gridSpacing);
    const horizontalLines = Math.ceil(canvas.height / gridSpacing);

    // Draw columns
    for (let i = 0; i < verticalLines; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSpacing, 0);
        ctx.lineTo(i * gridSpacing, canvas.height);
        ctx.stroke();
    }
    // Draw rows
    for (let j = 0; j < horizontalLines; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * gridSpacing);
        ctx.lineTo(canvas.width, j * gridSpacing);
        ctx.stroke();
    }
}


// --- Audio Player & Visualizer System ---
const audio = document.getElementById('bg-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressSlider = document.getElementById('progress-slider');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeSpan = document.getElementById('current-time');
const durationTimeSpan = document.getElementById('duration-time');
const visualizerBars = document.querySelectorAll('.visualizer-bar');

let audioContext;
let analyser;
let dataArray;
let source;
let isAudioSetup = false;

// Format duration helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Init Audio element updates
audio.addEventListener('loadedmetadata', () => {
    durationTimeSpan.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progress;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

progressSlider.addEventListener('input', () => {
    if (!audio.duration) return;
    const time = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = time;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

// Setup Web Audio API analyzer for real visualizer feedback!
function setupWebAudio() {
    if (isAudioSetup) return;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 64; // Low size is perfect for 8 visualizer bars
        
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        isAudioSetup = true;
        updateRealVisualizer();
    } catch (e) {
        console.warn("Web Audio API não suportada ou bloqueada (CORS). Usando fallback visual.", e);
    }
}

// Drive visualizer bars using AudioContext frequency details
function updateRealVisualizer() {
    if (!isAudioSetup) return;
    
    requestAnimationFrame(updateRealVisualizer);
    
    if (audio.paused) {
        // Drop heights smoothly when paused
        visualizerBars.forEach(bar => {
            const h = parseFloat(bar.style.height) || 4;
            bar.style.height = `${Math.max(4, h - 1.5)}px`;
        });
        return;
    }
    
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate total volume to detect if audio frequency data is zero/blocked (CORS)
    let totalFreq = 0;
    for (let i = 0; i < dataArray.length; i++) {
        totalFreq += dataArray[i];
    }
    
    if (totalFreq === 0) {
        // Fallback: procedural wave animation driven by system clock
        const time = Date.now() * 0.005;
        visualizerBars.forEach((bar, idx) => {
            const height = Math.abs(Math.sin(time + idx * 0.6)) * 18 + 4;
            bar.style.height = `${height}px`;
        });
    } else {
        // Map real-time frequency bands to our 8 visualizer bars
        visualizerBars.forEach((bar, idx) => {
            // Average a few frequency bins
            const binIndex = Math.floor((idx / visualizerBars.length) * (dataArray.length * 0.8));
            const val = dataArray[binIndex] || 0;
            
            // Scale to max height of 24px
            const height = (val / 255) * 20 + 4;
            bar.style.height = `${height}px`;
        });
    }
}

// Toggle Play/Pause state
function togglePlay() {
    // Initialize Web Audio context on user action
    if (window.AudioContext || window.webkitAudioContext) {
        setupWebAudio();
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }

    if (audio.paused) {
        audio.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            
            // Toggle visualizer animations
            visualizerBars.forEach(bar => {
                if (!isAudioSetup) {
                    bar.classList.add('playing');
                }
            });
        }).catch(err => {
            console.error("Audio playback error:", err);
        });
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        
        // Disable visualizer css animations
        visualizerBars.forEach(bar => {
            if (!isAudioSetup) {
                bar.classList.remove('playing');
            }
        });
    }
}

playPauseBtn.addEventListener('click', togglePlay);


// --- Entrance screen logic ---
const enterOverlay = document.getElementById('enter-overlay');
const enterBtn = document.getElementById('enter-btn');
const mainWrapper = document.getElementById('main-wrapper');

enterBtn.addEventListener('click', () => {
    // Hide overlay
    enterOverlay.classList.add('fade-out');
    
    // Show main card content
    setTimeout(() => {
        mainWrapper.classList.add('loaded');
    }, 200);

    // Auto-play audio on entry (requires user click to work)
    togglePlay();
});


// --- Simulated Discord Active Ticker ---
const discordActivity = document.getElementById('discord-activity');
const discordState = document.getElementById('discord-state');
const discordTime = document.getElementById('discord-time');

let discordSeconds = 9912; // Start from 02:45:12

const vsCodeFiles = [
    'style.css',
    'index.html',
    'app.js',
    'portfolio.py',
    'server.js',
    'index.md'
];

function updateDiscordTicker() {
    discordSeconds++;
    
    // Format hours, minutes, seconds
    const hrs = Math.floor(discordSeconds / 3600);
    const mins = Math.floor((discordSeconds % 3600) / 60);
    const secs = discordSeconds % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    discordTime.textContent = `há ${pad(hrs)}:${pad(mins)}:${pad(secs)}`;

    // Randomly change VS Code files every 2 minutes
    if (discordSeconds % 120 === 0) {
        const randomFile = vsCodeFiles[Math.floor(Math.random() * vsCodeFiles.length)];
        discordState.textContent = `Editando ${randomFile}`;
    }
}
setInterval(updateDiscordTicker, 1000);


// --- Theme Switcher Logic ---
const themeDots = document.querySelectorAll('.theme-dot');

themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
        // Clear active theme dots
        themeDots.forEach(d => d.classList.remove('active'));
        
        // Activate target dot
        dot.classList.add('active');
        
        // Strip out existing theme classes from body
        document.body.className = '';
        
        // Assign target theme
        const selectedTheme = dot.getAttribute('data-theme');
        currentTheme = selectedTheme;
        document.body.classList.add(`theme-${selectedTheme}`);

        // Re-generate particle styles
        particles.forEach(p => p.reset());
        setupCursorHovers();
    });
});
