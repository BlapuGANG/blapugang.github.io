// Script to handle the functionality of the "Go to Old UI" button.
// It sets a cookie to remember the user's choice and redirects to index.html.

const goToOldUiButton = document.getElementById('go-to-old-ui'); // Get the button element

// Function to set a cookie
// name: Name of the cookie
// value: Value of the cookie
// days: Number of days until the cookie expires
function setCookie(name, value, days) {
  let expires = ""; // Initialize expires string
  if (days) { // If 'days' is provided, calculate expiration date
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
    expires = "; expires=" + date.toUTCString(); // Format expires string for cookie
  }
  // Set the cookie with the provided name, value, expiration, and root path
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Check if the "Go to Old UI" button exists on the page
if (goToOldUiButton) {
  // Add a click event listener to the button
  goToOldUiButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link navigation behavior
    // Set a cookie named 'siteChoice' with value 'old', expiring in 30 days
    setCookie('siteChoice', 'old', 30);
    // Redirect the user to the old UI (index.html)
    window.location.href = 'index.html';
  });
}

// JavaScript for displaying a random quote
document.addEventListener('DOMContentLoaded', function() {
  // Select all paragraphs with the class 'rotating-quote' that are children of .glass-panel
  const quotes = document.querySelectorAll('.glass-panel > p.rotating-quote');

  if (quotes.length > 0) {
    // CSS already hides these by default (.rotating-quote { display: none; }),
    // so no need to hide via JS. This prevents a Flash Of Unstyled Content (FOUC).

    const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index
    quotes[randomIndex].style.display = 'block'; // Show the randomly selected quote by setting its display style to 'block'
  }
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleButton = document.querySelector('.blapu-logo-link'); // Blapu logo is the toggle
  const bodyElement = document.body;

  // Function to apply theme based on preference
  function applyTheme(theme) {
    if (theme === 'dark') {
      bodyElement.classList.add('dark-mode');
    } else {
      bodyElement.classList.remove('dark-mode');
    }
  }

  // Check for saved theme preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } // Default is light mode (no class)

  // Event listener for the toggle button
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent navigation if the logo is also a link

      bodyElement.classList.toggle('dark-mode');

      // Save the new preference
      if (bodyElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
