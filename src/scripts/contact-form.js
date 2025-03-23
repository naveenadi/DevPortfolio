// Contact form handling with enhanced validation and feedback
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', validateInput);
      input.addEventListener('input', () => {
        // Remove error styling when user starts typing again
        input.classList.remove('input-error');
      });
    });
  }
  
  function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    
    if (input.required && !value) {
      input.classList.add('input-error');
      return false;
    }
    
    if (input.type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        input.classList.add('input-error');
        return false;
      }
    }
    
    input.classList.remove('input-error');
    return true;
  }
  
  function validateForm() {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
      if (!validateInput({ target: input })) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      showFormMessage('Please fill in all fields correctly', 'error');
      return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="btn-text">Sending...</span>';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Simulate sending data (with a delay to show loading state)
    setTimeout(() => {
      // In a real application, you would send this data to a server
      console.log('Form submitted:', formValues);
      
      // Show success message
      showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
      
      // Reset form and button
      contactForm.reset();
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }, 1500);
  }
  
  function showFormMessage(message, type) {
    // Check if message element already exists
    let messageElement = document.querySelector('.form-message');
    
    // If not, create one
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      contactForm.appendChild(messageElement);
    }
    
    // Create icon based on message type
    const icon = type === 'success' ? '✓' : '⚠️';
    
    // Set message content and style
    messageElement.innerHTML = `<span class="message-icon">${icon}</span> ${message}`;
    messageElement.className = `form-message ${type}`;
    
    // Add entrance animation
    messageElement.style.animation = 'none';
    setTimeout(() => {
      messageElement.style.animation = 'fadeIn 0.4s ease-in-out';
    }, 10);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.style.animation = 'fadeOut 0.4s ease-in-out';
      setTimeout(() => {
        messageElement.remove();
      }, 400);
    }, 5000);
  }
});

// Add this to your CSS in Contact.astro
// .input-error {
//   border-color: #ff4757 !important;
//   background-color: rgba(255, 71, 87, 0.05) !important;
// }
// 
// @keyframes fadeOut {
//   from { opacity: 1; transform: translateY(0); }
//   to { opacity: 0; transform: translateY(-10px); }
// }
// 
// .message-icon {
//   display: inline-block;
//   margin-right: 8px;
// }