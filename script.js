document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const quoteAPI = 'http://localhost:3000/quotes';
  const favoritesAPI = 'http://localhost:3000/favorites'; // ✅ Added
  const dailyDoseBtn = document.querySelector('.btn.white');
  const detailSection = document.querySelector('.detail');
  const inspireBtn = document.getElementById('inspirationBtn');
  const inspirationResult = document.getElementById('inspirationResult');
  const categoryFilter = document.getElementById('categoryFilter');
  const messages = [
    "You're glowing with ideas!",
    "Pretty inspired right now.",
    "Could use a boost...",
    "Time for a coffee break?",
    "Absolutely unstoppable!"
  ];

  let favorites = []; // ✅ Global array synced with json-server

  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;

      fetch(quoteAPI)
        .then(response => response.json())
        .then(quotes => {
          const filteredQuotes = selectedCategory
            ? quotes.filter(quote => quote.category === selectedCategory)
            : quotes;

          renderQuoteList(filteredQuotes);
        })
        .catch(error => {
          console.error('Error filtering quotes:', error);
        });
    });
  }

  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  let currentQuote = null;

  dailyDoseBtn.addEventListener('click', () => {
    fetch(quoteAPI)
      .then(res => res.json())
      .then(data => {
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        currentQuote = randomQuote;
        renderQuoteDetail(randomQuote);
        showQuote(randomQuote);
      })
      .catch(err => {
        console.error('Error fetching quotes:', err);
        alert('Failed to fetch quote. Please try again later.');
      });
  });

  function renderQuoteDetail(quote) {
    detailSection.innerHTML = `
      <img src="https://via.placeholder.com/600x200" alt="Quote Detail">
      <p class="quote-text">"${quote.text}"</p>
      <p class="quote-author">- ${quote.author}</p>
      <div class="hero-buttons">
        <button class="btn black" id="generateBtn">Generate Quote</button>
        <button class="btn light" id="saveBtn">Save to Favorites</button>
      </div>
    `;

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', () => {
      saveToFavorites(quote); // ✅ Will use json-server
    });
  }

  function renderQuoteList(quotes) {
    let quoteSection = document.getElementById('quote-list');
    if (!quoteSection) {
      quoteSection = document.createElement('div');
      quoteSection.id = 'quote-list';
      quoteSection.className = 'section';
      document.body.insertBefore(quoteSection, document.querySelector('footer'));
    }

    quoteSection.innerHTML = '<h2>✨ Filtered Quotes</h2>';

    if (quotes.length === 0) {
      quoteSection.innerHTML += '<p>No quotes found in this category.</p>';
      return;
    }

    quotes.forEach(quote => {
      const quoteCard = document.createElement('div');
      quoteCard.className = 'card';
      quoteCard.innerHTML = `
        <h3>${quote.author || 'Unknown Author'}</h3>
        <p>"${quote.text}"</p>
        <small><em>Category: ${quote.category}</em></small>
      `;
      quoteSection.appendChild(quoteCard);
    });
  }

  function showQuote(quote) {
    let quoteSection = document.getElementById('quote-display');
    if (!quoteSection) {
      quoteSection = document.createElement('div');
      quoteSection.id = 'quote-display';
      quoteSection.className = 'section';
      document.body.insertBefore(quoteSection, document.querySelector('footer'));
    }

    quoteSection.innerHTML = `
      <h2>📝 Your Daily Dose</h2>
      <blockquote>
        <p>"${quote.text}"</p>
        <footer>— ${quote.author || 'Unknown'}</footer>
      </blockquote>
      <button id="saveQuoteBtn" class="btn dark">Save to Favorites</button>
    `;

    const saveBtn = document.getElementById('saveQuoteBtn');
    saveBtn.addEventListener('click', () => {
      saveToFavorites(quote); // ✅ Will use json-server
    });
  }

  if (inspireBtn) {
    inspireBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      inspirationResult.textContent = messages[randomIndex];
    });
  }

  // ✅ NEW: Save to Favorites using json-server
  function saveToServerFavorites(quote) {
    fetch(favoritesAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    })
      .then(response => response.json())
      .then(() => {
        renderFavorites(); // Refresh the list
      })
      .catch(err => console.error('Failed to save to server:', err));
  }

  // ✅ NEW: Render favorites from json-server
  function renderFavorites() {
    const favoritesContainer = document.querySelector('.grid');
  if (!favoritesContainer) return;

  fetch(favoritesAPI)
    .then(res => res.json())
    .then(favorites => {
      favoritesContainer.innerHTML = '';

      favorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="https://via.placeholder.com/300x200" alt="Favorite Quote">
          <h3>${fav.author || 'Unknown Author'}</h3>
          <p>"${fav.text}"</p>
          <button class="delete-btn btn small" data-id="${fav.id}">Delete</button>
        `;

        card.querySelector('.delete-btn').addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          deleteFavorite(id);
        });

        favoritesContainer.appendChild(card);
      });

      // Clear all button
      let existingClearBtn = document.getElementById('clearFavoritesBtn');
      if (!existingClearBtn && favorites.length > 0) {
        const clearBtn = document.createElement('button');
        clearBtn.id = 'clearFavoritesBtn';
        clearBtn.className = 'btn red';
        clearBtn.textContent = 'Clear All Favorites';
        clearBtn.addEventListener('click', () => clearAllFavorites());

        favoritesContainer.parentNode.insertBefore(clearBtn, favoritesContainer.nextSibling);
      } else if (favorites.length === 0 && existingClearBtn) {
        existingClearBtn.remove();
      }
    })
    .catch(err => console.error('Error loading favorites:', err));
  }

  // ✅ NEW: Delete a favorite from json-server
  function deleteFavorite(id) {
    fetch(`${favoritesAPI}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        renderFavorites();
      })
      .catch(err => console.error('Failed to delete favorite:', err));
  }

  // ✅ NEW: Clear all favorites from server
  function clearAllFavorites() {
    fetch(favoritesAPI)
      .then(res => res.json())
      .then(favorites => {
        const deletePromises = favorites.map(fav =>
          fetch(`${favoritesAPI}/${fav.id}`, { method: 'DELETE' })
        );
  
        Promise.all(deletePromises).then(() => renderFavorites());
      })
      .catch(err => console.error('Error clearing all favorites:', err));
  }
  

  // ✅ NEW: Load favorites from json-server on page load
  function loadFavoritesFromServer() {
    fetch(favoritesAPI)
      .then(res => res.json())
      .then(data => {
        favorites = data;
        renderFavorites();
      });
  }

  // Optional form logic
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      console.log('Form submitted with:', Object.fromEntries(formData));
    });
  }

  // ✅ Initial load of favorites from server
  loadFavoritesFromServer();
});
