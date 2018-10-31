class Player {
  constructor(player){
      this.hand = [];
      this.name = player.name;
      this.score = 0;
      this.discarded = [];
      this.nextMatchToCheck = [];
      this.playerId = player.id;
      this.giveCards = this.giveCards.bind(this);
      this.giveOneCard = this.giveOneCard.bind(this);
  }
  createNextCheck(index,name){
    if(!this.nextMatchToCheck.length){
      this.nextMatchToCheck.push({index,name});
    }
    if(this.nextMatchToCheck.length === 1 && this.nextMatchToCheck[0].name !== name){
      this.nextMatchToCheck.push({index,name});
      return this.checkMatches(this.nextMatchToCheck);
    }
    return false;
  }
  checkMatches(cards){
    let values = cards.map(function(card){
      return card.name[card.name.lastIndexOf('/')+1]
    });
    if(values[0] === values[1]){
      this.score++;
      this.nextMatchToCheck = [];
      this.discardMatches(cards);
      return {isChanged: true, hand: this.hand};
    }
    this.nextMatchToCheck = [];
    return false;
  }
  discardMatches(cards){
    let discards = this.giveCards(cards);
    this.discarded = [...this.discarded, ...discards];
  }
  getOneCard(card){
    this.hand.push(card);
    return;
  }
  giveOneCard(index){
    let requestedCard = this.hand[index];
    this.hand = [...this.hand.slice(0,index),...this.hand.slice(index+1)];
    return requestedCard;
  }
  giveCards(payload){
    let dispatch = [];
    //sorting here by index to remove cards from right to left, to avoid fouling organization and removing wrong card
    let cards = payload.sort(function(a,b){return b.index-a.index})
    for(let card of cards){
      dispatch.push(this.hand[card.index]);
      this.hand = [...this.hand.slice(0,card.index),...this.hand.slice(card.index+1)];
    }
    return dispatch;
  }
}