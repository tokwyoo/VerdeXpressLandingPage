// Aquí puedes agregar la lógica de tu página, como animaciones,
// interacción con el usuario, etc.

console.log("¡Script cargado!");

// Agregar este código al archivo script.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dots');
    
    // Verificar si los elementos existen en el DOM
    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    const itemsVisible = 3; // Número de items visibles a la vez
    
    let currentIndex = 0;
    let interval;

    // Crear indicadores (dots)
    for (let i = 0; i < itemCount - itemsVisible + 1; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    // Función para actualizar el carrusel
    function updateCarousel() {
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Función para ir a un slide específico
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > itemCount - itemsVisible) currentIndex = itemCount - itemsVisible;
        updateCarousel();
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        if (currentIndex < itemCount - itemsVisible) {
            currentIndex++;
            updateCarousel();
        } else {
            // Volver al principio si llegamos al final
            currentIndex = 0;
            updateCarousel();
        }
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Ir al final si estamos en el principio
            currentIndex = itemCount - itemsVisible;
            updateCarousel();
        }
    }

    // Event listeners para los botones
    nextBtn.addEventListener('click', () => {
        clearInterval(interval); // Detener el carrusel automático
        nextSlide();
        startAutoSlide(); // Reiniciar el carrusel automático
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(interval); // Detener el carrusel automático
        prevSlide();
        startAutoSlide(); // Reiniciar el carrusel automático
    });

    // Función para iniciar el carrusel automático
    function startAutoSlide() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000); // Cambiar slide cada 5 segundos
    }

    // Iniciar el carrusel automático
    startAutoSlide();

    // Detener el carrusel cuando el usuario pasa el mouse por encima
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    // Reiniciar el carrusel cuando el usuario quita el mouse
    carousel.addEventListener('mouseleave', startAutoSlide);

    // También detener el carrusel cuando el usuario toca la pantalla en móviles
    carousel.addEventListener('touchstart', () => clearInterval(interval), { passive: true });
    // Reiniciar el carrusel cuando el usuario deja de tocar la pantalla
    carousel.addEventListener('touchend', startAutoSlide, { passive: true });

    // Inicializar el carrusel
    updateCarousel();

    // Función para el efecto de deslizar en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Deslizar hacia la izquierda (siguiente)
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Deslizar hacia la derecha (anterior)
            prevSlide();
        }
    }
});

// Funcionamiento de la aplicación saludar
document.addEventListener('DOMContentLoaded', function() {
    // Importar la función saludar desde functions.js
    // (Asegúrate de incluir functions.js en tu HTML antes de script.js)
    if (typeof saludar === 'function') {
        saludar('Usuario de VerdeXpress');
    }
});