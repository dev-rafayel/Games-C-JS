import { Figure } from "./Figure.js";

export class WhiteQueen extends Figure  {
    constructor() {
        super();
        this.color = 'white';
        this.imagePath = '../Images/wq.png';
    }

    validMoves() {}
}