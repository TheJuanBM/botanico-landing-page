import Lenis from 'lenis';

// Inicializar Lenis cuando el DOM esté listo
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Función de animación
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Integrar con View Transitions de Astro
  document.addEventListener('astro:page-load', () => {
    lenis.scrollTo(0, { immediate: true });
  });

  // Manejar enlaces con hash
  const handleHashLinks = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target && target instanceof HTMLElement) {
            lenis.scrollTo(target, {
              offset: -80,
              duration: 1.5,
            });
          }
        }
      });
    });
  };

  handleHashLinks();

  // Re-aplicar listeners después de transiciones de página
  document.addEventListener('astro:page-load', handleHashLinks);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLenis);
} else {
  initLenis();
}
