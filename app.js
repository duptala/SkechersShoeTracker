const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-bar');
const shoeCodeOutputStatus = document.querySelector('.output-status');

// reading shoe code input from user and dsi
searchButton.addEventListener("click", () => { 
  const code = searchBarInput.value;
  shoeCodeOutputStatus.textContent = code;
  
  // highlight matching grid
  grids.forEach((grid) => {
    if (grid.dataset.content.includes(code)) {
      grid.classList.add("highlight");
    } else {
      grid.classList.remove("highlight");
    }
  });
});

const grids = document.querySelectorAll(".grid");
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialog-content");
const closeBtn = document.getElementsByClassName("close")[0];
const editBtn = document.getElementById("edit-button");
let isEditMode = false;

// toggle edit mode
editBtn.addEventListener("click", () => {
  isEditMode = !isEditMode;
  if (isEditMode) {
    editBtn.textContent = "Exit Edit Mode";
  } else {
    editBtn.textContent = "Enter Edit Mode";
  }
});

// edit grid data-content
grids.forEach((grid) => {
  grid.addEventListener("click", () => {
    if (isEditMode) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = grid.dataset.content;
      input.addEventListener("blur", () => {
        const content = input.value;
        grid.dataset.content = content;
        dialogContent.textContent = content;
        input.parentNode.replaceChild(grid, input);
      });
      grid.parentNode.replaceChild(input, grid);
      input.focus();
    } else {
      const content = grid.dataset.content;
      dialogContent.textContent = content;
      dialog.style.display = "block";
    }
  });
});

// close dialog
closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.style.display = "none";
  }
});
