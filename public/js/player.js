class Player {
  constructor(id, playerName){
      this.hand = [];
      this.playerName = playerName;
      this.matches = [];
      this.playerId = id;
  }
  checkMatches([card1,card2]){
      if(this.hand[card1] === this.hand[card2]){
          return true;
      }
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
export default Player;