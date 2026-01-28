// Particle Animation
function initParticleAnimation() {
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? '#00d4ff' : '#9d4edd';
            this.opacity = Math.random() * 0.5 + 0.2;
            this.wobble = Math.random() * 0.05;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.time = 0;
        }
        
        update() {
            this.x += this.speedX + Math.sin(this.time) * this.wobble;
            this.y += this.speedY + Math.cos(this.time) * this.wobble;
            this.time += this.wobbleSpeed;
            
            // Reset if particle goes off screen
            if (this.x < -50 || this.x > canvas.width + 50 || 
                this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Add glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
                this.x, this.y, this.size,
                this.x, this.y, this.size * 3
            );
            gradient.addColorStop(0, this.color + '80');
            gradient.addColorStop(1, this.color + '00');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connection lines
    function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Neural Network Animation
function initNeuralNetwork() {
    const connections = document.querySelectorAll('.connection');
    
    connections.forEach((conn, index) => {
        conn.style.animationDelay = `${index * 0.5}s`;
        
        // Add flowing effect
        setInterval(() => {
            conn.style.background = conn.style.background.includes('#ff0080') 
                ? 'linear-gradient(90deg, #00d4ff, #9d4edd)'
                : 'linear-gradient(90deg, #ff0080, #00d4ff)';
        }, 2000 + index * 500);
    });
}

// Bubble Floating Animation
function initBubbleAnimation() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        // Randomize animation
        const duration = 6 + Math.random() * 4;
        const delay = index * 1;
        
        bubble.style.animation = `floatBubble ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initParticleAnimation();
    initNeuralNetwork();
    initBubbleAnimation();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        section:nth-child(odd) .animate-in {
            animation-delay: 0.2s;
        }
        
        section:nth-child(even) .animate-in {
            animation-delay: 0.4s;
        }
        
        .project-card:nth-child(odd) .animate-in {
            animation-delay: 0.3s;
        }
        
        .project-card:nth-child(even) .animate-in {
            animation-delay: 0.6s;
        }
        
        .animate-title {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards;
        }
        
        .animate-text {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s ease forwards;
        }
    `;
    document.head.appendChild(style);
});