let quote = document.getElementById("quote");
let author = document.getElementById("author");
let categorySelect = document.getElementById("category-select");
let nextBtn = document.getElementById("next-btn");
let previousBtn = document.getElementById("previous-btn");
let randomBtn = document.getElementById("random-btn");

let quotesArray = [];
let currentIndex = 0;

// Categories list
const categories = ['science', 'inspire', 'life', 'wisdom', 'success', 'happiness'];

// Function to display a quote based on the current index
const displayQuote = (index) => {
  if (quotesArray.length > 0 && index >= 0 && index < quotesArray.length) {
    quote.innerText = quotesArray[index].content;
    author.innerText = quotesArray[index].author;
  }
};

// Function to fetch quotes for the selected category
const getQuotes = (category) => {
  return fetch(`https://api.quotable.io/quotes?tags=${category}&limit=10`)
    .then((data) => data.json())
    .then((response) => response.results); // Return the quotes array
};

// Fetch quotes when a category is selected
const updateQuotesForCategory = async (category) => {
  quotesArray = await getQuotes(category); // Fetch quotes for the selected category
  currentIndex = 0;
  displayQuote(currentIndex); // Display the first quote
};

// Fetch and combine quotes from all selected categories for the Random button
const fetchAllCategories = async () => {
  let allQuotes = [];

  // Fetch quotes for each category and add them to allQuotes array
  for (let category of categories) {
    let quotes = await getQuotes(category);
    allQuotes = [...allQuotes, ...quotes]; // Combine quotes from each category
  }
  return allQuotes;
};

// Navigate to the next quote
nextBtn.addEventListener("click", () => {
  if (currentIndex < quotesArray.length - 1) {
    currentIndex++;
    displayQuote(currentIndex);
  }
});

// Navigate to the previous quote
previousBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayQuote(currentIndex);
  }
});

// Random button event listener to show a random quote from all categories
randomBtn.addEventListener("click", async () => {
  let allQuotes = await fetchAllCategories(); // Fetch quotes from all categories
  let randomIndex = Math.floor(Math.random() * allQuotes.length); // Select random quote
  quote.innerText = allQuotes[randomIndex].content;
  author.innerText = allQuotes[randomIndex].author;

  // Select a random category and update the dropdown
  let randomCategory = categories[Math.floor(Math.random() * categories.length)];
  categorySelect.value = randomCategory;

  // Fetch quotes for the new category
  updateQuotesForCategory(randomCategory);
});

// Fetch and display quotes on page load for the default selected category
window.addEventListener("load", async () => {
  let defaultCategory = categorySelect.value;
  await updateQuotesForCategory(defaultCategory); // Fetch quotes for the default category
  displayQuote(0); // Display the first quote on page load
});
