const gridContainer = document.querySelector("#grid-container");//reference to the div that will hold all the grid squares
let gridSize = 16;

for(let i = 0; i < gridSize * gridSize; i++)
{
    const squareDiv = document.createElement("div"); //create a new grid square
    gridContainer.appendChild(squareDiv);
}


