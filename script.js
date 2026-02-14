// Music player functionality
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicText = document.querySelector('.music-text');
let isPlaying = false;

// Set music to play from 3:42 to 4:34
const startTime = 222; // 3:42 in seconds
const endTime = 274;   // 4:34 in seconds

// Set initial start time
bgMusic.addEventListener('loadedmetadata', () => {
    bgMusic.currentTime = startTime;
});

// Loop between start and end time
bgMusic.addEventListener('timeupdate', () => {
    if (bgMusic.currentTime >= endTime) {
        bgMusic.currentTime = startTime;
    }
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicText.textContent = 'Play Music';
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.currentTime = startTime; // Always start from 3:42
        bgMusic.play();
        musicText.textContent = 'Pause Music';
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Confetti animation
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ff6b9d', '#ffb6c1'];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                return false;
            }
            return true;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((piece, index) => {
            if (!piece.update()) {
                confettiPieces.splice(index, 1);
            } else {
                piece.draw();
            }
        });

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }

    // Create confetti burst
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            confettiPieces.push(new Confetti());
        }, i * 10);
    }

    animateConfetti();
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💞', '❤️', '🩷'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 300);
}

// No button behavior - changes puppy image with each click!
let noClickCount = 0;
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const puppyImage = document.getElementById('puppyImage');
const imageLabel = document.querySelector('.image-label');

noBtn.addEventListener('click', () => {
    noClickCount++;

    const messages = [
        "Ummm...🤔",
        "Are you sure? 🥺",
        "Really? 😢",
        "Please? 🥹",
        "I'll be sad... 😭",
        "ABSOLUTELY! 💕"  // Final stage - only option
    ];

    const imageLabels = [
        "PLEASE...",
        "ARE YOU SURE? 🥺",
        "REALLY?! 😢",
        "PLEASE?! 🥹",
        "I'M SAD... 😭",
        "CHOOSE WISELY... 🔪"
    ];

    // Image progression with your actual images
    const images = [
        "puppy,jpg.jpeg",           // Stage 0: Normal pleading (initial)
        "puppy-sad.jpg",            // Stage 1: Sad (click 1)
        "puppy-crying.jpg",         // Stage 2: Crying (click 2)
        "puppy-begging.jpg",        // Stage 3: Begging (click 3)
        "puppy-verysad.jpg",        // Stage 4: Very sad (click 4)
        "puppy-angry-knife.jpg"     // Stage 5: Angry with knife! (click 5)
    ];

    // Use noClickCount directly as stage (1-5), capped at 5
    const currentStage = Math.min(noClickCount, 5);

    // Update button text
    noBtn.textContent = messages[currentStage];

    // Update image and label
    puppyImage.src = images[currentStage];
    imageLabel.textContent = imageLabels[currentStage];

    // At final stage (angry with knife), disable the No button!
    if (currentStage >= 5) {
        noBtn.disabled = true;
        noBtn.style.opacity = '0.3';
        noBtn.style.cursor = 'not-allowed';
        noBtn.textContent = "ABSOLUTELY! 💕";

        // Make yes button huge and pulsing
        yesBtn.style.transform = 'scale(1.5)';
        yesBtn.style.animation = 'shake 0.5s infinite';

        // Shake the whole card
        document.querySelector('.card').style.animation = 'shake 0.3s infinite';

        return; // Don't run away anymore
    }

    // Make the no button smaller and yes button bigger
    const newNoSize = Math.max(0.6, 1 - (noClickCount * 0.08));
    const newYesSize = 1 + (noClickCount * 0.12);

    noBtn.style.transform = `scale(${newNoSize})`;
    yesBtn.style.transform = `scale(${newYesSize})`;

    // Make no button move randomly (but keep it within visible area)
    const padding = 20;
    const isMobile = window.innerWidth <= 600;

    // Scale the movement range based on device
    const maxX = isMobile ? (window.innerWidth - 100) : Math.min(window.innerWidth * 0.6, 500);
    const maxY = isMobile ? (window.innerHeight - 100) : Math.min(window.innerHeight * 0.6, 400);

    const randomX = Math.random() * maxX + (isMobile ? 10 : 100);
    const randomY = Math.random() * maxY + (isMobile ? 10 : 100);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1001';

    // Add shake animation to yes button
    yesBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        if (noClickCount < 5) {
            yesBtn.style.animation = '';
        }
    }, 500);
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(var(--scale, 1)); }
        25% { transform: translateX(-10px) scale(var(--scale, 1)); }
        75% { transform: translateX(10px) scale(var(--scale, 1)); }
    }
`;
document.head.appendChild(style);

// Yes button behavior
yesBtn.addEventListener('click', () => {
    const modal = document.getElementById('celebrationModal');
    modal.classList.add('active');

    // Create heart explosion
    createHeartExplosion();

    // Create confetti
    createConfetti();

    // Auto-play music if not already playing
    if (!isPlaying) {
        bgMusic.currentTime = startTime;
        bgMusic.play();
        musicText.textContent = 'Pause Music';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
});

// Create heart explosion effect
function createHeartExplosion() {
    const container = document.getElementById('heartExplosion');
    container.innerHTML = ''; // Clear previous hearts

    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💞', '❤️', '🩷', '💘'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'exploding-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const angle = (Math.PI * 2 * i) / 30;
        const distance = 150 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = Math.random() * 0.3 + 's';

        container.appendChild(heart);
    }
}

// Close modal
document.getElementById('closeBtn').addEventListener('click', () => {
    const modal = document.getElementById('celebrationModal');
    modal.classList.remove('active');

    // Reset everything
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.transform = 'scale(1)';
    noBtn.textContent = 'Ummm...🤔';
    noBtn.disabled = false;
    noBtn.style.opacity = '1';
    noBtn.style.cursor = 'pointer';
    yesBtn.style.transform = 'scale(1)';
    yesBtn.style.animation = '';
    document.querySelector('.card').style.animation = '';
    noClickCount = 0;

    // Reset image to first one
    puppyImage.src = 'puppy,jpg.jpeg';
    imageLabel.textContent = 'PLEASE...';
});

// Initialize floating hearts
createFloatingHearts();

// Add some fun cursor effects
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '12px';
        heart.style.zIndex = '9999';
        heart.style.animation = 'cursor-heart 1s ease-out forwards';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
});

// Add cursor heart animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursor-heart {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cursorStyle);
