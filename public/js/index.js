let game = null;

(function addEventHandlers(){
  let modalBtn = document.getElementById('modalBtn');
  modalBtn.addEventListener('click', function(){
    play();
    return;
  })
})();
function newGame(){
  let players = ['Jon' || document.getElementById('p1Name').value, 'Shaina' || document.getElementById('p2Name').value];
  for(let i of players){
    if(i.length < 2){
      return {error: 'please enter more than 2 characters'};
    }
  }
  game = new Game(players);
  renderPlayerInfo(game.players);
  return game;
}
function play(){
  let modal = document.getElementById('modal');
  let response = newGame();
  if(response.error){
    console.log(response.error);
    return response.error;
  }
  game.startGame();
  toggleShow(modal);
  renderCards();
  return;
};
function cardMaker(payload){
  let { id, array, elementClass, player, image } = payload;
  let element = document.getElementById(id)
  //empty div before building
  while(element.firstChild){
    element.removeChild(element.firstChild)
  };
  let cards = [];
  for(let i = 0; i<array.length; i++){
    let img = document.createElement('img');
    let src = document.createAttribute('src');
    let cl = document.createAttribute('class');
    let index = document.createAttribute('index');
    let pNum = player ? document.createAttribute('player'): document.createAttribute('deck');
    src.value = image || array[i];
    cl.value = elementClass;
    index.value = i;
    pNum.value = player;
    img.setAttributeNode(src);
    img.setAttributeNode(cl);
    img.setAttributeNode(index);
    img.setAttributeNode(pNum);
    element.appendChild(img);
    cards.push(img);
  }
  cardEventHandlers(cards, id, player);
  renderPlayerInfo(game.players);
  return;
}
function cardEventHandlers(arr, id, player){
  for(let i = 0; i<arr.length; i++){
    let index = arr[i].getAttribute('index');
    let name = arr[i].getAttribute('src');
    if(id !== 'cardpool'){
      arr[i].onclick = function _func(){
        console.log('clicked player ' + player+'\'s deck')
        let payload = game.players[player].createNextCheck(parseInt(index), name);
        if(payload.isChanged){
          if(payload.hand.length < 1){
            game.drawFive();
            game.nextTurn();
          }
          renderCards();
          game.pauseOpponentClicks();
        }
      }
    } else {
      arr[i].onclick = function _func(){
        game.drawCard(parseInt(i));
        renderCards();
        game.pauseOpponentClicks();
      }
    }
  }
}
function renderCards(){
  if(game !== null){
    cardMaker({id:'hand0', elementClass:'handImg', array: game.players[0].hand, player: 0});
    cardMaker({id: 'hand1', elementClass: 'handImg', array: game.players[1].hand, player: 1});
    cardMaker({id: 'cardpool', elementClass: 'cardPoolImg', array: game.deck.cards, player: null, image: game.deck.cardBack});
  }
  return;
}
function renderPlayerInfo(players){
  let currentPlayer = game.players[game.playerTurn].name;
  let playerDisplay = document.getElementById('currentPlayer');
  while(playerDisplay.firstChild){
    playerDisplay.removeChild(playerDisplay.firstChild)
  }
  let currentName = document.createTextNode(currentPlayer);
  playerDisplay.appendChild(currentName);
  for(let i = 0; i < players.length; i++){
    let element = document.getElementById('p'+players[i].playerId+'Display');
    while(element.firstChild){
      element.removeChild(element.firstChild)
    };
    let name = document.createTextNode(players[i].name);
    let score = document.createTextNode(players[i].score);
    element.appendChild(name);
    element.appendChild(score);
  }
  return;
}
function toggleShow(element){
  return element.classList.toggle('hidden');
}