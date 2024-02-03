let playerTurn = document.getElementById("turn")
let restartbtn = document.getElementById("restart")
let resultText = document.getElementById("result")
let boxes = Array.from(document.getElementsByClassName('tile')) //Changing the Document Collection into an array

const O_MARK = 'O'
const X_MARK = 'X'

let starter = Math.floor(Math.random()*2) //Using random Math function to randomize the starting turn
console.log(starter)

let currentPlayer = starter == 0 ? X_MARK : O_MARK

playerTurn.innerHTML= `Player ${currentPlayer} should start`


let spaces = Array(9).fill("")  //Initially all the tiles are empty

let gameActive = true;

boxes.forEach(box => box.addEventListener('click',boxClicked)) //when a tile is clicked boxClicked function is called.
function boxClicked(e) {
    const id = e.target.id;

    if (gameActive && !spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            resultText.innerHTML = `${currentPlayer} has won!`;
            let winningBlocks = playerHasWon();
            winningBlocks.map(box => boxes[box].style.backgroundColor = 'lightGreen');
            gameActive = false; // Set game state to inactive
        } 
		else {
            if (isTie()) {
                resultText.innerHTML = "It's a tie";
                gameActive = false; // Set game state to inactive
            } else {
                currentPlayer = currentPlayer === X_MARK ? O_MARK : X_MARK; //To alternate the moves of the players
                playerTurn.innerHTML = `Player ${currentPlayer}'s turn`;
            }
        }
    }
}

//Array for holding winning conditions
const winningCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]

//The following function checks whether the game is won by someone or not
function playerHasWon(){
	for(condition of winningCombos){
		let [a,b,c] = condition
		if(spaces[a]&& spaces[a]==spaces[b]&& spaces[a]==spaces[c]){
			return [a,b,c]
		}
	}
	return  false
}

// Check if all spaces are filled and there is no winner
function isTie() {
    return spaces.every(space => space !== "") && !playerHasWon();
}


//adding event listener to the restart btn
restartbtn.addEventListener('click',restart)

//restart function to restart the game
function restart(){  
	location.reload()
	spaces.fill(null)

	boxes.forEach(box => {
		box.innerText = ''
		box.style.backgroundColor= ''
		resultText.innerText = 'Tic-Tac-Toe'
	})
}
