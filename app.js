document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    // Gold 3D Particle Engine (Restored)
    const canvas = document.getElementById('particle-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let particlesArray = [];
        let mouse = { x: null, y: null, radius: 150 };

        const goldPalette = ['#FFD700', '#D4AF37', '#B8860B', '#F9F295', '#DAA520'];

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.7;
            canvas.style.transition = 'transform 0.1s ease-out';
        }

        class Particle {
            constructor(x, y) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 2 + 1.5;
                this.color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
                this.density = (Math.random() * 35) + 5;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius && mouse.x !== null) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 15;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 15;
                    }
                }
            }
        }

        function initParticles() {
            particlesArray = [];
            const textCanvas = document.createElement('canvas');
            const textCtx = textCanvas.getContext('2d');
            textCanvas.width = canvas.width;
            textCanvas.height = canvas.height;

            let fontSize = Math.min(canvas.width * 0.2, 350);
            textCtx.fillStyle = 'white';
            textCtx.font = `950 ${fontSize}px Inter, sans-serif`;
            textCtx.textAlign = 'center';
            textCtx.textBaseline = 'middle';
            textCtx.fillText('ZADES', textCanvas.width/2, textCanvas.height/2);

            const textCoordinates = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
            const gap = 4;
            for(let y = 0; y < textCanvas.height; y += gap) {
                for(let x = 0; x < textCanvas.width; x += gap) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        particlesArray.push(new Particle(x, y));
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].draw();
                particlesArray[i].update();
            }
            requestAnimationFrame(animate);
        }

        initCanvas();
        initParticles();
        animate();

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;

            const xPercent = (e.clientX / window.innerWidth) - 0.5;
            const yPercent = (e.clientY / window.innerHeight) - 0.5;
            canvas.style.transform = `perspective(1000px) rotateX(${yPercent * -30}deg) rotateY(${xPercent * 30}deg)`;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null; mouse.y = null;
            canvas.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });

        window.addEventListener('scroll', () => {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].y += (Math.random() - 0.5) * 5;
                particlesArray[i].x += (Math.random() - 0.5) * 2;
            }
        });

        window.addEventListener('resize', () => {
            initCanvas();
            initParticles();
        });
    }

});
