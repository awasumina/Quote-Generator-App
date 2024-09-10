let quote = document.getElementById("quote");
let author = document.getElementById("author");
let categorySelect = document.getElementById("category-select");
let nextBtn = document.getElementById("next-btn");
let previousBtn = document.getElementById("previous-btn");
let randomBtn = document.getElementById("random-btn");
let themeToggle = document.getElementById("theme-toggle");
let fontSelect = document.getElementById('font-select');
let fontSizeSelect = document.getElementById('font-size-select');

let quotesArray = [];
let currentIndex = 0;

const categories = ['science', 'inspire', 'life', 'wisdom', 'success', 'happiness'];

//display a quote
const displayQuote = (index) => {
  if (quotesArray.length > 0 && index >= 0 && index < quotesArray.length) {
    quote.innerText = quotesArray[index].content;
    author.innerText = quotesArray[index].author;
  }
};

// fetch quotes for the selected category
const getQuotes = (category) => {
  return fetch(`https://api.quotable.io/quotes?tags=${category}&limit=10`)
    .then((data) => data.json())
    .then((response) => response.results); 
};

const updateQuotesForCategory = async (category) => {
  quotesArray = await getQuotes(category); 
  currentIndex = 0;
  displayQuote(currentIndex); 
};

const fetchAllCategories = async () => {
  let allQuotes = [];

  for (let category of categories) {
    let quotes = await getQuotes(category);
    allQuotes = [...allQuotes, ...quotes]; 
  }
  return allQuotes;
};

nextBtn.addEventListener("click", () => {
  if (currentIndex < quotesArray.length - 1) {
    currentIndex++;
    displayQuote(currentIndex);
  }
});

previousBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayQuote(currentIndex);
  }
});

randomBtn.addEventListener("click", async () => {
  let allQuotes = await fetchAllCategories(); 
  let randomIndex = Math.floor(Math.random() * allQuotes.length); 
  quote.innerText = allQuotes[randomIndex].content;
  author.innerText = allQuotes[randomIndex].author;

  let randomCategory = categories[Math.floor(Math.random() * categories.length)];
  categorySelect.value = randomCategory;

  updateQuotesForCategory(randomCategory);
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".container").classList.toggle("dark-mode");
});

window.addEventListener("load", async () => {
  let defaultCategory = categorySelect.value;
  await updateQuotesForCategory(defaultCategory); 
  displayQuote(0); 
});

fontSelect.addEventListener('change', function() {
  const selectedFont = fontSelect.value;
  quote.style.fontFamily = selectedFont;
  author.style.fontFamily = selectedFont;
});

fontSizeSelect.addEventListener('change', function() {
  const selectedFontSize = fontSizeSelect.value;
  quote.style.fontSize = selectedFontSize;
  author.style.fontSize = selectedFontSize;
});
