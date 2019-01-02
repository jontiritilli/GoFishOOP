class Player {
  constructor(player) {
    this.hand = [];
    this.name = player.name;
    this.score = 0;
    this.discarded = [];
    this.nextMatchToCheck = [];
    this.playerId = player.id;
    this.giveCards = this.giveCards.bind(this);
    this.giveOneCard = this.giveOneCard.bind(this);
  }

  createNextCheck(index, name) {
    if (!this.nextMatchToCheck.length) {
      this.nextMatchToCheck.push({ index, name });
    }
    if (
      this.nextMatchToCheck.length === 1 &&
      this.nextMatchToCheck[0].name !== name
    ) {
      this.nextMatchToCheck.push({ index, name });
      return this.checkMatches(this.nextMatchToCheck);
    }
    return false;
  }

  checkMatches(cards) {
    const values = cards.map(card => card.name[card.name.lastIndexOf('/') + 1]);
    if (values[0] === values[1]) {
      this.score++;
      this.nextMatchToCheck = [];
      this.discardMatches(cards);
      return { isChanged: true, hand: this.hand };
    }
    this.nextMatchToCheck = [];
    return false;
  }

  discardMatches(cards) {
    const discards = this.giveCards(cards);
    this.discarded = [...this.discarded, ...discards];
  }

  getOneCard(card) {
    this.hand.push(card);
  }

  giveOneCard(index) {
    const requestedCard = this.hand[index];
    this.hand = [...this.hand.slice(0, index), ...this.hand.slice(index + 1)];
    return requestedCard;
  }

  giveCards(payload) {
    const dispatch = [];
    // sorting here by index to remove cards from right to left, to avoid fouling organization and removing wrong card
    const cards = payload.sort((a, b) => b.index - a.index);
    for (let i = 0; i < cards.length; i++) {
      dispatch.push(this.hand[cards[i].index]);
      this.hand = [
        ...this.hand.slice(0, cards[i].index),
        ...this.hand.slice(cards[i].index + 1),
      ];
    }
    return dispatch;
  }
}

module.exports = Player;
