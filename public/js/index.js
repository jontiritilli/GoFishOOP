let game = null;

(function addEventHandlers(){
  let modalBtn = document.getElementById('modalBtn');
  modalBtn.addEventListener('click', function(){
    play();
    return;
  })
})();
function newGame(){
  let p1 = 'Jon' || document.getElementById('p1Name').value;
  let p2 = 'Shaina' || document.getElementById('p2Name').value;
  if(p1.length < 2 || p2.length < 2){
    return {error: 'please enter more than 2 characters'};
  }
  printPlayerInfo(p1, p2);
  game = new Game(p1, p2);
  return {};
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
      arr[i].addEventListener('click', function(){
        let isChanged = game.players[player].createNextCheck(parseInt(index), name);
        if(isChanged){
          printCards();
        }
      })
    } else {
      arr[i].addEventListener('click', function(){
        console.log('clicked')
        game.drawCard(parseInt(i));
        printCards();
      })
    }
  }
}
function printCards(){
  if(game !== null){
    cardMaker('handOne', 'handImg', game.players[0].hand, 0);
    cardMaker('handTwo', 'handImg', game.players[1].hand, 1);
    cardMaker('cardpool', 'cardPoolImg', game.deck.cards);
  }
  return;
}
function printPlayerInfo(p1, p2){
  let p1Node = document.createTextNode(p1);
  document.getElementById('p1Display').appendChild(p1Node);
  let p2Node = document.createTextNode(p2);
  document.getElementById('p2Display').appendChild(p2Node);
  return;
}
function toggleShow(element){
  return element.classList.toggle('hidden');
}