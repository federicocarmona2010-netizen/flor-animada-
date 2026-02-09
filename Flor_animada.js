document.addEventListener('DOMContentLoaded', function() {
    const flor = document.querySelector('.flor');
    const petalos = document.querySelectorAll('.petalo');
    const centro = document.querySelector('.centro');
    let clickCount = 0;

    // Función para explosión al clic (sin cambios)
    function explosion() {
        clickCount++;
        petalos.forEach(petalo => {
            petalo.style.animation = 'abrir-petalo 0.5s ease-in-out, girar-petalo 1s linear, explosion-petalo 0.8s ease-out';
            setTimeout(() => {
                if (clickCount < 3) {
                    petalo.style.animation = 'abrir-petalo 4s ease-in-out infinite, girar-petalo 6s linear infinite';
                } else {
                    petalo.style.animation = 'marchitar 2s ease-in-out forwards';
                    centro.style.animation = 'marchitar-centro 2s ease-in-out forwards';
                    setTimeout(() => {
                        petalo.style.animation = 'abrir-petalo 4s ease-in-out infinite, girar-petalo 6s linear infinite';
                        centro.style.animation = 'brillo 1.5s ease-in-out infinite alternate';
                        clickCount = 0;
                    }, 5000);
                }
            }, 800);
        });
        centro.style.animation = 'brillo 0.3s ease-in-out infinite alternate';
    }

    // Hover en pétalos (sin cambios)
    petalos.forEach(petalo => {
        petalo.addEventListener('mouseover', () => {
            const colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#e84393', '#00cec9'];
            petalo.style.background = colores[Math.floor(Math.random() * colores.length)];
        });
        petalo.addEventListener('mouseout', () => {
            petalo.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)';
        });
    });

    // Clic en la flor (sin cambios)
    flor.addEventListener('click', explosion);

    // Después de que los pétalos terminen su apertura inicial, cambian a la animación infinita
    petalos.forEach(petalo => {
        petalo.addEventListener('animationend', (e) => {
            if (e.animationName === 'abrir-inicial') {
                petalo.style.animation = 'abrir-petalo 4s ease-in-out infinite, girar-petalo 6s linear infinite';
            }
        });
    });

    // Partículas flotantes (sin cambios)
    function crearParticula() {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        const size = Math.random() * 10 + 5;
        particula.style.width = size + 'px';
        particula.style.height = size + 'px';
        particula.style.background = ['yellow', 'white', 'lightblue'][Math.floor(Math.random() * 3)];
        particula.style.borderRadius = '50%';
        particula.style.top = Math.random() * 100 + 'vh';
        particula.style.left = Math.random() * 100 + 'vw';
        particula.style.animation = 'flotar 5s linear infinite';
        particula.style.boxShadow = '0 0 5px ' + particula.style.background;
        document.body.appendChild(particula);
        setTimeout(() => particula.remove(), 5000);
    }

    setInterval(crearParticula, 1500);

    // Nuevos keyframes (sin cambios)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flotar {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes explosion-petalo {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.5) translateX(20px) translateY(-20px); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes marchitar {
            0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0.3) rotate(45deg); opacity: 0.5; }
        }
        @keyframes marchitar-centro {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
});