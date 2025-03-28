
🌞 Daily Dose

Created by: Njue Sharon Kendi  
Project Type: Single Page Application (SPA)  
Tech Stack: HTML, CSS, JavaScript, JSON Server

---

📌 Description

Daily Dose is a motivational quote web app that gives users a daily boost of inspiration through curated quotes. The app features:

- 🎯 A hero section with a “Get Daily Dose” button  
- 🗂️ Quote categories like Love, Wisdom, and Motivation  
- 🔋 An Inspiration Meter to check your vibe  
- ❤️ A Favorites section for saved quotes  
- 🎨 Interactive UI with animations and hover effects  
- 🔧 JSON Server for storing quote data  
- 💾 LocalStorage support for persisting user favorites  
- 🚫 Duplicate prevention in the favorites list  
- 🧠 Future support for API-based quote generation

Project Structure
quote-generator/  
├── index.html          # Main HTML file  
├── script.js           # All JavaScript logic  
├── styles.css          # Styling  
├── images/             # Contains category images  
│   ├── love.jpg        # Love-themed background  
│   ├── self.jpg        # Self-improvement background  
│   └── work.jpg        # Work-themed background  
├── db.json             # Mock database (for JSON Server)  
└── README.md           # This file  

🛠️ How to Run the Project Locally

Clone the repository
   ```bash
   git clone https://github.com/RoseofKendy/daily-dose.git (https)
   git clone git@github.com:RoseofKendy/daily-dose.git (SSH)
   cd daily-dose

Start the JSON Server
   ```bash
   npm install -g json-server
   json-server --watch db.json
   

Open the App
   - Open `index.html` in your browser  
   - Or use Live Server in VS Code for auto-refresh

How to Use 🖱️
Generate a Random Quote
Click "Give me a daily dose" for a random quote.
Filter by Category
Select a category (e.g., "Love") and click "Generate from Category".
Save Favorites
Click "Save to Favorites" to bookmark quotes.
Toggle Dark Mode
Click the 🌙/☀️ icon in the top-right corner.
Check Your Inspiration Level
Click "Check My Inspiration" for a fun motivational tip!

Features ✨
🔄 Random Quote Generation - Get a daily dose of inspiration.
🏷️ Category Filtering - Choose quotes by theme (Love, Self, Work, etc.).
❤️ Save Favorites - Bookmark your favorite quotes.
🌓 Dark/Light Mode - Toggle between themes for comfortable reading.
📊 Inspiration Checker - Get a fun "inspiration level" assessment.
🗑️ Clear Favorites - Remove saved quotes easily.

Contributing 🤝
Feel free to fork, open issues, or submit PRs!
Fork the repo.
Create a branch (git checkout -b feature/new-category).
Commit changes (git commit -m "Add new quote category").
Push (git push origin feature/new-category).
Open a Pull Request.

Preview the Project
👉 https://daily-dose-umber.vercel.app

Git: https://github.com/RoseofKendy/daily-dose

Enjoy the quotes! ✨