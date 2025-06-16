const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const themeToggler = document.getElementById("theme-toggler");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;

  if (!searchTerm) {
    return;
  }

  try {
    searchResults.innerHTML = '<div class="spinner">Loading...</div>';

    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`
    );

    const data = await response.json();

    displayResults(data.query.search);
  } catch (error) {
    searchResults.innerHTML =
      "<p>An error occurred while searching. Please try again later.</p>";
    console.error(error);
  }
});

function displayResults(results) {
  searchResults.innerHTML = "";

  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";

    resultItem.innerHTML = `
            <h3 class="result-title">${result.title}</h3>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" class="result-link" target="_blank">
                Read More
            </a>
            <p class="result-snippet">${result.snippet}</p>
        `;

    searchResults.appendChild(resultItem);
  });
}
