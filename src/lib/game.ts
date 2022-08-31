import Shoe from '../classes/Shoe'
import Hand from '../classes/Hand'
import { Game } from '../lib/types'
import { displayHand, dealHand } from './helpers'
import * as readline from 'node:readline'
import Card from 'src/classes/Card'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const gameLoop = function (game: Game): void {
  const currentLowValue = game.playerHand.value()[0]!
  if (currentLowValue > 21) {
    console.log('BUST!', '\n')
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

function playDealerHand(game: Game): void {
  displayHand('Dealer', game.dealerHand)
}

function playGame(): void {
  const shoe = new Shoe(4)
  shoe.shuffle()
  const playerHand = new Hand()
  const dealerHand = new Hand()
  dealHand(shoe, playerHand, dealerHand)

  displayHand('Dealer', dealerHand, true)
  displayHand('Player', playerHand)

  gameLoop({ shoe: shoe, playerHand: playerHand, dealerHand: dealerHand })
}

export default playGame
