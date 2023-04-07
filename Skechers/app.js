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

