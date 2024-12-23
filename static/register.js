// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check if the theme is already set in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
}

// Toggle theme on icon click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
