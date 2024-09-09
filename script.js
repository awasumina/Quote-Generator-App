let quote = document.getElementById("quote");
let author = document.getElementById("author");
let categorySelect = document.getElementById("category-select");
let nextBtn = document.getElementById("next-btn");
let previousBtn = document.getElementById("previous-btn");

let quotesArray = [];
let currentIndex = 0;

// Function to display a quote based on the current index
const displayQuote = (index) => {
  if (quotesArray.length > 0 && index >= 0 && index < quotesArray.length) {
    quote.innerText = quotesArray[index].content;
    author.innerText = quotesArray[index].author;
  }
};

// Function to fetch quotes based on the selected category
const getQuotes = () => {
  let category = categorySelect.value;
  let url = `https://api.quotable.io/quotes?tags=${category}&limit=10`;

  fetch(url)
    .then((data) => data.json())
    .then((response) => {
      quotesArray = response.results; // Store quotes in an array
      currentIndex = 0; // Reset to the first quote
      displayQuote(currentIndex); // Display the first quote
    });
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

// Fetch quotes when the category is changed
categorySelect.addEventListener("change", getQuotes);

// Fetch quotes on page load
window.addEventListener("load", getQuotes);
