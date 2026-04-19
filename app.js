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

    // Hero 3D Parallax Effect
    const hero = document.getElementById('hero');
    const heroTitle = document.getElementById('hero-title');

    if(hero && heroTitle) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const rotateX = (0.5 - y) * 30; 
            const rotateY = (x - 0.5) * 30;

            heroTitle.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            heroTitle.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

});
