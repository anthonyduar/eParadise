document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll('header, .product-shelf');

  // Apply the initial class to all elements we want to animate
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in-element');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When the element is in view, add the 'is-visible' class
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: stop observing the element once it's visible
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // Start observing all the elements
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});
