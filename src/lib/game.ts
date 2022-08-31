import Shoe from '../classes/Shoe'
import Hand from '../classes/Hand'
import { Game, Seat } from '../lib/types'
import * as readline from 'node:readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const gameLoop = function (game: Game): void {
  let currentLowValue = game.playerHand.getValue()[0]!
  if (currentLowValue > 21) {
    console.log('BUST!!!', '\n')
    displayHand('Dealer', game.dealerHand)
  } else {
    rl.question('Would you like to [H]it or [S]tand? ', action => {
      let processedAction = action.toUpperCase()
      if (processedAction === 'H' || processedAction === 'HIT') {
        console.log('You hit', '\n')
        game.playerHand.addCard(game.shoe.cards.pop()!)
        displayHand('Player', game.playerHand)
        gameLoop(game)
      } else if (processedAction === 'S' || processedAction === 'STAND') {
        console.log('You stood', '\n')
        playDealerHand(game)
      } else {
        console.log('Invalid input \u2013 please try again')
        gameLoop(game)
      }
    })
  }
}

function playGame(): void {
  const shoe = new Shoe(4)
  shoe.shuffle()
  const playerHand = new Hand()
  const dealerHand = new Hand()
  dealHand(shoe, playerHand, dealerHand)

  dealerHand.setBlackjack()

  displayHand('Dealer', dealerHand, true)
  displayHand('Player', playerHand)

  gameLoop({ shoe: shoe, playerHand: playerHand, dealerHand: dealerHand })
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
    }
  }
}

export default playGame
