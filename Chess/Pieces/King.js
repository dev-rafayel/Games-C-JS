import { Piece } from './Piece.js';

export class King extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wk.png' : '../Images/bk.png';
    this.hasMoved = false;
    this.type = 'king';
  }

  getMoves(board, row, col) {
    const finalDirections = [];
    const probobalDirections = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [1, -1],
      [1, 1],
      [0, 2],
      [0, -2],
    ];

    for (const move of probobalDirections) {
      const [dx, dy] = [move[0], move[1]];
      if ((this.hasMoved) && (dy === 2 || dy === -2)) {
        continue;
      }
      const [newRow, newCol] = [row + dx, col + dy];
      // Castling
      if (dy === 2 || dy === -2) {
        const castling = this.castling(board, [dx, dy], [row, col]);
        if (castling.canCastle === false) continue; 
      }


      if (!this.isValidBorder(newRow, newCol)) continue;

      if (board[newRow][newCol] !== null) {
        const anotherPiece = board[newRow][newCol];
        if (anotherPiece.type !== 'king' && anotherPiece.color !== this.color) {
          finalDirections.push([newRow, newCol]);
        }
      } else {
        finalDirections.push([newRow, newCol]);
      }
    }
    return finalDirections;
  }

  castling(board, move, currentPos) {
    if (this.hasMoved) return false;
    const [row, col] = [currentPos[0], currentPos[1]];
    const [dx, dy] = [move[0], move[1]];

    // Determine which side the trying to castle on
    const side = (dy > 0) ? 'kingside' : 'queenside';
    const rockCol = (dy > 0) ? col + dy + 1 : col + dy - 2;
    const rockRow = row;

    // If the king has already moved, the castling on this side is not allowed
    if (this.hasMoved) {
      return {
        canCastle: false,
        side,
        rockPos: [rockRow, rockCol]
      };
    }

    const rock = board[rockRow][rockCol];
    
    // If there is no rook, or it already moved, this side is not allowed

    if (!rock || rock.type !== 'rock' || rock.hasMoved) {
      return {
        canCastle: false,
        side,
        rockPos: [rockRow, rockCol]
      };
    }

    return {
      canCastle: true,
      side,
      rockPos: [rockRow, rockCol]
    };
  }

  isChecked(board, row, col) {
    const king = board[row][col];

  }
}
