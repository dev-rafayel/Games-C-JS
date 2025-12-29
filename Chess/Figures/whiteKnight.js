import { Figure } from "./Figure.js";

export class WhiteKnight extends Figure {
    constructor() {
        super();
        this.color = 'white';
        this.imagePath = '../Images/wn.png';
    }

    validMoves() {}
}