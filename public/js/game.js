class Game {
  constructor(names){
    this.players = names.map(function(name, index){
      return new Player({id: index, name: name})
    });
    this.scoreboard = [];
    this.deck = new Deck;
    this.CurrentPlayer = 0;
    this.OpponentPlayer = 1;
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
      this.players[playerId].getOneCard(this.deck.giveOneCard(0));
      maxDeal--;
      playerId = !playerId ? 1 : 0;
    }
    return;
  }
  nextTurn(){
    if(this.CurrentPlayer){
      this.CurrentPlayer = 0;
      this.OpponentPlayer = 1;
      return;
    }
    this.CurrentPlayer = 1;
    this.OpponentPlayer = 0;
    return;
  }
  drawOneCard(index){
    const card = this.deck.giveOneCard(index);
    this.players[this.CurrentPlayer].getOneCard(card);
    this.nextTurn();
    return this.CurrentPlayer;
  }
  drawFive(){
    for(let i = 0; i < 5; i++){
      const card = this.deck.giveOneCard(0);
      this.players[this.CurrentPlayer].getOneCard(card)
    }
    return this.CurrentPlayer;
  }
  pauseOpponentClicks(){
    let container = Array.from(document.getElementById('hand'+this.OpponentPlayer).childNodes);
    for(let i = 0; i < container.length; i++){
      container[i].onclick = null;
    }
    return;
  }

  //issues here, DOM not re-rendering upon run. ALSO, needs to be implemented in some sort of user usable way
  requestCard(req){
    let request = req.slice(0, 1);
    let opponent = this.players[this.OpponentPlayer];
    let requestedCard = null;
    opponent.hand.forEach((string, index) => {
      let start = string.lastIndexOf('/')+1;
      let handCompare = string.slice(start, start+1);
      if(handCompare == request){
        requestedCard = this.players[this.OpponentPlayer].giveOneCard(index);
      }
    });
    this.players[this.CurrentPlayer].getOneCard(requestedCard);
    return console.log("success");
  }
}