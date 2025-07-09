const goToOldUiButton = document.getElementById('go-to-old-ui');

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

if (goToOldUiButton) {
  goToOldUiButton.addEventListener('click', (event) => {
    event.preventDefault();
    setCookie('siteChoice', 'old', 30);
    window.location.href = 'index.html';
  });
}
