document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const quoteAPI = 'http://localhost:3000/quotes';
  const dailyDoseBtn = document.querySelector('.btn.white'); // Get Daily Dose button
  const detailSection = document.querySelector('.detail');
  const inspireBtn = document.getElementById('inspirationBtn');
  const inspirationResult = document.getElementById('inspirationResult');
  const messages = [
    "You're glowing with ideas!",
    "Pretty inspired right now.",
    "Could use a boost...",
    "Time for a coffee break?",
    "Absolutely unstoppable!"
  ];

  // ------------------------------
  // Category Cards Hover Effect
  // ------------------------------
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  // ------------------------------
  // Get Daily Dose - Fetch from db.json
  // ------------------------------
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

  // ------------------------------
  // Show Quote in Detail Section
  // ------------------------------
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

    // Save to favorites from detail section
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', () => {
      saveToFavorites(quote);
      renderFavorites();
    });
  }

  // ------------------------------
  // Show Quote Below Hero Section
  // ------------------------------
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
      saveToFavorites(quote);
      renderFavorites();
    });
  }

  // ------------------------------
  // Inspiration Meter
  // ------------------------------
  if (inspireBtn) {
    inspireBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      inspirationResult.textContent = messages[randomIndex];
    });
  }

  // ------------------------------
  // Save to Favorites (localStorage)
  // ------------------------------
  function saveToFavorites(quote) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find(q => q.text === quote.text)) {
      favorites.push(quote);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  function renderFavorites() {
    const favoritesContainer = document.querySelector('.grid');
    if (!favoritesContainer) return;
  
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = ''; // Clear old
  
    favorites.forEach((fav, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="https://via.placeholder.com/300x200" alt="Favorite Quote">
        <h3>${fav.author || 'Unknown Author'}</h3>
        <p>"${fav.text}"</p>
        <button class="delete-btn btn small" data-index="${index}">Delete</button>
      `;
  
      card.querySelector('.delete-btn').addEventListener('click', (e) => {
        const idx = e.target.dataset.index;
        deleteFavorite(idx);
      });
  
      favoritesContainer.appendChild(card);
    });
  
    // 👉 Append Clear All button if there are any favorites
    let existingClearBtn = document.getElementById('clearFavoritesBtn');
    if (!existingClearBtn && favorites.length > 0) {
      const clearBtn = document.createElement('button');
      clearBtn.id = 'clearFavoritesBtn';
      clearBtn.className = 'btn red';
      clearBtn.textContent = 'Clear All Favorites';
      clearBtn.addEventListener('click', () => {
        localStorage.removeItem("favorites");
        renderFavorites();
      });
  
      // Insert after the favorites container
      favoritesContainer.parentNode.insertBefore(clearBtn, favoritesContainer.nextSibling);
    } else if (favorites.length === 0 && existingClearBtn) {
      existingClearBtn.remove(); // Remove if no favorites left
    }
  }
  

  function deleteFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(index, 1); // Remove by index
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites(); // Re-render UI
  }

  // ------------------------------
  // Optional: Handle Form Submission
  // ------------------------------
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      console.log('Form submitted with:', Object.fromEntries(formData));
    });
  }

  // Initial load of favorites
  renderFavorites();
});
