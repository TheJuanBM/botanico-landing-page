import Lenis from 'lenis';

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
    syncTouch: true,
    lerp: 0.1,
  });

  let rafId: number;
  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  document.addEventListener('astro:page-load', () => {
    lenis.scrollTo(0, { immediate: true });
  });

  document.addEventListener('astro:before-swap', () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  });

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

  document.addEventListener('astro:page-load', handleHashLinks);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLenis);
} else {
  initLenis();
}
