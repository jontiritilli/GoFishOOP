import Player from './player';
import Deck from './deck';

class Game {
  constructor(names) {
    this.players = names.map(
      (name, index) =>
        new Player({
          id: index,
          name,
        })
    );
    this.scoreboard = [];
    this.deck = new Deck();
    this.CurrentPlayer = 0;
    this.OpponentPlayer = 1;
  }

  startGame() {
    this.deck.createDeck();
    this.newDeal();
  }

  resetGame() {
    this.game = new Game();
  }

  newDeal() {
    let maxDeal = 10;
    let playerId = 0;
    while (maxDeal) {
      this.players[playerId].getOneCard(this.deck.giveOneCard(0));
      maxDeal--;
      playerId = !playerId ? 1 : 0;
    }
  }

  nextTurn() {
    if (this.CurrentPlayer) {
      this.CurrentPlayer = 0;
      this.OpponentPlayer = 1;
      return;
    }
    this.CurrentPlayer = 1;
    this.OpponentPlayer = 0;
  }

  drawOneCard(index) {
    const card = this.deck.giveOneCard(index);
    this.players[this.CurrentPlayer].getOneCard(card);
    this.nextTurn();
    return this.CurrentPlayer;
  }

  drawFive() {
    for (let i = 0; i < 5; i++) {
      const card = this.deck.giveOneCard(0);
      this.players[this.CurrentPlayer].getOneCard(card);
    }
    return this.CurrentPlayer;
  }

  pauseOpponentClicks() {
    const container = Array.from(
      document.getElementById(`hand ${this.OpponentPlayer}`).childNodes
    );
    for (let i = 0; i < container.length; i++) {
      container[i].onclick = null;
    }
  }

  // issues here, DOM not re-rendering upon run. ALSO, needs to be implemented in some sort of user usable way
  requestCard(req) {
    const request = req.slice(0, 1);
    const opponent = this.players[this.OpponentPlayer];
    let requestedCard = null;
    opponent.hand.forEach((string, index) => {
      const start = string.lastIndexOf('/')+1;
      const handCompare = string.slice(start, start+1);
      if (handCompare === request) {
        requestedCard = this.players[this.OpponentPlayer].giveOneCard(index);
      }
    });
    this.players[this.CurrentPlayer].getOneCard(requestedCard);
  }
}

module.exports = Game;
