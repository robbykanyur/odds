type Card = {
  value: string | number
  suit: string
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
        })
      }
    }
  }

  public show(): Card[] {
    return this.deck
  }
}

class Shoe {
  private shoe: Card[]

  constructor(size: number) {
    this.shoe = []
    for (let i = 0; i < size; i++) {
      let deck = new Deck().show()
      deck.forEach((card: Card) => {
        this.shoe.push(card)
      })
    }
  }

  public shuffle(): Card[] {
    let shoe = this.shoe
    let m = shoe.length
    let i

    while (m) {
      i = Math.floor(Math.random() * m--)
      ;[shoe[m], shoe[i]] = [shoe[i], shoe[m]]
    }

    this.shoe = shoe
    return this.shoe
  }
}

let shoe = new Shoe(4)
shoe.shuffle()
console.log(shoe)
