// contact_us.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submitButton = form.querySelector('button');
  
    // Real-time validation
    function validateForm() {
      let isValid = true;
  
      // Validate Name
      if (name.value.trim() === '') {
        name.style.borderColor = 'red';
        isValid = false;
      } else {
        name.style.borderColor = '';
      }
  
      // Validate Email
      if (!email.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        email.style.borderColor = 'red';
        isValid = false;
      } else {
        email.style.borderColor = '';
      }
  
      // Validate Subject
      if (subject.value.trim() === '') {
        subject.style.borderColor = 'red';
        isValid = false;
      } else {
        subject.style.borderColor = '';
      }
  
      // Validate Message
      if (message.value.trim() === '') {
        message.style.borderColor = 'red';
        isValid = false;
      } else {
        message.style.borderColor = '';
      }
  
      // Enable/Disable Submit Button
      submitButton.disabled = !isValid;
    }
  
    // Add event listeners to validate inputs
    name.addEventListener('input', validateForm);
    email.addEventListener('input', validateForm);
    subject.addEventListener('input', validateForm);
    message.addEventListener('input', validateForm);
  
    // Initialize form validation on load
    validateForm();
  });
  