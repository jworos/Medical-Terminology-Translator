const API_KEY = '01d9d5c0-5215-4b77-a178-ebbc1e5e71c1'; // Replace with your actual API key

// Function to fetch translation from Merriam-Webster Medical Dictionary API
async function fetchTranslation(term) {
  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/medical/json/${term}?key=${API_KEY}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0 && data[0].shortdef) {
      return data[0].shortdef[0];
    }
    return "Translation not available";
  } catch (error) {
    console.error('Error fetching translation:', error);
    return "Translation not available";
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showTranslation") {
    alert(`${request.term}: ${request.translation}`);
  }
});