const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-bar');
const shoeCodeOutput = document.querySelector('.output');

searchButton.addEventListener('click', () => { 
    const code = searchBarInput.value;

    shoeCodeOutput.textContent = code;
})
