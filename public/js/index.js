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
  printPlayerInfo(players);
  game = new Game(players);
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
  printCards();
  return;
};
function cardMaker(elementToName, elementToClass, array, player){
  let element = document.getElementById(elementToName);
  //empty div before building
  while(element.firstChild){
    element.removeChild(element.firstChild)
  }
  let cards = [];
  for(let i = 0; i<array.length; i++){
    let img = document.createElement('img');
    let src = document.createAttribute('src');
    let cl = document.createAttribute('class');
    let index = document.createAttribute('index');
    let pNum = player ? document.createAttribute('player'): document.createAttribute('deck');
    src.value = array[i];
    cl.value = elementToClass;
    index.value = i;
    pNum.value = player;
    img.setAttributeNode(src);
    img.setAttributeNode(cl);
    img.setAttributeNode(index);
    img.setAttributeNode(pNum);
    element.appendChild(img);
    cards.push(img);
  }
  cardEventHandlers(cards, player);
  return;
}
function cardEventHandlers(arr, player = null){
  for(let i = 0; i<arr.length; i++){
    let index = arr[i].getAttribute('index');
    let name = arr[i].getAttribute('src');
    if(player !== null){
      arr[i].onclick = function _func(){
        let isChanged = game.players[player].createNextCheck(parseInt(index), name);
        if(isChanged){
          printCards();
        }
      }
    } else {
      arr[i].onclick = function _func(){
        console.log('clicked')
        game.drawCard(parseInt(i));
        printCards();
      }
    }
  }
}
function printCards(){
  if(game !== null){
    cardMaker('hand0', 'handImg', game.players[0].hand, 0);
    cardMaker('hand1', 'handImg', game.players[1].hand, 1);
    cardMaker('cardpool', 'cardPoolImg', game.deck.cards);
  }
  return;
}
function printPlayerInfo(players){
  for(let i = 0; i < players.length; i++){
    let node = document.createTextNode(players[i]);
    document.getElementById('p'+i+'Display').appendChild(node);
  }
  return;
}
function toggleShow(element){
  return element.classList.toggle('hidden');
}