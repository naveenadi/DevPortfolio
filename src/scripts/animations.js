// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Get all links that have hash anchors
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if the href is not just '#'
      if(this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // Add smooth page transition effect
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      document.body.classList.add('page-visible');
    }
  });
  
  // Initialize page with fade-in effect
  document.body.classList.add('page-visible');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Once the animation is applied, we can stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and elements with the 'reveal' class
  const sections = document.querySelectorAll('section, .reveal');
  sections.forEach(section => {
    section.classList.add('reveal-section');
    observer.observe(section);
  });

  // Observe project cards for staggered animation
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('reveal-card');
    observer.observe(card);
  });

  // Observe skill items for staggered animation
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
    item.classList.add('reveal-skill');
    observer.observe(item);
  });
});