import { BoardState } from '../Game_logic/main.js';

class BoardRenderer {
  constructor(board, gameBoard) {
    this.board = board;
    this.gameBoard = gameBoard;
    this.renderBoard();
    this.renderPieces(gameBoard);
  }

  renderBoard() {
    for (let row = 0; row < 8; ++row) {
      for (let col = 0; col < 8; ++col) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add((row + col) & 1 ? 'blackCell' : 'whiteCell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        const isDarkCell = (row + col) % 2 === 0;
        if (col === 0) {
          const rowNumber = document.createElement('span');
          rowNumber.textContent = 8 - row;
          rowNumber.classList.add('rowNumber');
          rowNumber.classList.add(isDarkCell ? 'dark-coords' : 'light-coords');
          cell.appendChild(rowNumber);
        }

        if (row === 7) {
          const colLetter = document.createElement('span');
          colLetter.classList.add('colLetter');
          colLetter.textContent = String.fromCharCode(97 + col);
          const isDarkCell = (row + col) % 2 === 0;
          colLetter.classList.add(isDarkCell ? 'dark-coords' : 'light-coords');
          cell.appendChild(colLetter);
        }
        this.board.appendChild(cell);
      }
    }
  }

  renderPieces(boardInstance) {
    for (let row = 0; row < 8; ++row) {
      for (let col = 0; col < 8; ++col) {
        const piece = boardInstance.boardState[row][col];
        if (piece) {
          const img = document.createElement('img');
          img.src = piece.imagePath;
          img.classList.add('piece');

          const cell = document.querySelector(
            `.cell[data-row="${row}"][data-col="${col}"]`
          );
          cell.appendChild(img);
        }
      }
    }
  }

  onClick() {
    const board = document.getElementById('board');
    board.addEventListener('click', (event) => {
      const target =
        event.target.nodeType === 1 ? event.target : event.target.parentElement;
      const cell = target.closest('.cell');
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (cell === null) {
        return;
      }
      this.selectPiece(row, col, board);
    });
  }

  selectPiece(row, col) {
    const currentPosition = gameBoard.getPossibleMoves(row, col);
  }

  renderHighlights() {}
}

const gameBoard = new BoardState();
gameBoard.initGame();
const renderer = new BoardRenderer(document.getElementById('board'), gameBoard);
renderer.onClick();
