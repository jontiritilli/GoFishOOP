class Game {
  constructor(names){
    this.players = names.map(function(name, index){
      return new Player({id: index, name: name})
    });
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
  drawCard(index){
    const card = this.deck.giveCard(index);
    this.players[this.playerTurn].getCard(card);
    this.nextTurn();
    return this.playerTurn;
  }
  drawFive(){
    for(let i = 0; i < 5; i++){
      const card = this.deck.giveCard(0);
      this.players[this.playerTurn].getCard(card)
    }
    return this.playerTurn;
  }
  pauseOpponentClicks(){
    let opponent = this.playerTurn===0? 1 : 0;
    let container = Array.from(document.getElementById('hand'+opponent).childNodes);
    for(let i = 0; i < container.length; i++){
      container[i].onclick = null;
    }
  return;
  }
}