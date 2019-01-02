import Cards from './cards';

class Deck {
  constructor(discards = []) {
    this.cards = [];
    this.cardBack = 'assets/images/cards/purple_back.jpg';
    this.images = Cards;
    this.discards = discards;
    this.giveOneCard = this.giveOneCard.bind(this);
  }

  createDeck() {
    this.cards = [];
    const unshuffled = this.images.slice();
    const shuffled = [];
    while (unshuffled.length) {
      const card = Math.floor(Math.random() * unshuffled.length);
      shuffled.push(unshuffled[card]);
      unshuffled.splice(card, 1);
    }
    this.cards = shuffled;
  }

  giveOneCard(index = 0) {
    const card = this.cards[index];
    this.cards = [
      ...this.cards.slice(0, index),
      ...this.cards.slice(index + 1),
    ];
    return card;
  }

  recieveDiscard(card) {
    this.discards.push(card);
  }
}

module.exports = Deck;
