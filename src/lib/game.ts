import Shoe from '../classes/Shoe'
import Hand from '../classes/Hand'
import Bank from '../classes/Bank'
import { Game, Seat } from '../lib/types'
import * as readline from 'readline-sync'

const gameLoop = function (game: Game): void {
  let currentLowValue = Math.min(...game.playerHand.getValue())
  let currentHighValue = Math.max(...game.playerHand.getValue())

  if (currentHighValue === 21) {
    displayHand('Dealer', game.dealerHand)
    displayHand('Player', game.playerHand)
    playerWin(game)
  }
  if (currentLowValue > 21) {
    console.log('BUST!!!', '\n')
    playerLoss(game)
    displayHand('Dealer', game.dealerHand)
  } else {
    const action = readline.question('Would you like to [H]it or [S]tand? ').toUpperCase()
    if (action === 'H' || action === 'HIT') {
      console.log('You hit', '\n')
      game.playerHand.addCard(game.shoe.cards.pop()!)
      displayHand('Player', game.playerHand)
      gameLoop(game)
    } else if (action === 'S' || action === 'STAND') {
      console.log('You stood', '\n')
      playDealerHand(game)
    } else {
      console.log('Invalid input \u2013 please try again')
      gameLoop(game)
    }
  }
}

function playGame(): void {
  const game: Game = {
    shoe: new Shoe(4),
    playerHand: new Hand(),
    dealerHand: new Hand(),
    bank: new Bank(),
  }

  game.shoe.shuffle()

  game.playerHand.wager = placeWager(game.bank, game.playerHand)
  dealHand(game.shoe, game.playerHand, game.dealerHand)

  if (isBlackjack(game.dealerHand) && isBlackjack(game.playerHand)) {
    displayHand('Dealer', game.dealerHand)
    displayHand('Player', game.playerHand)
    console.log('DOUBLE BLACKJACK!!!')
    playerPush(game)
  } else if (isBlackjack(game.dealerHand)) {
    displayHand('Dealer', game.dealerHand)
    displayHand('Player', game.playerHand)
    console.log('DEALER BLACKJACK!!!')
    playerLoss(game)
  } else if (isBlackjack(game.playerHand)) {
    displayHand('Dealer', game.dealerHand)
    displayHand('Player', game.playerHand)
    console.log('YOU GOT BLACKJACK!!!')
    playerWin(game)
  } else {
    displayHand('Dealer', game.dealerHand, true)
    displayHand('Player', game.playerHand)
    gameLoop(game)
  }
}

function placeWager(bank: Bank, hand: Hand): number {
  console.log('You currently have $', bank.checkFunds())
  const amount = parseInt(readline.question('How much would you like to wager? $'))
  bank.removeFunds(amount)
  return amount
}

function isBlackjack(hand: Hand): boolean {
  if (Math.max(...hand.getValue()) === 21) {
    return true
  }
  return false
}

function dealHand(shoe: Shoe, playerHand: Hand, dealerHand: Hand): void {
  for (let i = 0; i < 2; i++) {
    playerHand.addCard(shoe.cards.pop()!)
    dealerHand.addCard(shoe.cards.pop()!)
  }
}

function displayHand(seat: Seat, hand: Hand, hideDealerCard?: boolean): void {
  if (seat === 'Player') {
    console.log('Your hand:')
  } else {
    console.log('Dealer\u2019s hand: ')
  }
  hand.showCards(hideDealerCard).cards.forEach(card => {
    console.log(card.displayName())
  })
  console.log('Value of hand:', hand.getValue(hideDealerCard), '\n')
}

function playDealerHand(game: Game): void {
  displayHand('Dealer', game.dealerHand)

  let currentLowValue = game.dealerHand.getValue()[0]!
  if (currentLowValue > 21) {
    console.log('DEALER BUST!!!')
    playerWin(game)
  } else {
    if (Math.max(...game.dealerHand.getValue()) < 17) {
      game.dealerHand.addCard(game.shoe.cards.pop()!)
      playDealerHand(game)
    } else if (game.dealerHand.getValue().length > 1 && game.dealerHand.getValue()[1] === 17) {
      // hit on soft 17
      game.dealerHand.addCard(game.shoe.cards.pop()!)
      playDealerHand(game)
    } else {
      console.log('Dealer stood')
      checkWinner(game)
    }
  }
}

function checkWinner(game: Game): void {
  const playerHandValue = Math.max(...game.playerHand.getValue())
  const dealerHandValue = Math.max(...game.dealerHand.getValue())

  if (playerHandValue === dealerHandValue) {
    playerPush(game)
  } else if (playerHandValue > dealerHandValue) {
    playerWin(game)
  } else {
    playerLoss(game)
  }
}

function playerWin(game: Game): void {
  game.bank.addFunds(game.playerHand.wager * 2)
  console.log('YOU WON $', game.playerHand.wager, '!!!')
  console.log('New balance: $', game.bank.bankroll)
}

function playerLoss(game: Game): void {
  console.log('YOU LOST $', game.playerHand.wager)
  console.log('New balance: $', game.bank.bankroll)
}

function playerPush(game: Game): void {
  console.log('PUSH!')
  game.bank.addFunds(game.playerHand.wager)
  console.log('Current balance: $', game.bank.bankroll)
}

export default playGame
