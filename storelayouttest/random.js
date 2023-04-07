const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-input');

// reading shoe code input from user and dsi
searchButton.addEventListener("click", () => { 
  // input code
  const code = searchBarInput.value.trim();
  let found = false;
  grids.forEach((grid) => {
    const content = grid.dataset.content;
    if (content && code && content.split(",").map(c => c.trim()).includes(code)) {
        console.log(`Highlighting grid ${grid.id}`);
      grid.classList.add("highlight");
      found = true;
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
      const editDialog = document.getElementById("edit-dialog");
      const contentInput = editDialog.querySelector("#grid-content");
      contentInput.value = grid.dataset.content;
      editDialog.showModal();

      editDialog.addEventListener("close", () => {
        grid.dataset.content = contentInput.value;
        dialogContent.textContent = contentInput.value;
      });

      editDialog.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        editDialog.close();
      });
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
