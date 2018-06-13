class Player {
  constructor(id, playerName){
      this.hand = [];
      this.playerName = playerName;
      this.matches = [];
      this.nextMatchToCheck = [];
      this.playerId = id;
  }
  createNextCheck(index){
    let card = this.hand[index];
    if(this.nextMatchToCheck.length<1){
      return this.nextMatchToCheck.push(card);
    }
    return this.checkMatches();
  }
  checkMatches(){
    if(this.nextMatchToCheck[0] === this.nextMatchToCheck[1]){
      this.nextMatchToCheck = [];
      return console.log(true);
    }
    this.nextMatchToCheck = [];
    return console.log(false);
  }
  getCard(card){
    return this.hand.push(card);
  }
  giveCard(index){
    const cardToGive = this.hand.splice(index,1);
    return cardToGive;
  }
  handToFive(id){
    if(this.player[id].hand.length >= 5){
      return;
    }
    while(this.player[id].hand.length <= 5){
      this.player[id].hand.push(this.deck.giveCard());
    }
    return;
  }
}