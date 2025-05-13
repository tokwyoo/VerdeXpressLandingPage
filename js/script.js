document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselDots = document.querySelector('.carousel-dots');
    const dotButtons = document.querySelectorAll('.dot');
    const carouselContainer = document.querySelector('.carousel-container');

    let counter = 0;
    let intervalId;
    
    function calculateItemWidth() {
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        
        carouselItems.forEach(item => {
            item.style.width = containerWidth + 'px';
            item.style.minWidth = containerWidth + 'px';
            item.style.flex = '0 0 ' + containerWidth + 'px';
        });
        
        slide();
    }

    function slide() {
        const slideWidth = carouselItems[0].offsetWidth;
        carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        updateDots();
    }

    function nextSlide() {
        counter++;
        if (counter >= carouselItems.length) {
            counter = 0;
        }
        slide();
    }

    function prevSlide() {
        counter--;
        if (counter < 0) {
            counter = carouselItems.length - 1;
        }
        slide();
    }

    function updateDots() {
        dotButtons.forEach(dot => dot.classList.remove('active'));
        dotButtons[counter].classList.add('active');
    }

    function startCarousel() {
        intervalId = setInterval(nextSlide, 3000);
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    nextButton.addEventListener('click', () => {
        stopCarousel();
        nextSlide();
        startCarousel();
    });

    prevButton.addEventListener('click', () => {
        stopCarousel();
        prevSlide();
        startCarousel();
    });

    carouselDots.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            stopCarousel();
            counter = parseInt(e.target.dataset.slide);
            slide();
            startCarousel();
        }
    });
    
    carouselContainer.addEventListener('mouseenter', () => {
        stopCarousel();
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startCarousel();
    });

    calculateItemWidth();
    
    window.addEventListener('resize', calculateItemWidth);

    startCarousel();
});