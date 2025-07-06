let quotes = [];

// Load saved quotes from localStorage or use default ones
function loadQuotes() {
  const saved = localStorage.getItem("quotes");
  if (saved) {
    quotes = JSON.parse(saved);
  } else {
    quotes = [
      { text: "The only way to do great work is to love what you do.", category: "Motivation" },
      { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
      { text: "You miss 100% of the shots you don’t take.", category: "Encouragement" }
    ];
    saveQuotes();
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote, optionally filtered by category
function displayRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");

  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.innerText = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];
  quoteDisplay.innerText = `"${quote.text}" — ${quote.category}`;
}

// Create the "Add Quote" form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

  document.body.appendChild(formContainer);

  // Attach event listener to the dynamically created button
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Add a new quote to the list and update everything
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategoryFilter();
    displayRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

// Populate the category filter dropdown with unique categories
function populateCategoryFilter() {
  const select = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  select.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Initialize everything on page load
window.onload = function () {
  loadQuotes();
  createAddQuoteForm();
  populateCategoryFilter();
  displayRandomQuote();

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("categoryFilter").addEventListener("change", displayRandomQuote);
};

  

