class Card {
  value: number | string
  suit: string
  displayName: string
}

class Deck {
  private deck: Card[]

  constructor() {
    this.deck = []

    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
    const suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds']
    for (let suit in suits) {
      for (let value in values) {
        this.deck.push({
          value: values[value],
          suit: suits[suit],
          displayName: `${values[value]} of ${suits[suit]}`,
        })
      }
    }
  }

  public show(): Card[] {
    return this.deck
  }
}

class Shoe {
  private cards: Card[]

  constructor(size: number) {
    this.cards = []
    for (let i = 0; i < size; i++) {
      let deck = new Deck().show()
      deck.forEach((card: Card) => {
        this.cards.push(card)
      })
    }
  }

  public shuffle(): Card[] {
    let shoe = this.cards
    let m = shoe.length
    let i

    while (m) {
      i = Math.floor(Math.random() * m--)
      ;[shoe[m], shoe[i]] = [shoe[i], shoe[m]]
    }

    this.cards = shoe
    return this.cards
  }
}

let shoe = new Shoe(5)
shoe.shuffle()
const topCard = shoe['cards'][0]
console.log('Top Card: ' + topCard.displayName)
