import Shoe from '../classes/Shoe'
import Hand from '../classes/Hand'
import { displayHand, dealHand } from './helpers'
import * as readline from 'node:readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const gameLoop = function (shoe: Shoe, playerHand: Hand, dealerHand: Hand): void {
  const currentHighValue = playerHand.value(playerHand.showCards().cards).pop()!
  if (currentHighValue > 21) {
    console.log('BUST!')
    console.log('Dealer\u2019s hand:')
    console.log(displayHand('Player', dealerHand))
  } else {
    rl.question('Would you like to [H]it or [S]tand? ', action => {
      let processedAction = action.toUpperCase()
      if (processedAction === ('H' || 'HIT')) {
        console.log('You hit')
        playerHand.addCard(shoe.cards.pop()!)
        displayHand('Player', playerHand)
        gameLoop(shoe, playerHand, dealerHand)
      } else if (processedAction === ('S' || 'STAND')) {
        console.log('You stood')
      } else {
        console.log('Invalid input \u2013 please try again')
        gameLoop(shoe, playerHand, dealerHand)
      }
    })
  }
}

function playGame(): void {
  const shoe = new Shoe(4)
  shoe.shuffle()
  const playerHand = new Hand('Player')
  const dealerHand = new Hand('Dealer')
  dealHand(shoe, playerHand, dealerHand)
  displayHand('Dealer', dealerHand)
  displayHand('Player', playerHand)

  gameLoop(shoe, playerHand, dealerHand)
}

export default playGame
