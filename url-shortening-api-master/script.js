const urlInput = document.querySelector('#input');
const shortenBtn = document.querySelector('#shorten-btn');
const linksList = document.querySelector('#links-list');

// Retrieve the previously shortened URLs from localStorage or initialize an empty array if none exist
const shortenedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];

// Function to render the shortened links to the page
function renderLinks() {
  linksList.innerHTML = '';  // Clear the existing list
  shortenedUrls.forEach(({ original, short }) => {
    const linkElement = document.createElement('div');  // Create a new div for each shortened URL
    linkElement.className = 'link';
    linkElement.innerHTML = `
      <p>${original}</p>
      <div>
        <a href="${short}" target="_blank">${short}</a>
        <button onclick="copyToClipboard('${short}',event)">Copy</button>
      </div>
    `;
    linksList.appendChild(linkElement);  // Append the new link element to the list
  });
}

// Function to copy the URL to the clipboard when the "Copy" button is clicked
function copyToClipboard(text, event) {
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = event.target; // Get the clicked button
    copyBtn.innerText = 'Copied!'; // Change the button text to "Copied!"
    copyBtn.style.backgroundColor = '#3b3054'; // Change background color

    // Reset the button text and style after a delay
    setTimeout(() => {
      copyBtn.innerText = 'Copy';
      copyBtn.style.backgroundColor = '';
    }, 3000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}



// URL Validation Function check if the input URL is valid
function isValidUrl(url) {
  const urlPattern = /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/;
  console.log(urlPattern.test(url)); // Log the result for debugging purposes
  return urlPattern.test(url); // Return true if valid, false otherwise
}


shortenBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  const errorMessage = document.querySelector('#error-msg');

  errorMessage.innerText = '';
  errorMessage.classList.add('hidden');
  urlInput.style.border = 'none';

  // Check if the URL input is empty
  if (!url) {
    errorMessage.innerText = 'Please add a link';
    errorMessage.classList.remove('hidden');
    urlInput.style.border = '2px solid #f46262';

    return;
  }

  // Check if the URL format is valid
  if (!isValidUrl(url)) {
    errorMessage.innerText = 'Invalid URL format.';
    errorMessage.classList.remove('hidden');
    urlInput.style.border = '2px solid #f46262';
    return;
  }

  // Try to shorten the URL using the TinyURL API
  try {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    if (response.ok) {  // Check if the API response is successful
      const shortUrl = await response.text(); // Get the shortened URL from the response
      shortenedUrls.unshift({ original: url, short: shortUrl }); // Add the new shortened URL to the list
      localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls)); // Save the updated list to localStorage
      renderLinks(); // Re-render the list of shortened URLs
      urlInput.value = ''; // Clear the input field

    }
  } catch (err) {
    errorMessage.innerText = 'Failed to shorten the URL. Please try again later.';
    errorMessage.classList.remove('hidden');
    urlInput.style.border = '2px solid #f46262';
    console.log(err);
  }
});

// Initial render of the links when the page loads
renderLinks();


const hamburgerIcon = document.querySelector('.hamburger')
const linksBox = document.querySelector('.header-links')

// Function to toggle the hamburger menu for mobile devices
function toggleHamburger() {
  if (window.innerWidth < 1024) {
    hamburgerIcon.classList.remove('hidden')
    linksBox.classList.add('hidden')
  }
  else {
    hamburgerIcon.classList.add('hidden')
  }
}


hamburgerIcon.addEventListener('click', () => {
  linksBox.classList.toggle('hidden')
})

const socialIcons = document.querySelectorAll('.social-links a svg');

// Function to apply hover effect on social media icons
function applyHoverEffect() {
  if (window.innerWidth >= 1024) {
    socialIcons.forEach(socialIcon => {
      // Add mouseover event to change path fill color
      socialIcon.addEventListener('mouseover', () => {
        const paths = socialIcon.querySelectorAll('path'); // Get all paths inside the SVG
        paths.forEach(path => {
          path.style.fill = '#2acfcf'; // Change path fill to teal
        });
      });

      // Add mouseout event to reset path fill color
      socialIcon.addEventListener('mouseout', () => {
        const paths = socialIcon.querySelectorAll('path'); // Get all paths inside the SVG
        paths.forEach(path => {
          path.style.fill = '#fff'; // Reset path fill to white
        });
      });
    });
  }
}

// Apply the hover effect on page load
applyHoverEffect();
// To toggle hamburger icon
toggleHamburger()

// Reapply hover effect on window resize
window.addEventListener('resize', () => {
  applyHoverEffect();
  toggleHamburger();
});

