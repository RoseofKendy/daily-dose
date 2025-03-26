# 🌞 Daily Dose

Created by: Njue Sharon Kendi

Project Type: Single Page Application (SPA)  
Tech Stack: HTML, CSS, JavaScript, JSON Server

---

📌 Description

**Daily Dose** is a motivational quote web app that gives users a daily boost of inspiration through curated quotes. The app features:

- A hero section with a “Get Daily Dose” button
- Quote categories like Love, Self and Work.
- An Inspiration Meter to check your vibe.
- A Favorites section for saved quotes.
- Interactive UI with animations and hover effects.
- Future support for API-based quote generation and localStorage-based favorites.

🛠️ How to Run the Project Locally

1. Clone the repository:
     bash
   git clone https://github.com/RoseofKendy/daily-dose (https)
   git clone git@github.com:RoseofKendy/daily-dose.git (SSH)
   cd daily-dose

2. Start the JSON Server
    bash
  npm install -g json-server
  json-server --watch db.json

3. Launch index.html on browser or use Live server (VS Code extension)


🚀 Features Implemented So Far
HTML structure and content layout

Custom styling using CSS

JavaScript interactivity (hover effects, click events)

Static "Inspiration Meter" logic

Quote categories display

JSON server setup with sample quotes (db.json)

UI buttons for fetching quotes and saving favorites (logic to be completed)

📌 To-Do
 Fetch quotes from db.json using fetch()

 Save favorite quotes to localStorage

 Dynamically render favorites section

 Implement quote generator based on selected category

 Clean up UI bugs and optimize code


