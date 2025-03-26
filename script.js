document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
  
    // ------------------------------
    // Inspiration Meter Button Logic
    // ------------------------------
    const inspireBtn = document.getElementById('inspirationBtn');
    const inspirationResult = document.getElementById('inspirationResult');
  
    const messages = [
      "You're glowing with ideas!",
      "Pretty inspired right now.",
      "Could use a boost...",
      "Time for a coffee break?",
      "Absolutely unstoppable!"
    ];
  
    if (inspireBtn) {
      inspireBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        inspirationResult.textContent = messages[randomIndex];
      });
    }
  
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
    const getDoseBtn = document.querySelector('.btn.white');
    let currentQuote = null;
  
    getDoseBtn.addEventListener('click', () => {
      fetch('http://localhost:3000/quotes')
        .then(res => res.json())
        .then(data => {
          const randomQuote = data[Math.floor(Math.random() * data.length)];
          currentQuote = randomQuote;
          showQuote(randomQuote);
        })
        .catch(err => {
          console.error('Error fetching quotes:', err);
          alert('Failed to fetch quote. Please try again later.');
        });
    });
  
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
  
      // Attach event to new save button
      const saveBtn = document.getElementById('saveQuoteBtn');
      saveBtn.addEventListener('click', () => {
        saveToFavorites(quote);
        renderFavorites();
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
  
      favorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="https://via.placeholder.com/300x200" alt="Favorite Quote">
          <h3>${fav.author || 'Unknown Author'}</h3>
          <p>"${fav.text}"</p>
        `;
        favoritesContainer.appendChild(card);
      });
    }
  
    // Render on page load
    renderFavorites();
  
    // ------------------------------
    // Optional: Form Handling Example
    // ------------------------------
    const form = document.getElementById('quote-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted with:', Object.fromEntries(formData));
      });
    }
  });
  