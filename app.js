var Deck = /** @class */ (function () {
    function Deck() {
        this.deck = [];
        var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
        var suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
        for (var suit in suits) {
            for (var value in values) {
                this.deck.push({
                    value: values[value],
                    suit: suits[suit]
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
        this.shoe = [];
        for (var i = 0; i < size; i++) {
            var deck = new Deck().show();
            deck.forEach(function (card) {
                _this.shoe.push(card);
            });
        }
    }
    Shoe.prototype.shuffle = function () {
        var _a;
        var shoe = this.shoe;
        var m = shoe.length;
        var i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            _a = [shoe[i], shoe[m]], shoe[m] = _a[0], shoe[i] = _a[1];
        }
        this.shoe = shoe;
        return this.shoe;
    };
    return Shoe;
}());
var shoe = new Shoe(4);
shoe.shuffle();
console.log(shoe);
