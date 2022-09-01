export default class Bank {
  public bankroll: number

  constructor() {
    this.bankroll = 1000
  }

  public addFunds(amount: number): number {
    return (this.bankroll += amount)
  }

  public removeFunds(amount: number): number {
    return (this.bankroll -= amount)
  }

  public checkFunds(): number {
    return this.bankroll
  }
}
