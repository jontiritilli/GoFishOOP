class Game {
  constructor(playOne, playTwo){
    this.players = [new Player(0, playOne), new Player(1, playTwo)];
    this.scoreboard = [];
    this.deck = new Deck;
    this.playerTurn = 0;
    this.addToCompare = this.addToCompare.bind(this);
    this.drawCard = this.drawCard.bind(this);
  }
  startGame(){
    this.deck.createDeck();
    this.newDeal();
    return;
  }
  resetGame(){
    return game = new Game
  }
  newDeal(){
    let maxDeal = 10;
    let playerId = 0;
    while(maxDeal){
      this.players[playerId].getCard(this.deck.giveCard(0));
      maxDeal--;
      playerId = playerId === 0? 1 : 0;
    }
    return;
  }
  nextTurn(){
    this.playerturn = this.playerTurn === 0 ? 1 : 0;
    return;
  }
  drawCard(index){
    let card = this.deck.giveCard(index);
    this.players[this.playerTurn].getCard(card);
    return this.playerTurn = this.playerTurn === 0 ? 1 : 0;
  }
  stealCard(id, index){
    let card = this.player.giveCard(index);
    this.players[id].getCard(card);
    return this.playerTurn = this.playerTurn === 0 ? 1 : 0;
  }
  addToCompare(index){
    let player = this.players[this.playerTurn];
    player.createNextCheck(index);
    return;
  }
}