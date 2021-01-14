console.log('Hi')

const status = document.querySelector('.status');

let active = true; // game decide wither its activ or not
let currentPlayer = "X"; // first player start with X
let game = ["", "", "", "", "", "", "", "", ""];

const win_m = () => `Player ${currentPlayer} is the winnier!!!!!`; //arrow function. The left part denotes the input of a function and the right part the output of that function
const draw_m = () => `oh no its draw :( play again!!!!!`;
const current_p = () => `player ${currentPlayer}'s turn`; 

status.innerHTML = current_p();
function playedOne(clickedCell, clickedCellIndex) {
    game[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function change_turn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.innerHTML = current_p();
}

//create an array of arrays collecting all possible chances to win by index
const Conditions = [ [0, 1, 2],[3, 4, 5], [6, 7, 8], [0, 3, 6],[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


// function job is to keep checking winnig conditions are above
function result() {
    let won = false;
    for (let i = 0; i <= 7; i++) {
        const win = Conditions[i];
        let a = game[win[0]];
        let b = game[win[1]];
        let c = game[win[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            won = true;
            break
        }
    }
if (won) {
        status.innerHTML = win_m();
        active = false;
        return;
    }

    let roundDraw = !game.includes("");
    if (roundDraw) {
        status.innerHTML = draw_m();
        gameActive = false;
        return;
    }

    change_turn();

}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('cellIndex') // using the parseInt to bring back  actual number we will parse it to an from get attributes
        );
    
        if (game[clickedCellIndex] !== "" || !active) {
            return;
        }
      
        playedOne(clickedCell, clickedCellIndex);
        result();
    }

function restart() {
  // restart and play new game
  location.reload();  
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', restart);