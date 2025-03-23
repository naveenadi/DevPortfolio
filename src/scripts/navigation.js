// Navigation active state management
document.addEventListener('DOMContentLoaded', () => {
  // Get all sections that have an ID defined
  const sections = document.querySelectorAll('section[id]');
  
  // Get all nav links with an href starting with #
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Add smooth scrolling to all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Function to set active nav link based on scroll position
  function setActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Adjust offset as needed
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', setActiveNavLink);
  
  // Set active link on page load
  setActiveNavLink();
  
  // Handle header visibility on scroll
  let lastScrollTop = 0;
  const header = document.querySelector('.header');
  const scrollThreshold = 100; // Minimum scroll before hiding header
  
  function handleHeaderVisibility() {
    const currentScrollTop = window.scrollY;
    
    // Show/hide header based on scroll direction
    if (currentScrollTop > scrollThreshold) {
      // Scrolling down
      if (currentScrollTop > lastScrollTop) {
        header.classList.add('header-hidden');
      } 
      // Scrolling up
      else {
        header.classList.remove('header-hidden');
      }
    }
    
    lastScrollTop = currentScrollTop;
  }
  
  // Add scroll event listener for header visibility
  window.addEventListener('scroll', handleHeaderVisibility);
});