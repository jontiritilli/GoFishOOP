let game = null;

(function addEventHandlers(){
  let cardpool = document.getElementById('cardpool');
  let modalBtn = document.getElementById('modalBtn');
  modalBtn.addEventListener('click', function(){
    play();
    return;
  })
})();
function newGame(){
  let name1 = 'Jon' || document.getElementById('playerOneName').value;
  let name2 = 'Shaina' || document.getElementById('playerTwoName').value;
  if(name1.length < 2 || name2.length < 2){
    return {error: 'please enter more than 2 characters'};
  }
  playerInfoToDom(name1,name2);
  game = new Game(name1, name2);
  return {success: 'game started'};
}
function playerInfoToDom(name1, name2){
  let name1Node = document.createTextNode(name1);
  document.getElementById('playOneName').appendChild(name1Node);
  let name2Node = document.createTextNode(name2);
  document.getElementById('playTwoName').appendChild(name2Node);
  return;
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
  showCards();
  return;
};
function DOMCards(elementName='', elementClass='', array=[] ,callback){
  array.map((card,index)=>{
    let element = document.getElementById(elementName);
    let img = document.createElement('img');
    let src = document.createAttribute('src');
    let cl = document.createAttribute('class');
    src.value = card;
    cl.value = elementClass;
    img.setAttributeNode(src);
    img.setAttributeNode(cl);
    img.addEventListener('click', function(){
      callback(0,index);
    });
    element.appendChild(img);
  })
  return;
}
function showCards(){
  if(game !== null){
    DOMCards('handOne', 'handImg', game.players[0].hand, game.addToCompare);
    DOMCards('handTwo', 'handImg', game.players[1].hand, game.addToCompare);
    DOMCards('cardpool', 'cardPoolImg', game.deck.cards, game.deck.giveCard);
  }
  return;
}
function toggleShow(element){
  return element.classList.toggle('hidden');
}