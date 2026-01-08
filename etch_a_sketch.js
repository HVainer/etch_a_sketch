
const gridContainer = document.querySelector("#grid-container");//reference to the div that will hold all the grid squares

changeGridSize(16);  //create a 16*16 grid upon loading


//////////////////// activate buttons ////////////////////////////

const resizeButton = document.querySelector('#resize-grid');

    /////////add event listener for resize-grid button
resizeButton.addEventListener('click', () => 
    {
       let userSize = prompt('Enter the new grid size(between 1-100): ');
       
       if(userSize === null) return; //user clicked cancel - prompt() will only return null if user clicks cancel and numb is not parsed
       
       userSize = parseInt(userSize);

       while (userSize < 1 || userSize > 100 || isNaN(userSize)) //validate number - will keep asking user for number until its valid
       {
          alert("Please enter a number between 1 and 100"); 
          userSize = parseInt(prompt('Enter the new grid size(between 1-100): ')); //let user enter a corrected number
          userSize = parseInt(userSize);
       }

       changeGridSize(userSize);
    });

    /////////add event listener for clear-grid button

const clearGrid = document.querySelector('#clear-grid');

clearGrid.addEventListener('click', () => 
    {
        //will cycle thru ea current div and reset the background color **use class because it is a group of divs
        document.querySelectorAll('.square-div').forEach(square => 
            {
                square.style.backgroundColor = '';
                square.style.opacity = '';
            });
    });

    /////////add event listener for rainbow-button

const rainbowButton = document.querySelector('#rainbow-button'); //reference to button
const onOffText = document.querySelector('.on-off'); //reference to text that will be changed
let isRainbowButton = false; 

onOffText.textContent = 'OFF'; //default will be off

rainbowButton.addEventListener('click', () =>
    {
        isRainbowButton = !isRainbowButton; //when click, it will always be the opposite - toggling  off or on

        onOffText.textContent = isRainbowButton ? 'ON' : 'OFF';
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

        //add hovering event listener for each square div
        newSquareDiv.addEventListener('mouseenter', () => 
            {
                //if rainbow mode is one, each div will have a different color
                if(isRainbowButton)
                {    
                    newSquareDiv.style.backgroundColor = getRandomColor();
                    newSquareDiv.style.opacity = 1;
                    return;
                }

                //square will darken ea time the mouse enters the div
                //tracks how dark the square is
                //newSquareDiv.style.opacity returns a string so need to convert to an int
                //if undefined/empty string is returned then the var will use 0 opacity - handles missing values
                let currentOpacity = Number(newSquareDiv.style.opacity) || 0;

                //square will be black
                newSquareDiv.style.backgroundColor = '#000';

                //will gradually increase from 0 to 1
                //will not exceed 1
                newSquareDiv.style.opacity = Math.min(currentOpacity + 0.1, 1);

            });

        gridContainer.appendChild(newSquareDiv);
    }

    gridContainer.style.setProperty('--flex-basis', basis);

}

function getRandomColor()
{
    //ea rgb value needs to be between 0-255
    //math.random * 256 will return a number from 0-255.999...
    //math.floor will round that number down the nearest whole number 
    //so now we will have a number between 0-255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;  //returns random color string that will be a valid css color
}
