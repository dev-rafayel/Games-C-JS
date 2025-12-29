import { Figure } from "./Figure.js";

export class WhiteKing extends Figure {
    constructor() {
        super();
        this.color = 'white';
        this.imagePath = '../Images/wk.png';
    }

    validMoves() {}
}