const grids = document.querySelectorAll('.grid');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

// Generate a random shoe code
// function generateShoeCode() {
//   let code = '';
//   for (let i = 0; i < 6; i++) {
//     if (i < 3) {
//       code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
//     } else {
//       code += numbers.charAt(Math.floor(Math.random() * numbers.length));
//     }
//   }
//   return code;
// }

// Add random shoe codes to the grids
grids.forEach(grid => {
  const stockNumber = generateShoeCode();
  const stockNumberElement = document.createElement('p');
  stockNumberElement.classList.add('stock-number');
  stockNumberElement.innerText = stockNumber;
  grid.appendChild(stockNumberElement);
});

// Handle search form submission
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = searchInput.value.toUpperCase();
  grids.forEach(grid => {
    const stockNumber = grid.querySelector('.stock-number').innerText;
    if (stockNumber.toUpperCase() === searchValue) {
      grid.classList.add('highlight');
    } else {
      grid.classList.remove('highlight');
    }
  });
});

// Handle modal window display
grids.forEach(grid => {
  grid.addEventListener('click', () => {
    const gridId = grid.getAttribute('data-id');
    const stockNumber = grid.querySelector('.stock-number').innerText;
    const gridIdElement = document.querySelector('#grid-id');
    const stockNumberElement = document.querySelector('#stock-number');
    gridIdElement.innerText = gridId;
    stockNumberElement.innerText = stockNumber;
    modal.style.display = 'block';
  });
});

// Handle modal window close
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
