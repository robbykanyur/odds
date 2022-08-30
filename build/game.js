"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shoe_1 = __importDefault(require("./Shoe"));
const Hand_1 = __importDefault(require("./Hand"));
const helpers_1 = require("./helpers");
const readline = __importStar(require("node:readline"));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const gameLoop = function (shoe, playerHand, dealerHand) {
    const currentHighValue = playerHand.value(playerHand.showCards().cards).pop();
    if (currentHighValue > 21) {
        console.log('BUST!');
        console.log('Dealer\u2019s hand:');
        console.log((0, helpers_1.displayHand)('Player', dealerHand));
    }
    else {
        rl.question('Would you like to [H]it or [S]tand? ', action => {
            let processedAction = action.toUpperCase();
            if (processedAction === ('H' || 'HIT')) {
                console.log('You hit');
                playerHand.addCard(shoe.cards.pop());
                (0, helpers_1.displayHand)('Player', playerHand);
                gameLoop(shoe, playerHand, dealerHand);
            }
            else if (processedAction === ('S' || 'STAND')) {
                console.log('You stood');
            }
            else {
                console.log('Invalid input \u2013 please try again');
                gameLoop(shoe, playerHand, dealerHand);
            }
        });
    }
};
function playGame() {
    const shoe = new Shoe_1.default(4);
    shoe.shuffle();
    const playerHand = new Hand_1.default('Player');
    const dealerHand = new Hand_1.default('Dealer');
    (0, helpers_1.dealHand)(shoe, playerHand, dealerHand);
    (0, helpers_1.displayHand)('Dealer', dealerHand);
    (0, helpers_1.displayHand)('Player', playerHand);
    gameLoop(shoe, playerHand, dealerHand);
}
exports.default = playGame;
