const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-bar');
const shoeCodeOutputStatus = document.querySelector('.output-status');

// reading shoe code input from user and dsi
searchButton.addEventListener("click", () => { 
    // input code
  const code = searchBarInput.value.trim();
  let found = false;
  grids.forEach((grid) => {
    const content = grid.dataset.content.trim();
    if (code && content.split(",").map(c => c.trim()).includes(code)) {
      grid.classList.add("highlight");
      found = true;
    } else {
      grid.classList.remove("highlight");
    }
  });
  
  if (found) {
    shoeCodeOutputStatus.textContent = "Found";
    shoeCodeOutputStatus.classList.add("found");
  } else {
    shoeCodeOutputStatus.textContent = "Could not find, please look in store";
    shoeCodeOutputStatus.classList.remove("found");
  }
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
