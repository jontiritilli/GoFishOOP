class Player {
  constructor(id, playerName){
      this.hand = [];
      this.playerName = playerName;
      this.matches = [];
      this.nextMatchToCheck = [];
      this.playerId = id;
      this.getCard = this.getCard.bind(this);
  }
  createNextCheck(index){
    let card = this.hand[index];
    if(this.nextMatchToCheck.length<2){
      this.nextMatchToCheck.push(card);
    }
    if(this.nextMatchToCheck.length===2){
      this.checkMatches();
    }
    return;
  }
  checkMatches(){
    let cardNumOneIdx = this.nextMatchToCheck[0].lastIndexOf('/')+1;
    let cardNumTwoIdx = this.nextMatchToCheck[1].lastIndexOf('/')+1;
    if(this.nextMatchToCheck[0][cardNumOneIdx] === this.nextMatchToCheck[1][cardNumTwoIdx]){
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