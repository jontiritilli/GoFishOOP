let game = null;

(function addEventHandlers(){
  let cardpool = document.getElementById('cardpool');
  let modalBtn = document.getElementById('modalBtn');
  cardpool.addEventListener('click',
    function(){
      console.log('clicked')
    }
  )
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
}
function play(){
  let modal = document.getElementById('modal');
  let response = newGame();
  if(response.error){
    console.log(response.error);
    return response.error;
  }
  console.log(response.success);
  game.startGame();
  toggleShow(modal);
  showCards();
};
function addToCompare(id, index){
  console.log('id '+id+' index '+ index)
  let player = game.players[id];
  player.matchToCheck.push(player.hand[index]);
}
function showCards(){
  if(game !== null){
    let handOne = game.players[0].hand.map((card,index)=>{
      let newDiv = document.createElement('div');
      let newNode = document.createTextNode(card);
      let hand = document.getElementById('handOne');
      newDiv.appendChild(newNode);
      newDiv.addEventListener('click', function(){
        addToCompare(0,index)
      });
      hand.appendChild(newDiv);
    })
    let handTwo = game.players[1].hand.map((card,index)=>{
      let newDiv = document.createElement('div');
      let newNode = document.createTextNode(card);
      let hand = document.getElementById('handTwo');
      newDiv.appendChild(newNode);
      newDiv.addEventListener('click', function(){
        addToCompare(1,index)
      });
      hand.appendChild(newDiv);
    })
    let cardpool = game.deck.cards.map((card,index)=>{
      let pool = document.getElementById('cardpool');
      let newNode = document.createTextNode(card+',');
      pool.appendChild(newNode);
      /*newDiv.addEventListener('click', function(){
        here's where i will add code to pick up cards
      });*/
    })
  }
  return
}
function toggleShow(element){
  element.classList.toggle('hidden')
}