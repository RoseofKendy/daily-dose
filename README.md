
# 🌞 Daily Dose

**Created by:** Njue Sharon Kendi  
**Project Type:** Single Page Application (SPA)  
**Tech Stack:** HTML, CSS, JavaScript, JSON Server

---

## 📌 Description

**Daily Dose** is a motivational quote web app that gives users a daily boost of inspiration through curated quotes. The app features:

- 🎯 A hero section with a “Get Daily Dose” button  
- 🗂️ Quote categories like Love, Wisdom, and Motivation  
- 🔋 An Inspiration Meter to check your vibe  
- ❤️ A Favorites section for saved quotes  
- 🎨 Interactive UI with animations and hover effects  
- 🔧 JSON Server for storing quote data  
- 💾 LocalStorage support for persisting user favorites  
- 🚫 Duplicate prevention in the favorites list  
- 🧠 Future support for API-based quote generation



🛠️ How to Run the Project Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/RoseofKendy/daily-dose.git (https)
   git clone git@github.com:RoseofKendy/daily-dose.git (SSH)
   cd daily-dose
   ```

2. **Start the JSON Server**
   ```bash
   npm install -g json-server
   json-server --watch db.json
   ```

3. **Open the App**
   - Open `index.html` in your browser  
   - Or use Live Server in VS Code for auto-refresh

---

## 🚀 Features Implemented So Far

- ✅ Full HTML structure and semantic layout  
- ✅ Custom styling using CSS (responsive and themed)  
- ✅ JavaScript interactivity (clicks, hover, UI feedback)  
- ✅ Quote categories display with images and sample quotes  
- ✅ Inspiration Meter with randomized positive messages  
- ✅ Static and dynamic Favorites section  
- ✅ LocalStorage support to persist user favorites  
- ✅ Duplicate prevention logic when saving to favorites  
- ✅ JSON Server setup with over 100 quotes (`db.json`)  
- ✅ Basic structure for category-based quote rendering

---

## 📌 To-Do

- [ ] Fetch and display quotes dynamically from `db.json`  
- [ ] Implement quote generator based on selected category  
- [ ] Dynamically render favorites from localStorage  
- [ ] Add feature to remove quotes from favorites  
- [ ] Integrate ZenQuotes API or similar for live content  
- [ ] Polish the UI and fix minor layout bugs  
- [ ] Add animations for quote transitions  
