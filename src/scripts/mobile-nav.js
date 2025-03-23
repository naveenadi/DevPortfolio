// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const body = document.body;
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-active');
      
      // Prevent scrolling when menu is open
      if (body.classList.contains('mobile-menu-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        body.classList.contains('mobile-menu-active') && 
        !e.target.closest('nav') && 
        !e.target.closest('.mobile-menu-toggle')
      ) {
        body.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
      }
    });
  }
});