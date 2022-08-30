"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    face;
    suit;
    constructor(face, suit) {
        this.face = face;
        this.suit = suit;
    }
    displayName() {
        return `${this.face} of ${this.suit}`;
    }
    getValue() {
        const cards = {
            Ace: 1,
            Two: 2,
            Three: 3,
            Four: 4,
            Five: 5,
            Six: 6,
            Seven: 7,
            Eight: 8,
            Nine: 9,
            Ten: 10,
            Jack: 10,
            Queen: 10,
            King: 10,
        };
        return cards[this.face];
    }
}
exports.default = Card;
