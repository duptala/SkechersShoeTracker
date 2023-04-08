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
  let isDeleteMode = false;

  // checking whether in edit mode or not
  editBtn.addEventListener("click", () => {
    if (isDeleteMode === false) {
      isEditMode = !isEditMode;

      if(isEditMode && isDeleteMode === false) {
        editBtn.textContent = "Exit Edit Mode";
        searchBarInput.disabled = true;
        searchButton.disabled = true;
        isDeleteMode.disabled = true;
        editBtn.classList.add("edit-btn-state");
      } else {
        searchBarInput.disabled = false;
        searchButton.disabled = false;
        isDeleteMode.disabled = false;
        editBtn.textContent = "Enter Edit Mode";
        editBtn.classList.remove("edit-btn-state");
      }
    }
    
  });

  // adding delete button functionality
  deleteBtn.addEventListener("click", () => {
    if (isEditMode === false) {
      isDeleteMode = !isDeleteMode;
      if (isDeleteMode) {
        isEditMode.disabled = true;
        searchBarInput.disabled = true;
        searchButton.disabled = true;
        deleteBtn.textContent = "Exit Delete Mode"
        deleteBtn.classList.add("delete-btn-state");
      } else {
        searchBarInput.disabled = false;
        searchButton.disabled = false;
        isEditMode.disabled = false;
        deleteBtn.textContent = "Delete Stock"
        deleteBtn.classList.remove("delete-btn-state");
      }
    }
    
  });

    // functionality for editing grid and updating values
    grids.forEach((grid) => {
      grid.addEventListener("click", () => {
        const gridId = grid.id;
        const gridElement = document.getElementById(gridId);
    
        if (isEditMode && isDeleteMode === false) {
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
            // // INDICATING THAT STOCK IS ADDED
            // var newDiv = document.createElement("div");
            // grid.append(newDiv);
            // newDiv.style.position = "relative";
            // newDiv.style.top = "4px";
            // newDiv.style.left = "4px";
            // newDiv.style.backgroundColor = "rgb(0, 255, 213)";
            // newDiv.style.borderRadius = "50%";
            // newDiv.style.width = "5px";
            // newDiv.style.height = "5px";
            // newDiv.style.zIndex = 2;
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
        } else if (isDeleteMode && isEditMode === false) { // delete mode

          // only showing success "shoe deleted if stock existed before"
          if (gridElement.getAttribute("data-content").length === 0) {
            queryResult.textContent = "Stock already empty";
            queryResult.classList.remove("found");
            queryResult.classList.add("error");
          } else {
            queryResult.textContent = "Stock section deleted!";
            queryResult.classList.add("found");
            gridElement.setAttribute("data-content", "");
            grid.classList.remove("highlight");
            if (newDiv) {
              newDiv.remove();
            }
          }          
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


  
