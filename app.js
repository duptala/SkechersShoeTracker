const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-bar');
const shoeCodeOutputStatus = document.querySelector('.output-status');

searchButton.addEventListener("click", () => { 
    const code = searchBarInput.value;

    shoeCodeOutputStatus.textContent = code;
})

// adding all the necessary things
const grids = document.querySelectorAll(".grid");
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialog-content");
const closeBtn = document.getElementsByClassName("close")[0];

searchButton.addEventListener("click", () => {
  const searchTerm = searchBar.value;
  output.textContent = searchTerm;
});

grids.forEach((grid) => {
  grid.addEventListener("click", () => {
    const content = grid.dataset.content;
    dialogContent.textContent = content;
    dialog.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.style.display = "none";
  }
});