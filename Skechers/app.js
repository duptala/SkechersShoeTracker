const searchButton = document.querySelector('.search-button');
const searchBarInput = document.querySelector('.search-input');
const queryResult = document.querySelector('.search-result');
const grids = document.querySelectorAll(".grid-items");


// Load up shoe sections with existing shoes
async function populateSectionsWithShoes() {
  // getting all the shoes
  const response = await fetch('https://gray-beaver-coat.cyclic.app/shoes/getallshoes');
  const stockInfo = await response.json();
    stockInfo.forEach(stock => {
      const gridID = stock['section_name'];
      grids.forEach(grid => {
        if (grid.id === gridID) {
          const gridElement = document.getElementById(grid.id);
          gridElement.setAttribute("data-content", stock['shoesID'])
          gridElement.classList.add("has-stock");
        }
      })
    })
}
// populating all the shoe stock
populateSectionsWithShoes();

async function insertShoeIntoSection(stock, section_name) {
  await fetch(`https://gray-beaver-coat.cyclic.app/shoes/insert/${stock}/${section_name}`);
}

async function updateShoeIntoSection(stock, section_name) {
  await fetch(`https://gray-beaver-coat.cyclic.app/shoes/update/${stock}/${section_name}`);
}

async function deleteShoesIntoSection(section_name) {
  await fetch(`https://gray-beaver-coat.cyclic.app/shoes/delete/${section_name}`);
}



function searchShoe() {
  const code = searchBarInput.value.trim();
  queryResult.classList.remove("error");
  queryResult.classList.remove("success");

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
        queryResult.classList.add("success");
      } else {
        queryResult.textContent = "Shoe NOT found.. 🙁";
        queryResult.classList.remove("success");
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
      // disabling other buttons when edit mode or delete mode is on
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
    if (isEditMode === false) { // if edit is not enabled, enable disable btn
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

    function saveShoe(contentInput, grid, gridElement, editDialog) {
      const stock = contentInput.value;
      if (gridElement.getAttribute("data-content").length === 0) {
        insertShoeIntoSection(stock, grid.id); // if no data exists, insert
      } else {
        updateShoeIntoSection(stock, grid.id); // else, update it so no new tuple in D.B
      }
      gridElement.setAttribute("data-content", contentInput.value);
       // CALLING THE FUNCTION TO UPDATE IN SQL DATABASE
      gridElement.classList.add("has-stock");
      // populateSectionsWithShoes();
      // updating dialog (because user is not refreshing to fetch the results again)
      dialogContent.textContent = contentInput.value;
      queryResult.textContent = "Shoe successfully added!";
      queryResult.classList.add("success");
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
          const contentInput = document.createElement("textarea");
          const saveButton = document.createElement("button");
          const cancelButton = document.createElement("button");
    
          editDialog.classList.add("edit-dialog");
          contentInput.classList.add("edit-dialog-textarea");
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
            saveShoe(contentInput, grid, gridElement, editDialog);
          });
    
          contentInput.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
              saveShoe(contentInput, grid, gridElement, editDialog);
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
            queryResult.classList.remove("success");
            queryResult.classList.add("error");
          } else {
            const section_name = grid.id;
            queryResult.textContent = "Stock section deleted!";
            queryResult.classList.add("success");
            gridElement.setAttribute("data-content", "");
            deleteShoesIntoSection(section_name); // UPDATING THE DATABASE
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

