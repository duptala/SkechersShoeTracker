const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-input');
const queryResult = document.querySelector('.search-result');
const grids = document.querySelectorAll(".grid-items");


async function populateSectionsWithShoes() {
  // getting all the shoes
  const response = await fetch('http://localhost:3000/shoes/getallshoes');
  const stockInfo = await response.json();
    stockInfo.forEach(stock => {
      const gridID = stock['section_name'];
      grids.forEach(grid => {
        if (grid.id === gridID) {
          const gridElement = document.getElementById(grid.id);
          gridElement.setAttribute("data-content", stock['shoeID'])
        }
      })
    })
}

populateSectionsWithShoes();


function searchShoe() {
  const code = searchBarInput.value.trim();
  queryResult.classList.remove("error");
  queryResult.classList.remove("found");

  if (code === "") {
    queryResult.textContent = "⚠️ Please enter a valid shoe code! ⚠️";
    queryResult.classList.add("error");
    grids.forEach((grid) => {
      grid.classList.remove("highlight");
    });
  } else {
    let found = false;
    grids.forEach((grid) => {
      const content = grid.dataset.content;
      if (
        content &&
        code &&
        content.split(",").map((c) => c.trim()).includes(code)
      ) {
        grid.classList.add("highlight");
        found = true;
      } else {
        grid.classList.remove("highlight");
      }
      if (found) {
        queryResult.textContent = "Shoe found! 😄";
        queryResult.classList.add("found");
      } else {
        queryResult.textContent = "Shoe NOT found.. 🙁";
        queryResult.classList.remove("found");
        queryResult.classList.add("error");
      }
    });
  }
}

// SEARCHING FOR SHOE ON INPUT (button + enter)
searchButton.addEventListener("click", searchShoe);
searchBarInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    searchShoe();
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

    function saveShoe(contentInput, gridElement, editDialog) {
      gridElement.setAttribute("data-content", contentInput.value);
      gridElement.classList.add("has-stock");
      dialogContent.textContent = contentInput.value;
      queryResult.textContent = "Shoe successfully added!";
      queryResult.classList.add("found");
      editDialog.close();
    }
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
    
          // save button event listener
          saveButton.type = "button";
          saveButton.textContent = "Save";
          saveButton.addEventListener("click", () => {
            saveShoe(contentInput, gridElement, editDialog);
          });
    
          contentInput.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
              saveShoe(contentInput, gridElement, editDialog);
            }
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
            gridElement.classList.remove("has-stock");
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


document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "Escape") {
    dialog.style.display = "none";
  }
});

window.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.style.display = "none";
  }
});

