"use strict";
const FACES = [
    'Ace',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Jack',
    'Queen',
    'King',
];
const SUITS = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
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
class Shoe {
    decks;
    cards;
    warning;
    constructor(decks) {
        this.cards = [];
        this.decks = decks;
        for (let i = 0; i < decks; i++) {
            SUITS.forEach(suit => {
                FACES.forEach(face => {
                    this.cards.push(new Card(face, suit));
                });
            });
        }
    }
    shuffle() {
        let shoe = this.cards;
        let m = shoe.length;
        let i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [shoe[m], shoe[i]] = [shoe[i], shoe[m]];
        }
        this.cards = shoe;
        this.warning = this.generateWarning();
    }
    generateWarning() {
        const positive = Math.random() < 0.5;
        const min = 0;
        const max = 10;
        const flutter = Math.floor(Math.random() * (max - min + 1)) + min;
        if (positive) {
            return 52 + flutter;
        }
        else {
            return 52 - flutter;
        }
    }
}
const shoe = new Shoe(4);
for (let i = 0; i < 100; i++) {
    shoe.shuffle();
    console.log(shoe.warning);
}
