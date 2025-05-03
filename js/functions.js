// Aquí puedes definir funciones reutilizables para tu sitio web.

function saludar(nombre) {
    console.log(`Hola, ${nombre}!`);
}
// Código para el funcionamiento del acordeón de preguntas frecuentes
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos de preguntas
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Agregar event listener a cada pregunta
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Verificar si el item actual está activo
            const isActive = item.classList.contains('active');
            
            // Cerrar todas las respuestas abiertas
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Si el item no estaba activo, abrirlo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
// Ejemplo de uso:
// saludar("Usuario");