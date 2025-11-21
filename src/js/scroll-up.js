const scrollUpButton = document.querySelector('.scroll-up-btn');

if (scrollUpButton) {
  function smoothScrollToTop(duration = 1000) {
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUpButton.classList.add('show');
    } else {
      scrollUpButton.classList.remove('show');
    }
  });

  scrollUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollToTop();
  });
}
