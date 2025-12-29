import { Figure } from "./Figure.js";

export class BlackRock extends Figure {
    constructor() {
        super();
        this.color = 'black';
        this.imagePath = '../Images/br.png';
    }

    validMoves() {}
}