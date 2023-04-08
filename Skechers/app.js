const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-input');
const queryResult = document.querySelector('.search-result');
const grids = document.querySelectorAll(".grid-items");

// trying to find a dataset match when user enters shoe code
searchButton.addEventListener("click", () => { 
    const code = searchBarInput.value.trim();
    queryResult.classList.remove("error");
    queryResult.classList.remove("found");

    if (code==="") { // if code empty, output error
        queryResult.textContent = "⚠️ Please enter a valid shoe code! ⚠️"
        queryResult.classList.add("error");
        grids.forEach((grid) => {
            grid.classList.remove("highlight");
        });
    } else {
    let found = false;
    grids.forEach((grid) => {
      const content = grid.dataset.content;
      if (content && code && content.split(",").map(c => c.trim()).includes(code)) {
            grid.classList.add("highlight");
            found = true;
      } else {
        grid.classList.remove("highlight");
      }
      if (found) {
        queryResult.textContent = "Shoe found! 😄"
        queryResult.classList.add("found");
      } else {
        queryResult.textContent = "Shoe NOT found.. 🙁";
        queryResult.classList.remove("found");
        queryResult.classList.add("error");
      }
    });
    }
  });

  const dialog = document.getElementById("dialog");
  const dialogContent = document.getElementById("dialog-content");
  const closeBtn = document.getElementsByClassName("close")[0];
  const editBtn = document.querySelector('.edit-button');
  const deleteBtn = document.querySelector('.delete-content-button');
  let isEditMode = false;

  // checking whether in edit mode or not
  editBtn.addEventListener("click", () => {
    isEditMode = !isEditMode;
    if(isEditMode) {
        editBtn.textContent = "Exit Edit Mode";
    } else {
        editBtn.textContent = "Enter Edit Mode";
    }
  });

  // deleting selected grids for when shoe boxes are moved
  deleteBtn.addEventListener("click", () => {
    grids.forEach((grid) => {
        grid.dataset.content = '';
      })
    });

    // functionality for editing grid and updating values
  grids.forEach((grid) => {
    grid.addEventListener("click", () => {
      const gridId = grid.id;
      const gridElement = document.getElementById(gridId);
  
      if (isEditMode) {
        // Create a new edit dialog for this grid element
        const editDialog = document.createElement("dialog");
        const contentInput = document.createElement("input");
        const saveButton = document.createElement("button");
        const cancelButton = document.createElement("button");

        editDialog.classList.add("edit-dialog");
        contentInput.classList.add("edit-dialog-input");
        saveButton.classList.add("edit-dialog-save-btn");
        cancelButton.classList.add("edit-dialog-cancel-btn");
  
        editDialog.appendChild(contentInput);
        editDialog.appendChild(saveButton);
        editDialog.appendChild(cancelButton);
        document.body.appendChild(editDialog);
  
        contentInput.type = "text";
        contentInput.value = gridElement.getAttribute("data-content");
  
        saveButton.type = "button";
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {
          gridElement.setAttribute("data-content", contentInput.value);
          dialogContent.textContent = contentInput.value;
          editDialog.close();
        });
  
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => {
          editDialog.close();
        });
  
        editDialog.showModal();
  
        editDialog.addEventListener("close", () => {
          // Remove the edit dialog from the DOM when it's closed
          document.body.removeChild(editDialog);
        });
      } else {
        const content = gridElement.getAttribute("data-content");
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


  
