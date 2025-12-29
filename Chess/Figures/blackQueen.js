import { Figure } from "./Figure.js";

export class BlackQueen extends Figure {
    constructor() {
        super();
        this.color = 'black';
        this.imagePath = '../Images/bq.png';
    }

    validMoves() {}
}