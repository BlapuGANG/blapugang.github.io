function randomBanner() {
  const totalFiles = 104; // Update to the actual number of files + 1
  const bannerImages = [];
  while (bannerImages.length < 3) {
    const randomNum = Math.floor(Math.random() * totalFiles) + 151878745;
    const fileName = `file_${randomNum}.jpg`;

    if (!bannerImages.includes(fileName)) {
      bannerImages.push(fileName);
    }
  }

  const bannerCnt = document.getElementById('bannerCnt');
  bannerImages.forEach(fileName => {
    const img = document.createElement('img');
    img.src = `assets/images/banner/${fileName}`;
    img.alt = 'Blapu Banner';
    img.style.width = '100px';
    img.style.height = '100px';
    bannerCnt.appendChild(img);
  });
}

function updateReportLinks() {
  const reportLinks = document.querySelectorAll('a.report');
  reportLinks.forEach(link => {
    link.href = 'https://x.com/BlapuGANG';
    link.target = '_blank';
  });
}

function setStylesheet(styleName) {
  // Only set the main stylesheet, don't load text.715.css here
  const stylesheet = document.getElementById('pagestyle');
  stylesheet.setAttribute('href', `styles/${styleName}.css`);
  localStorage.setItem('selectedStyle', styleName);
}

function applySavedStyle() {
  const savedStyle = localStorage.getItem('selectedStyle');
  if (savedStyle) {
    setStylesheet(savedStyle);
    document.getElementById('styleSelector').value = savedStyle;
  } else {
    // Default to yotsubluenew.715 if no saved style
    setStylesheet('yotsubluenew.715');
    document.getElementById('styleSelector').value = 'yotsubluenew.715';
  }
}

function setupPostMenus() {
  const menuBtns = document.querySelectorAll('.postMenuBtn');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
      event.stopPropagation(); // Stop the click from propagating to parent elements

      // Get the post number from the button's ID
      const postNumber = this.id.substring(2); // Remove the 'pm' prefix

      // Find the corresponding Blapu logo container
      const logoContainer = document.getElementById(`blapuLogo${postNumber}`);

      // Toggle the Blapu logo
      if (!logoContainer.hasChildNodes()) {
        // Create and append the Blapu logo if it doesn't exist
        const img = document.createElement('img');
        img.src = 'assets/images/blapu-logo.png'; // Replace with your actual Blapu logo path
        img.alt = 'Blapu Logo';
        img.style.width = '50px';
        img.style.height = '50px';
        logoContainer.appendChild(img);
      } else {
        // Remove the Blapu logo if it already exists
        logoContainer.innerHTML = '';
      }
    });
  });
}

function quote(postId) {
  const postMessage = document.getElementById('m' + postId).innerText;
  const quotedText = `>>${postId}\n${postMessage}\n\n`;

  const replyTextArea = document.querySelector('textarea[name="com"]');

  if (replyTextArea) {
    replyTextArea.value += quotedText;
    replyTextArea.scrollIntoView();
  }
}

function updateThreadStats() {
  const numReplies = document.querySelectorAll('.replyContainer').length;
  const numImages = document.querySelectorAll('.fileThumb').length;
  const currentPage = 1; // Update if you have multiple pages

  const threadStatsElements = document.querySelectorAll('.thread-stats');
  threadStatsElements.forEach(element => {
    element.innerHTML = `
          <span data-tip="Replies">${numReplies}</span>
          <span data-tip="Images">${numImages}</span>
          <span data-tip="Page">${currentPage}</span>
      `;
  });

  // Add event listeners for tooltips
  const statSpans = document.querySelectorAll('.thread-stats span');
  statSpans.forEach(span => {
    span.addEventListener('mouseover', showTooltip);
    span.addEventListener('mouseout', hideTooltip);
  });
}

function showTooltip(event) {
  const tooltipText = event.target.dataset.tip;

  // Create the tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';

  // Create the tooltip text
  const text = document.createElement('div');
  text.className = 'tooltip-text';
  text.textContent = tooltipText;

  // Append the text to the tooltip
  tooltip.appendChild(text);

  // Position the tooltip above the element
  const rect = event.target.getBoundingClientRect();
  const x = rect.left + window.scrollX + rect.width / 2;
  const y = rect.top + window.scrollY;
  tooltip.style.top = `${y}px`;
  tooltip.style.left = `${x}px`;
  tooltip.style.position = 'absolute';
  tooltip.style.transform = 'translateX(-50%)'; // Center horizontally
  tooltip.style.zIndex = '1000'; // Ensure tooltip is on top
  tooltip.style.pointerEvents = 'none'; // Allow clicking through

  document.body.appendChild(tooltip);
  tooltip.style.display = 'block'; // Show tooltip
}

function hideTooltip(event) {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// --- Greentext Function ---

function formatGreentext() {
  const postMessages = document.querySelectorAll('.postMessage');
  postMessages.forEach(postMessage => {
    const lines = postMessage.innerHTML.split('<br>');
    const formattedLines = lines.map(line => {
      if (line.trim().startsWith('&gt;') && !line.trim().includes('&gt;&gt;')) {
        return `<span class="greentext">${line}</span>`;
      }
      return line;
    });
    postMessage.innerHTML = formattedLines.join('<br>');
  });
}

// --- Event Listener and Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  randomBanner();
  updateReportLinks();
  applySavedStyle();

  const styleSelector = document.getElementById('styleSelector');
  styleSelector.addEventListener('change', (event) => {
    setStylesheet(event.target.value);
  });

  setupPostMenus();

  // Add backquotes for quoted posts
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    const postId = post.id.substring(1);
    const postMessage = post.querySelector(".postMessage");
    const quotedLinks = postMessage.querySelectorAll("a.quotelink");

    quotedLinks.forEach(link => {
      const quotedPostId = link.hash.substring(2);
      const quotedPost = document.getElementById("p" + quotedPostId);

      if (quotedPost) {
        // Create the backlink element
        const backlink = document.createElement("a");
        backlink.href = `#p${postId}`;
        backlink.className = "backlink";
        backlink.textContent = `>>${postId}`;

        // Find the element to insert after (postMenuBtn in this case)
        const insertAfter = quotedPost.querySelector(".postMenuBtn");

        if (insertAfter) {
          // Insert the backlink with a non-breaking space for separation
          insertAfter.parentNode.insertBefore(document.createTextNode(" "), insertAfter.nextSibling);
          insertAfter.parentNode.insertBefore(backlink, insertAfter.nextSibling.nextSibling);
        }
      }
    });
  });

  // Update thread stats initially
  updateThreadStats();

  // Call formatGreentext for existing posts
  formatGreentext();
});