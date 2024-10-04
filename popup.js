document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const resultContainer = document.getElementById('result-container');
  const shareButton = document.getElementById('share-button');
  const shareOptions = document.getElementById('share-options');
  const copyResultButton = document.getElementById('copy-result');
  const emailResultButton = document.getElementById('email-result');
  const facebookShareButton = document.getElementById('facebook-share');
  const dailyTermText = document.getElementById('daily-term-text');
  const dailyTermDefinition = document.getElementById('daily-term-definition');

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

  // Search functionality
  searchButton.addEventListener('click', async () => {
    const term = searchInput.value.trim();
    if (term) {
      const translation = await fetchTranslation(term);
      resultContainer.innerHTML = `<strong>${term}:</strong> ${translation}`;
    }
  });

  // Share functionality
  shareButton.addEventListener('click', () => {
    shareOptions.classList.toggle('hidden');
  });

  copyResultButton.addEventListener('click', () => {
    const result = resultContainer.innerText;
    navigator.clipboard.writeText(result).then(() => {
      alert('Result copied to clipboard!');
    });
  });

  emailResultButton.addEventListener('click', () => {
    const result = resultContainer.innerText;
    const emailBody = encodeURIComponent(result);
    window.open(`mailto:?subject=Medical Term Translation&body=${emailBody}`);
  });

  facebookShareButton.addEventListener('click', () => {
    const result = resultContainer.innerText;
    const shareUrl = encodeURIComponent(`https://yourdomain.com/share?text=${result}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  });

  // Daily Medical Term
  async function setDailyTerm() {
    const terms = ['hypertension', 'myocardial infarction', 'diabetes', 'arthritis', 'pneumonia'];
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    const definition = await fetchTranslation(randomTerm);
    dailyTermText.textContent = randomTerm;
    dailyTermDefinition.textContent = definition;
  }

  setDailyTerm();
});