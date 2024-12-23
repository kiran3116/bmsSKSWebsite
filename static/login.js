// JavaScript to handle theme toggle
const themeToggle = document.getElementById('themeToggle');

// Toggle theme when the icon is clicked
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
});
