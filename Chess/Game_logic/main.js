import { WhiteRock } from '/Figures/whiteRock.js';
import { WhiteKnight } from '/Figures/whiteKnight.js';
import { WhiteBishop } from '/Figures/whiteBishop.js';
import { WhiteQueen } from '/Figures/whiteQueen.js';
import { WhiteKing } from '/Figures/whiteKing.js';
import { WhitePawn } from '/Figures/whitePawn.js';
import { BlackRock } from '/Figures/blackRock.js';
import { BlackKnight } from '/Figures/blackKnight.js';
import { BlackBishop } from '/Figures/blackBishop.js';
import { BlackQueen } from '/Figures/blackQueen.js';
import { BlackKing } from '/Figures/blackKing.js';
import { BlackPawn } from '/Figures/blackPawn.js';

export class BoardState {
  constructor() {
    this.boardState = new Array(8)
      .fill(null)
      .map(() => new Array(8).fill(null));
    this.startPositions = [
      [
        BlackRock,
        BlackKnight,
        BlackBishop,
        BlackQueen,
        BlackKing,
        BlackBishop,
        BlackKnight,
        BlackRock,
      ],
      [
        BlackPawn,
        BlackPawn,
        BlackPawn,
        BlackPawn,
        BlackPawn,
        BlackPawn,
        BlackPawn,
        BlackPawn,
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        WhitePawn,
        WhitePawn,
        WhitePawn,
        WhitePawn,
        WhitePawn,
        WhitePawn,
        WhitePawn,
        WhitePawn,
      ],
      [
        WhiteRock,
        WhiteKnight,
        WhiteBishop,
        WhiteQueen,
        WhiteKing,
        WhiteBishop,
        WhiteKnight,
        WhiteRock,
      ],
    ];
  }

  initGame() {
    for (let row = 0; row < 8; ++row) {
      for (let col = 0; col < 8; ++col) {
        const FigureClass = this.startPositions[row][col];
        if (FigureClass) {
          this.boardState[row][col] = new FigureClass();
        } else {
          this.boardState[row][col] = null;
        }
      }
    }
  }

  getPossibleMoves(row, col) {
    const figure = this.boardState[row][col];
    if (figure === null) {
      return;
    }
    console.log(figure);
    figure.validMoves(figure);
  }
}
