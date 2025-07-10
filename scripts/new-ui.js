// Cookie helper functions (Consolidated)
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  console.log("Cookie set:", name, "=", value, "; expires=", expires); // Logging for theme cookie
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Script to handle the functionality of the "Go to Old UI" button.
// It sets a cookie to remember the user's choice and redirects to index.html.
document.addEventListener('DOMContentLoaded', function() {
  const goToOldUiButton = document.getElementById('go-to-old-ui'); // Get the button element

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
  // Select all paragraphs with the class 'rotating-quote' that are children of .glass-panel
  const quotes = document.querySelectorAll('.glass-panel > p.rotating-quote');

  if (quotes.length > 0) {
    // CSS already hides these by default (.rotating-quote { display: none; }),
    // so no need to hide via JS. This prevents a Flash Of Unstyled Content (FOUC).

    const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index
    quotes[randomIndex].style.display = 'block'; // Show the randomly selected quote by setting its display style to 'block'
  }
  // Removed duplicated line: quotes[randomIndex].style.display = 'block';

  // Dark Mode Toggle Functionality
  const themeToggleButton = document.querySelector('.blapu-logo-link'); // Blapu logo is the toggle
  const bodyElement = document.body;
  console.log("Theme toggle button found:", themeToggleButton);


  // Function to apply theme based on preference
  function applyTheme(theme) {
    if (theme === 'dark') {
      bodyElement.classList.add('dark-mode');
    } else {
      bodyElement.classList.remove('dark-mode');
    }
  }

  // Check for saved theme preference on load using cookies
  const savedTheme = getCookie('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } // Default is light mode (no class)

  // Event listener for the toggle button
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', function(event) {
      console.log("Blapu logo clicked. Event object:", event);
      event.preventDefault();
      console.log("event.defaultPrevented after preventDefault():", event.defaultPrevented);

      console.log("Toggling dark mode. Current body classes:", bodyElement.classList.toString());
      bodyElement.classList.toggle('dark-mode');
      console.log("Dark mode toggled. New body classes:", bodyElement.classList.toString());

      // Save the new preference using cookies
      if (bodyElement.classList.contains('dark-mode')) {
        setCookie('theme', 'dark', 30); // Cookie expires in 30 days
      } else {
        setCookie('theme', 'light', 30); // Cookie expires in 30 days
      }
    });
  } else {
    console.error("Theme toggle button (.blapu-logo-link) not found!");
  }
});
