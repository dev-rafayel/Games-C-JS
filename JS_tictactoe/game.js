const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartnBtn = document.querySelector('#restartBtn');
restartnBtn.style.display = 'none';

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
  updatePlayerUI();
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
    updatePlayerUI();
  }
}

// marks the cell clicked
function updateCell(cell, index) {
  columns[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updatePlayerUI() {
  const xBox = document.getElementById('x-side');
  const oBox = document.getElementById('o-side');

  if (currentPlayer === 'X') {
    oBox.classList.remove('active');
    xBox.classList.add('active');
  } else {
    xBox.classList.remove('active')
    oBox.classList.add('active');
  }
}

// checks if there is win or draw
function checkBoard() {
  let roundWon = false;

  for (let i = 0; i < board.length; ++i) {
    const [a, b, c] = board[i];

    if (
      columns[a] !== '' &&
      columns[a] === columns[b] &&
      columns[b] === columns[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Won!`;
    runing = false;
  } else if (!columns.includes('')) {
    statusText.textContent = `Draw!`;
    runing = false;
  }

  if (!runing) {
    restartnBtn.style.display = 'inline-block';
  }
}

function restartGame() {
  cells.forEach((cell) => {
    const xBox = document.getElementById('x-side');
    const oBox = document.getElementById('o-side');
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    oBox.classList.remove('active');
    xBox.classList.add('active');
  });
  restartnBtn.style.display = 'none';
  statusText.textContent = '';
  columns = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  count = 0;
  runing = true;
}

initializeGame();