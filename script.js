// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
  
    // Inspiration Meter button logic
    const inspireBtn = document.getElementById('inspire-btn');
    const meterValue = document.getElementById('inspiration-meter-value');
    
    const messages = [
      "You're glowing with ideas!",
      "Pretty inspired right now.",
      "Could use a boost...",
      "Time for a coffee break?",
      "Absolutely unstoppable!"
    ];
  
    inspireBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      meterValue.textContent = messages[randomIndex];
    });
  
    // Add mouseenter event to category cards for a subtle visual cue
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hovered');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
      });
    });
  
    // Save to Favorites logic
    const saveButtons = document.querySelectorAll('.btn.dark, .btn.light');
    saveButtons.forEach(button => {
      button.addEventListener('click', () => {
        alert('Quote saved to favorites!');
        // Implement storage logic later (e.g., localStorage or backend)
      });
    });
  
    // Example of handling a form submission (if applicable)
    const form = document.getElementById('quote-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted with:', Object.fromEntries(formData));
        // Implement form processing logic
      });
    }
  });
  