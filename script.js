let quote = document.getElementById("quote");
let author = document.getElementById("author");
let categorySelect = document.getElementById("category-select");
let nextBtn = document.getElementById("next-btn");
let previousBtn = document.getElementById("previous-btn");
let randomBtn = document.getElementById("random-btn");

let quotesArray = [];
let currentIndex = 0;


const categories = ['science', 'inspire', 'life', 'wisdom', 'success', 'happiness'];

// display a quote
const displayQuote = (index) => {
  if (quotesArray.length > 0 && index >= 0 && index < quotesArray.length) {
    quote.innerText = quotesArray[index].content;
    author.innerText = quotesArray[index].author;
  }
};

// Fetch quotes for the selected category
const getQuotes = (category) => {
  return fetch(`https://api.quotable.io/quotes?tags=${category}&limit=10`)
    .then((data) => data.json())
    .then((response) => response.results); // Return the quotes array
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

window.addEventListener("load", async () => {
  let defaultCategory = categorySelect.value;
  await updateQuotesForCategory(defaultCategory); 
  displayQuote(0);
});
