class Game {
  constructor(playOne, playTwo){
      this.players = [new Player(0, playOne), new Player(1, playTwo)];
      this.scoreboard = [];
      this.deck = new Deck;
      this.playerTurn = 0;
  }
  startGame(){
      this.deck.createDeck();
      this.newDeal();
  }
  resetGame(){
      game = new Game
  }
  newDeal(){
      let maxDeal = 10;
      let playerId = 0;
      while(maxDeal){
          this.players[playerId].getCard(this.deck.giveCard());
          maxDeal--;
          playerId = playerId === 0? 1 : 0;
      }
  }
  nextTurn(){
      this.playerturn = this.playerTurn === 0 ? 1 : 0;
      return
  }
}