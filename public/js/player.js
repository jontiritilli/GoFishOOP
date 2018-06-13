class Player {
  constructor(id, playerName){
      this.hand = [];
      this.playerName = playerName;
      this.matches = [];
      this.matchToCheck = [];
      this.playerId = id;
  }
  checkMatches(){
      if(this.matchToCheck[0] === this.matchToCheck[1]){
        this.matchToCheck = [];
        return true;
      }
      this.matchToCheck = [];
      return false;
  }
  getCard(card){
      this.hand.push(card);
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
  }
}