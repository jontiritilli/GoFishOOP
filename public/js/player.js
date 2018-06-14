class Player {
  constructor(id, name){
      this.hand = [];
      this.playerName = name;
      this.matches = 0;
      this.discarded = [];
      this.nextMatchToCheck = [];
      this.playerId = id;
      this.giveCard = this.giveCard.bind(this);
  }
  createNextCheck(index,name){
    if(!this.nextMatchToCheck.length){
      this.nextMatchToCheck.push({index,name});
    }
    if(this.nextMatchToCheck.length === 1 && this.nextMatchToCheck[0].name !== name){
      this.nextMatchToCheck.push({index,name});
      return this.checkMatches(this.nextMatchToCheck[0], this.nextMatchToCheck[1]);
    }
    return false;
  }
  checkMatches(card1, card2){
    let index1 = card1.name.lastIndexOf('/')+1;
    let index2 = card2.name.lastIndexOf('/')+1;
    if(card1.name[index1] === card2.name[index2]){
      this.matches++;
      this.nextMatchToCheck = [];
      this.discardMatches([card1, card2]);
      return true;
    }
    this.nextMatchToCheck = [];
    return false;
  }
  discardMatches(cards){
    let discards = this.giveCard(cards);
    this.discarded = [...this.discarded, ...discards];
  }
  getCard(card){
    this.hand.push(card);
    return;
  }
  giveCard(payload){
    let dispatch = []
    let cards = [...payload];
    for(let card of cards){
      dispatch.push(this.hand[card.index]);
      this.hand = [...this.hand.slice(0,card.index),...this.hand.slice(card.index+1)];
    }
    return dispatch;
  }
}