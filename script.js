document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // API endpoints
  const quoteAPI = 'http://localhost:3000/quotes';
  const favoritesAPI = 'http://localhost:3000/favorites';
  
  // DOM elements
  const dailyDoseBtn = document.querySelector('.btn.white');
  const saveToFavoritesBtn = document.querySelector('.btn.dark');
  const categoryFilter = document.getElementById('categoryFilter');
  const generateCategoryBtn = document.getElementById('generate-category-btn');
  const filteredSaveFavBtn = document.getElementById('filtered-save-fav-btn');
  const quoteText = document.getElementById('quote-text');
  const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
  const quoteAuthor = document.getElementById('quote-author');
  const favoritesGrid = document.getElementById('favorites-grid');
  const filteredQuoteText = document.getElementById('filtered-quote-text');
  const filteredQuoteAuthor = document.getElementById('filtered-quote-author');
  const inspireBtn = document.getElementById('inspire-btn');
  const inspirationResult = document.getElementById('inspirationResult');
  const inspirationTip = document.getElementById('inspirationTip');
  const meterFill = document.getElementById('meterFill');

  const inspirationMessages = [
    { 
      text: "You're glowing with creative energy!", 
      level: 100,
      tip: "Perfect time to start that project you've been dreaming about!"
    },
    { 
      text: "Feeling motivated and ready to go!", 
      level: 75,
      tip: "Channel this energy into your most important task today."
    },
    { 
      text: "You're doing okay, but could use a boost.", 
      level: 50,
      tip: "Try taking a short walk or listening to uplifting music."
    },
    { 
      text: "Feeling a bit low on inspiration.", 
      level: 25,
      tip: "Maybe it's time for a break? Even 5 minutes can help refresh your mind."
    },
    { 
      text: "Need some serious inspiration fuel!", 
      level: 10,
      tip: "Browse our quotes or take 10 deep breaths to reset."
    }
  ];
  
  if (inspireBtn) {
    inspireBtn.addEventListener('click', () => {
      // Show loading state
      inspireBtn.disabled = true;
      inspireBtn.querySelector('.btn-text').textContent = "Checking...";
      inspireBtn.querySelector('.spinner').style.display = 'inline-block';
      
      // Simulate a brief delay for effect
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * inspirationMessages.length);
        const result = inspirationMessages[randomIndex];
        
        // Update results
        inspirationResult.textContent = result.text;
        inspirationTip.textContent = result.tip;
        meterFill.style.width = `${result.level}%`;
        
        // Reset button
        inspireBtn.disabled = false;
        inspireBtn.querySelector('.btn-text').textContent = "Check Again";
        inspireBtn.querySelector('.spinner').style.display = 'none';
        
        // Visual feedback
        const resultContainer = document.querySelector('.result-container');
        resultContainer.style.display = 'block';
        resultContainer.style.animation = 'fadeIn 0.5s ease-out';
      }, 800); // 0.8 second delay
    });
  }

  // Data
  let allQuotes = [];
  let currentQuote = null;
  let currentCategory = null;
  let favorites = [];

  // Initialize the app
  function init() {
    loadQuotes();
    loadFavoritesFromServer();
    setupEventListeners();
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Daily dose button - gets random quote from any category
    if (dailyDoseBtn) {
      dailyDoseBtn.addEventListener('click', fetchRandomQuote);
    }

    // Save to favorites button (main button)
    if (saveToFavoritesBtn) {
      saveToFavoritesBtn.addEventListener('click', saveCurrentQuoteToFavorites);
    }

    // Category filter - stores the selected category
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
      });
    }

    // Generate quote from selected category
    if (generateCategoryBtn) {
      generateCategoryBtn.addEventListener('click', generateFromSelectedCategory);
    }

    // Save filtered quote button
    if (filteredSaveFavBtn) {
      filteredSaveFavBtn.addEventListener('click', saveCurrentQuoteToFavorites);
    }

    // Clear favorites button
    if (clearFavoritesBtn) {
      clearFavoritesBtn.addEventListener('click', clearAllFavorites);
    }
  }

  // Fetch all quotes from API
  function loadQuotes() {
    fetch(quoteAPI)
      .then(res => res.json())
      .then(quotes => {
        allQuotes = quotes;
        fetchRandomQuote();
      })
      .catch(err => {
        console.error('Error fetching quotes:', err);
        alert('Failed to load quotes. Please try again later.');
      });
  }


  // Fetch a random quote from any category
  function fetchRandomQuote() {
    if (allQuotes.length === 0) {
      alert('Quotes not loaded yet. Please try again.');
      return;
    }

    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    currentQuote = {
      ...randomQuote,
      image: "./images/Trial.jpg"
    };
    displayQuote(currentQuote);
  }

  // Generate quote from currently selected category
  function generateFromSelectedCategory() {
    if (!currentCategory) {
      alert('Please select a category first!');
      return;
    }
    fetchRandomQuoteFromCategory(currentCategory);
  }

  // Fetch a random quote from specific category
  function fetchRandomQuoteFromCategory(category) {
    const filteredQuotes = allQuotes.filter(quote => quote.category === category);
    
   if (filteredQuotes.length === 0) {
    filteredQuoteText.textContent = "No quotes found for this category.";
    filteredQuoteAuthor.textContent = "";
    currentQuote = null;
    return;
  }

  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  currentQuote = {
    ...randomQuote,
    image: "./images/Trial.jpg"
  };
  displayFilteredQuote(currentQuote);
  }

  function displayFilteredQuote(quote) {
    filteredQuoteText.textContent = `"${quote.text}"`;
    filteredQuoteAuthor.textContent = `- ${quote.author || 'Unknown'}`;
    
    // Also display in main detail section if you want
    displayQuote(quote);
  }
  // Display a quote in the detail section
  function displayQuote(quote) {
    if (!quoteText || !quoteAuthor) return;

    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `- ${quote.author || 'Unknown'}`;

    const detailSection = document.querySelector('.detail');
    if (detailSection) {
      detailSection.style.display = 'block';
    }
  }

  // Save current quote to favorites
  function saveCurrentQuoteToFavorites() {
    if (!currentQuote) {
      alert('Please get a quote first before saving!');
      return;
    }
    
    const isDuplicate = favorites.some(fav => 
      fav.text === currentQuote.text && 
      fav.author === currentQuote.author
    );

    if (isDuplicate) {
      alert("This quote is already in your favorites!");
      return;
    }

    fetch(favoritesAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentQuote)
    })
    .then(response => response.json())
    .then(newFavorite => {
      favorites.push(newFavorite); // Add to local favorites array
      renderFavorites(favorites); // Update the display
      alert("Quote saved to favorites!");
    })
    .catch(err => {
      console.error('Failed to save to server:', err);
      alert("Failed to save quote. Please try again.");
    });
  }

  // Load favorites from server and display them
  function loadFavoritesFromServer() {
    fetch(favoritesAPI)
      .then(res => res.json())
      .then(data => {
        favorites = data;
        renderFavorites(favorites);
      })
      .catch(err => console.error('Error loading favorites:', err));
  }

  // Render favorites list
  function renderFavorites(favorites) {
    if (!favoritesGrid) return;

    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
      favoritesGrid.innerHTML = '<p>No favorites yet. Save some quotes!</p>';
      return;
    }

    favorites.forEach(fav => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${fav.image || './images/Trial.jpg'}" alt="Favorite Quote">
        <h3>${fav.author || 'Unknown Author'}</h3>
        <p>"${fav.text}"</p>
        <button class="delete-btn btn small" data-id="${fav.id}">Delete</button>
      `;

      card.querySelector('.delete-btn').addEventListener('click', (e) => {
        deleteFavorite(fav.id);
      });

      favoritesGrid.appendChild(card);
    });
  }

  // Delete a favorite
  function deleteFavorite(id) {
    if (!confirm('Are you sure you want to remove this favorite?')) return;

    fetch(`${favoritesAPI}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        loadFavoritesFromServer(); // Refresh the list after deletion
      })
      .catch(err => console.error('Failed to delete favorite:', err));
  }

  

  // Initialize the application
  init();
});