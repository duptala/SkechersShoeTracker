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

  // deleting all content
  deleteBtn.addEventListener("click", () => {
    grids.forEach((grid) => {
        grid.dataset.content = '';
      })
    });

  // grids.forEach((grid) => {
  //   grid.addEventListener("click", () => {
  //     const gridId = grid.id;
  //     const gridElement = document.getElementById(gridId);
  
  //     if (isEditMode) {
  //       // Create a new instance of the edit dialog for this grid element
  //       const editDialog = document.createElement("dialog");
  //       editDialog.id = `edit-dialog-${gridId}`;
  //       editDialog.innerHTML = `
  //         <form>
  //           <label for="grid-content-${gridId}">Content:</label>
  //           <input type="text" id="grid-content-${gridId}" name="grid-content" value="${gridElement.getAttribute("data-content")}">
  //           <button type="submit">Save</button>
  //           <button type="button" id="cancel-btn">Cancel</button>
  //         </form>
  //       `;
  
  //       document.body.appendChild(editDialog);
  
  //       const contentInput = editDialog.querySelector(`#grid-content-${gridId}`);
  //       const cancelButton = editDialog.querySelector("#cancel-btn");
  
  //       editDialog.showModal();
  
  //       cancelButton.addEventListener("click", () => {
  //         editDialog.close();
  //       });
  
  //       editDialog.addEventListener("close", () => {
  //         // Remove the edit dialog from the DOM when it's closed
  //         document.body.removeChild(editDialog);
  //       });
  
  //       editDialog.querySelector("form").addEventListener("submit", (event) => {
  //         event.preventDefault(); // prevents page refresh
  //         const newContent = contentInput.value;
  //         gridElement.setAttribute("data-content", newContent);
  //         dialogContent.textContent = newContent;
  //         editDialog.close();
  //       });
  //     } else {
  //       const content = gridElement.getAttribute("data-content");
  //       dialogContent.textContent = content;
  //       dialog.style.display = "block";
  //     }
  //   });
  // });

  // preferred version:
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


  // testing version:
  // grids.forEach((grid) => {
  //   grid.addEventListener("click", () => {
  //     const gridId = grid.id;
  //     const gridElement = document.getElementById(gridId);
  
  //     if (isEditMode) {
  //       // Create a new edit dialog for this grid element
  //       const editDialog = document.createElement("dialog");
  //       const contentInput = document.createElement("input");
  //       const saveButton = document.createElement("button");
  //       const cancelButton = document.createElement("button");
  
  //       editDialog.appendChild(contentInput);
  //       editDialog.appendChild(saveButton);
  //       editDialog.appendChild(cancelButton);
  //       document.body.appendChild(editDialog);
  
  //       contentInput.type = "text";
  //       contentInput.value = gridElement.getAttribute("data-content");
  
  //       saveButton.type = "button";
  //       saveButton.textContent = "Save";
  //       saveButton.addEventListener("click", () => {
  //         const newContent = contentInput.value;
  //         gridElement.setAttribute("data-content", newContent);
  //         gridElement.textContent = newContent;
  //         dialogContent.textContent = newContent;
  //         editDialog.close();
  //       });
  
  //       cancelButton.type = "button";
  //       cancelButton.textContent = "Cancel";
  //       cancelButton.addEventListener("click", () => {
  //         editDialog.close();
  //       });
  
  //       editDialog.showModal();
  
  //       editDialog.addEventListener("close", () => {
  //         // Remove the edit dialog from the DOM when it's closed
  //         document.body.removeChild(editDialog);
  //       });
  //     } else {
  //       const content = gridElement.getAttribute("data-content");
  //       dialogContent.textContent = content;
  //       dialog.style.display = "block";
  //     }
  //   });
  // });
  
    
    
    
    
    

// grids.forEach((grid) => {
//   grid.addEventListener("click", () => {
//     const newContent = "New content"; // new content for the data-content attribute
//     const gridID = grid.id;
//     const gridElement = document.getElementById(gridID);
//     gridElement.setAttribute("data-content", newContent); // set the new value of data-content
//     console.log(gridElement.getAttribute("data-content")); // log the new value of data-content
//   });
// });


// close dialog
closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.style.display = "none";
  }
});


  
