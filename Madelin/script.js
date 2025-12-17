document.addEventListener('DOMContentLoaded', () => {
    const bubbleLayer = document.getElementById('bubble-layer');
    const modal = document.getElementById('photo-modal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close-modal');
    const playBtn = document.getElementById('play-btn');
    const audio = document.getElementById('main-audio');

    // --- 1. LÓGICA DE MÚSICA (Auto-inicio) ---
    const intentarReproducir = () => {
        audio.play().then(() => {
            playBtn.innerText = "⏸ Pausa";
            // Una vez que suena, quitamos el evento del body para no saturar
            document.body.removeEventListener('click', intentarReproducir);
        }).catch(error => {
            console.log("Reproducción automática esperando interacción del usuario.");
        });
    };

    // Intentar sonar apenas cargue
    intentarReproducir();

    // Si el navegador lo bloqueó, sonará al primer clic en cualquier parte
    document.body.addEventListener('click', intentarReproducir, { once: true });

    // Control manual del botón
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita conflictos con el clic del body
        if (audio.paused) {
            audio.play();
            playBtn.innerText = "⏸ Pausa";
        } else {
            audio.pause();
            playBtn.innerText = "▶ Play";
        }
    });


    // --- 2. BURBUJAS FLOTANTES ---
    const frases = ["Te amo", "Madelin", "Mi reina", "Teamomucho", "Perfecta", "💖", "Madelin Cedeño"];
    
    function createBubble() {
        if (!bubbleLayer) return;
        const bubble = document.createElement('div');
        bubble.className = 'floating-bubble';
        bubble.innerText = frases[Math.floor(Math.random() * frases.length)];
        
        const startLeft = Math.random() * 90;
        const duration = 12 + Math.random() * 10;
        
        bubble.style.left = `${startLeft}%`;
        bubble.style.setProperty('--duration', `${duration}s`);
        
        bubbleLayer.appendChild(bubble);
        setTimeout(() => bubble.remove(), duration * 1000);
    }
    // Iniciamos las burbujas
    setInterval(createBubble, 2500);


    // --- 3. MODAL DE FOTOS ---
    document.querySelectorAll('.media-box img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const mensaje = img.getAttribute('data-message');
            if (mensaje) {
                modalText.innerText = mensaje;
                modal.style.display = "block";
            }
        });
    });

    // Cerrar Modal
    if (closeModal) {
        closeModal.onclick = () => modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };
});