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
    if(this.playerTurn){
      this.playerTurn--;
      return this.playerTurn;
    }
    this.playerTurn++;
    return this.playerTurn;
  }
  drawCard(i){
    const card = this.deck.giveCard(i);
    this.players[this.playerTurn].getCard(card);
    this.nextTurn();
    return this.playerTurn;
  }
  pausePlayerClicks(){
    let opponent = this.playerTurn===0? 1 : 0
    let container = document.querySelectorAll('img[player]');
    console.log(container);
    let array = container.querySelectorAll('img[player='+this.playerTurn+']');
    console.log(array);
    array.forEach(function(card){

    })
  }
}