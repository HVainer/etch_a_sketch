const gridContainer = document.querySelector("#grid-container");//reference to the div that will hold all the grid squares
let gridSquare = 16;
let flexBasis = 100/gridSquare + '%'; //add the % unit for css

for(let i = 0; i < gridSquare * gridSquare; i++)
{
    const squareDiv = document.createElement("div"); //create a new grid square
    squareDiv.classList.add('square-div'); //create class name
    gridContainer.appendChild(squareDiv); //append to the container
}

//setting the css variable on the parent which will set the flex basis on the children
gridContainer.style.setProperty('--flex-basis', flexBasis);

//////////////////// activate buttons ////////////////////////////

const resizeButton = document.querySelector('#resize-grid');

//add event listener
resizeButton.addEventListener('click', () => 
    {
       let userSize = prompt('Enter the new grid size(between 1-100): ');
       
       if(userSize === null) return; //user clicked cancel - prompt() will only return null if user clicks cancel and numb is not parsed

       parseInt(userSize); 

       while (userSize < 1 || userSize > 100 || isNaN(userSize)) //validate number - will keep asking user for number until its valid
       {
          alert("Please enter a number between 1 and 100"); 
          userSize = parseInt(prompt('Enter the new grid size(between 1-100): ')); //let user enter a corrected number
       }

       changeGridSize(userSize);
    });


//////////////////////////// functions ////////////////////////////



function changeGridSize(squareSize)
{
    let basis = 100/squareSize + '%'; //new flex-basis based on new square size
    let totalSquares = squareSize * squareSize; //total number of squares in the grid


    gridContainer.replaceChildren(); //will remove all of the grid square divs in the grid container

    for(let i = 0; i < totalSquares; i++)
    {
        const newSquareDiv = document.createElement("div"); //create a div
        newSquareDiv.classList.add('square-div'); //give ea div a class name
        gridContainer.appendChild(newSquareDiv);
    }

    gridContainer.style.setProperty('--flex-basis', basis);

}
