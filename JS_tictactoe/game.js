const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartnBtn = document.querySelector('#restartBtn');

const board = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let columns = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let runing = false;
// count is used for the counting quantity of clicked cells
// if the count >= 3 the program calls function checkBoard()
let count = 0;

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartnBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  runing = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');
  if (columns[cellIndex] !== '' || !runing) {
    return;
  }

  updateCell(this, cellIndex);
  ++count;
  if (count >= 3) {
    checkBoard();
  }
  
  if (runing) {
    changePlayer();
  }
}

// marks the cell clicked
function updateCell(cell, index) {
  columns[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}

// checks if there is win or draw
function checkBoard() {
  let roundWon = false;

  for (let i = 0; i < board.length; ++i) {
    const [a, b, c] = board[i];

    if (columns[a] !== '' && 
        columns[a] === columns[b] &&
        columns[b] === columns[c]) {
       roundWon = true;
       break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    runing = false;
  } else if (!columns.includes('')) {
    statusText.textContent = `Draw!`;
    runing = false;
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  columns = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  count = 0;
  statusText.textContent = `${currentPlayer}'s turn!`;
  runing = true;
}

initializeGame();