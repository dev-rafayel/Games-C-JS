import { BoardState } from '../Game_logic/main.js';

class BoardRenderer {
  constructor(boardElement) {
    this.board = boardElement;
    this.renderBoard();
    this.renderFigures();
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

  renderFigures(boardInstance) {
    for (let row = 0; row < 8; ++row) {
      for (let col = 0; col < 8; ++col) {
        const figure = boardInstance.boardState[row][col];
        if (figure) {
          const img = document.createElement('img');
          // Continue: must render the figures
          img.src = '';
          img.classList.add('');
        }
      }
    }
  }

  renderHighlights() {}
}

const renderer = new BoardRenderer(document.getElementById('board'));
