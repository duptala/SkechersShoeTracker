const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-bar');
const shoeCodeOutputStatus = document.querySelector('.output-status');

// reading shoe code input from user and dsi
searchButton.addEventListener("click", () => { 
    const code = searchBarInput.value;
    shoeCodeOutputStatus.textContent = code;
});

const grids = document.querySelectorAll(".grid");
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialog-content");
const closeBtn = document.getElementsByClassName("close")[0];
const editBtn = document.getElementById("edit-button");
let isEditMode = false;
let currentGrid = null;

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
      currentGrid = grid;
      dialogContent.setAttribute("contenteditable", true);
      dialogContent.textContent = grid.dataset.content;
      dialog.style.display = "block";
    } else {
      const content = grid.dataset.content;
      dialogContent.textContent = content;
      dialog.style.display = "block";
    }
  });
});

// close dialog
closeBtn.addEventListener("click", () => {
  if (isEditMode) {
    currentGrid.dataset.content = dialogContent.textContent;
    currentGrid = null;
    dialogContent.setAttribute("contenteditable", false);
  }
  dialog.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == dialog) {
    if (isEditMode) {
      currentGrid.dataset.content = dialogContent.textContent;
      currentGrid = null;
      dialogContent.setAttribute("contenteditable", false);
    }
    dialog.style.display = "none";
  }
});
