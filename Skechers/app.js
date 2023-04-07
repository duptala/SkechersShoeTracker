const searchButton = document.querySelector('.search-button');
const shoeSearchInput = document.querySelector('.search-input');
const queryResult = document.querySelector('.search-result')

searchButton.addEventListener("click", () => {
    const code = shoeSearchInput.value.trim();
    queryResult.innerHTML = code;
});