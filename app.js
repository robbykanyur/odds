var Card = /** @class */ (function () {
    function Card() {
    }
    return Card;
}());
var Hand = /** @class */ (function () {
    function Hand() {
        this.cards = [];
    }
    return Hand;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        this.deck = [];
        var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
        var suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
        for (var suit in suits) {
            for (var value in values) {
                this.deck.push({
                    value: values[value],
                    suit: suits[suit],
                    name: "".concat(values[value], " of ").concat(suits[suit])
                });
            }
        }
    }
    Deck.prototype.show = function () {
        return this.deck;
    };
    return Deck;
}());
var Shoe = /** @class */ (function () {
    function Shoe(size) {
        var _this = this;
        this.cards = [];
        for (var i = 0; i < size; i++) {
            var deck = new Deck().show();
            deck.forEach(function (card) {
                _this.cards.push(card);
            });
        }
    }
    Shoe.prototype.shuffle = function () {
        var _a;
        var shoe = this.cards;
        var m = shoe.length;
        var i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            _a = [shoe[i], shoe[m]], shoe[m] = _a[0], shoe[i] = _a[1];
        }
        this.cards = shoe;
        return this.cards;
    };
    return Shoe;
}());
var shoe = new Shoe(6).shuffle();
var playerHand = new Hand();
var dealerHand = new Hand();
var deal = function (shoe, hand) {
    return hand.cards.push(shoe.shift());
};
var dealNewHand = function () {
    for (var i = 0; i < 2; i++) {
        deal(shoe, playerHand);
        deal(shoe, dealerHand);
    }
    console.log('Player hand: ' + JSON.stringify(playerHand.cards));
    console.log('Dealer hand: ' + JSON.stringify(dealerHand.cards));
};
dealNewHand();