import { gridBoard } from '../Game_logic/main.js';

class BoardRenderer {
  #size = 8;
  constructor(board, gameBoard) {
    this.board = board; // UI
    this.gameBoard = gameBoard; // Board data
    this.selectedPiece = null; // Track currently selected piece
    this.validMoves = null;
    this.renderBoard();
    this.renderPieces(gameBoard);
  }

  renderBoard() {
    for (let row = 0; row < this.#size; ++row) {
      for (let col = 0; col < this.#size; ++col) {
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

  renderPieces(gameBoard) {
    for (let row = 0; row < this.#size; ++row) {
      for (let col = 0; col < this.#size; ++col) {
        const piece = gameBoard.gridBoard[row][col];
        if (piece) {
          const img = document.createElement('img');
          img.src = piece.imagePath;
          img.classList.add('piece');

          const cell = document.querySelector(
            `.cell[data-row="${row}"][data-col="${col}"]`,
          );
          if (cell) {
            cell.appendChild(img);
          }
        }
      }
    }
  }

  renderChangedBoard(fromClickedPosition, toClickedPosition) {
    const [fromRow, fromCol] = fromClickedPosition;
    const [toRow, toCol] = toClickedPosition;

    const fromCell = document.querySelector(
      `.cell[data-row='${fromRow}'][data-col='${fromCol}']`,
    );
    const toCell = document.querySelector(
      `.cell[data-row='${toRow}'][data-col='${toCol}']`,
    );

    if (!fromCell || !toCell) return;

    const pieceImg = fromCell.querySelector('.piece');
    if (pieceImg) {
      const capturedPiece = toCell.querySelector('.piece');
      if (capturedPiece) {
        capturedPiece.remove();
      }
      toCell.appendChild(pieceImg);
    }
  }

  onClick() {
    const board = document.getElementById('board');
    board.addEventListener('click', (event) => {
      const target =
        event.target.nodeType === 1 ? event.target : event.target.parentElement;
      const cell = target.closest('.cell');
      if (cell === null) {
        return;
      }

      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      const piece = this.gameBoard.gridBoard[row][col];

      if (this.selectedPiece) {
        // Check if click is the same piece again
        if (
          this.selectedPiece &&
          this.selectedPiece[0] === row &&
          this.selectedPiece[1] === col
        ) {
          this.clearAllHighlights();
          this.selectedPiece = null;
          this.validMoves = null;
          return;
        }

        const isValidMove = this.validMoves.some(
          (move) => move[0] === row && move[1] === col,
        );

        // Apply move
        if (isValidMove) {
          gameBoard.applyMove(this.selectedPiece, [row, col]);
          this.clearAllHighlights();
          this.renderLastMoveHighlights(this.selectedPiece, [row, col]);
          this.renderChangedBoard(this.selectedPiece, [row, col]);
          this.selectedPiece = null;
          this.validMoves = null;
        } else {
          // Select another piece
          const clickedPiece = this.gameBoard.gridBoard[row][col];
          if (clickedPiece !== null) {
            if (clickedPiece.color === gameBoard.player) {
              this.selectPiece(row, col, board);
            }
          } else {
            // Deselect piece
            this.clearAllHighlights();
            this.selectedPiece = null;
            this.validMoves = null;
          }
        }
      } else {
        // Select only own pieces
        const clickedPiece = this.gameBoard.gridBoard[row][col];
        if (clickedPiece !== null && clickedPiece.color !== gameBoard.player) {
          return;
        }
        this.selectPiece(row, col, board);
      }
    });
  }

  selectPiece(row, col) {
    const clickedPosition = [row, col];

    // Select new piece
    const pieceMoves = gameBoard.getPossibleMoves(row, col);
    if (!pieceMoves) return;
    this.renderHighlights(clickedPosition, pieceMoves);
    this.selectedPiece = clickedPosition;
    return (this.validMoves = pieceMoves);
  }

  renderHighlights(clickedPosition, pieceMoves) {
    // Clear all existing highlights
    this.clearAllHighlights();

    // Add highlight to current position
    const currentPieceCoords = document.querySelector(
      `.cell[data-row="${clickedPosition[0]}"][data-col="${clickedPosition[1]}"]`,
    );

    const [row, col] = [clickedPosition[0], clickedPosition[1]];

    // Coloring only the square including piece
    if (currentPieceCoords && this.gameBoard.gridBoard[row][col] !== null) {
      currentPieceCoords.classList.add('selected');
    }

    for (const coords of pieceMoves) {
      const row = coords[0];
      const col = coords[1];
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`,
      );

      if (cell) {
        const highlight = document.createElement('div');
        highlight.classList.add('highlight');
        cell.appendChild(highlight);
      }
    }
  }

  renderLastMoveHighlights(fromClickedPosition, toClickedPosition) {
    // Clear previous last move highlights
    const previousFrom = this.board.querySelector('.fromCoords');
    const previousTo = this.board.querySelector('.toCoords');
    if (previousFrom) previousFrom.classList.remove('fromCoords');
    if (previousTo) previousTo.classList.remove('toCoords');

    const [fromRow, fromCol] = [fromClickedPosition[0], fromClickedPosition[1]];
    const [toRow, toCol] = [toClickedPosition[0], toClickedPosition[1]];

    const fromCell = document.querySelector(
      `.cell[data-row="${fromRow}"][data-col="${fromCol}"]`,
    );
    const toCell = document.querySelector(
      `.cell[data-row="${toRow}"][data-col="${toCol}"]`,
    );

    if (fromCell && toCell) {
      fromCell.classList.add('fromCoords');
      toCell.classList.add('toCoords');
    }
  }

  renderPieceTakingHighlight() {}

  clearAllHighlights() {
    const existingHighlight = this.board.querySelectorAll('.highlight');
    existingHighlight.forEach((highlight) => highlight.remove());

    // Remove selected cell highlight
    const previousSelected = this.board.querySelector('.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
  }
}

const gameBoard = new gridBoard();
gameBoard.initGame();
const renderer = new BoardRenderer(document.getElementById('board'), gameBoard);
renderer.onClick();
