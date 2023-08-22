// Get all tab links and tab content elements
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

// Add click event listeners to tab links
tabLinks.forEach((tabLink) => {
  tabLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Remove active class from all tab links and tab contents
    tabLinks.forEach((link) => link.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    // Add active class to the clicked tab link and corresponding tab content
    const tabName = tabLink.getAttribute('data-tab');
    tabLink.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// Load logs from logs.txt when the "Logs" tab is clicked
tabLinks.forEach((tabLink) => {
  tabLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Get the tab name from the data-tab attribute
    const tabName = tabLink.getAttribute('data-tab');

    // ... your existing tab switching code ...

    // If the "Logs" tab is clicked, load logs from logs.txt
    if (tabName === 'logs') {
      loadLogs();
    }
  });
});

// Function to load logs from logs.txt
function loadLogs() {
  const logEntriesContainer = document.getElementById('log-entries');

  // Create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/logs.txt', true);

  // Define what to do when the request is complete
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Get the logs from the response and display them
      const logs = xhr.responseText;
      logEntriesContainer.innerHTML = `<pre>${logs}</pre>`;
    } else {
      logEntriesContainer.innerHTML = '<p>Error loading logs</p>';
    }
  };

  // Send the request
  xhr.send();
}
