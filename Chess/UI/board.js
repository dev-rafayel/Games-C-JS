import { BoardState } from '../Game_logic/main.js';

class BoardRenderer {
  constructor(board, gameBoard) {
    this.board = board; // UI
    this.gameBoard = gameBoard; // Object containing matrix
    this.selectedPiece = null; // Track currently selected piece
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
          if (cell) {
            cell.appendChild(img);
          }
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
    const currentPosition = [row, col];

    // Check if click is the same piece again
    if (
      this.selectedPiece &&
      this.selectedPiece[0] === row &&
      this.selectedPiece[1] === col
    ) {
      this.clearAllHighlights();
      this.selectedPiece = null;
      return;
    }

    // Select new piece
    const pieceMoves = gameBoard.getPossibleMoves(row, col);
    this.renderHighlights(currentPosition, pieceMoves);
    this.selectedPiece = currentPosition;
  }

  renderHighlights(currentPosition, pieceMoves) {
    // Clear all existing highlights
    this.clearAllHighlights();

    // Add highlight to current position
    const currentPieceCoords = document.querySelector(
      `.cell[data-row="${currentPosition[0]}"][data-col="${currentPosition[1]}"]`
    );
    if (currentPieceCoords) {
      currentPieceCoords.classList.add('selected');
    }

    for (const coords of pieceMoves) {
      const row = coords[0];
      const col = coords[1];
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
      );

      if (cell) {
        const highlight = document.createElement('div');
        highlight.classList.add('highlight');
        cell.appendChild(highlight);
      }
    }
  }

  removeHighlights(highlight) {
    return highlight.remove();
  }

  clearAllHighlights() {
    const existingHighlight = this.board.querySelectorAll('.highlight');
    existingHighlight.forEach((highlight) => this.removeHighlights(highlight));

    // Remove selected cell highlight
    const previousSelected = this.board.querySelector('.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
  }
}

const gameBoard = new BoardState();
gameBoard.initGame();
const renderer = new BoardRenderer(document.getElementById('board'), gameBoard);
renderer.onClick();
