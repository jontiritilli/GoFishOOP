import Game from './game';

let game = null;

function newGame() {
  const players = [
    'Jon' || document.getElementById('p1Name').value,
    'Shaina' || document.getElementById('p2Name').value,
  ];
  for (let i = 0; i < players.length; i++) {
    if (players[i].length < 2) {
      return {
        error: 'please enter more than 2 characters',
      };
    }
  }
  game = new Game(players);
  renderPlayerInfo(game.players);
  return game;
}

function cardMaker(payload) {
  const { id, array, elementClass, player, image } = payload;
  const element = document.getElementById(id);
  // empty div before building
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  const cards = [];
  for (let i = 0; i < array.length; i++) {
    const img = document.createElement('img');
    const src = document.createAttribute('src');
    const cl = document.createAttribute('class');
    const index = document.createAttribute('index');
    const pNum = player
      ? document.createAttribute('player')
      : document.createAttribute('deck');
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
}

function renderCards() {
  if (game !== null) {
    cardMaker({
      id: 'hand0',
      elementClass: 'handImg',
      array: game.players[0].hand,
      player: 0,
    });
    cardMaker({
      id: 'hand1',
      elementClass: 'handImg',
      array: game.players[1].hand,
      player: 1,
    });
    cardMaker({
      id: 'cardpool',
      elementClass: 'cardPoolImg',
      array: game.deck.cards,
      player: null,
      image: game.deck.cardBack,
    });
  }
}

function renderPlayerInfo(players) {
  const currentPlayer = game.players[game.CurrentPlayer].name;
  const playerDisplay = document.getElementById('currentPlayer');
  while (playerDisplay.firstChild) {
    playerDisplay.removeChild(playerDisplay.firstChild);
  }
  const currentName = document.createTextNode(currentPlayer);
  playerDisplay.appendChild(currentName);
  for (let i = 0; i < players.length; i++) {
    const element = document.getElementById(`p${players[i].playerId}Display`);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    const name = document.createTextNode(players[i].name);
    const score = document.createTextNode(players[i].score);
    element.appendChild(name);
    element.appendChild(score);
  }
}

function toggleShow(element) {
  return element.classList.toggle('hidden');
}

function play() {
  const modal = document.getElementById('modal');
  const response = newGame();
  if (response.error) {
    console.log(response.error);
    return response.error;
  }
  game.startGame();
  toggleShow(modal);
  renderCards();
}

(function addEventHandlers() {
  const modalBtn = document.getElementById('modalBtn');
  modalBtn.addEventListener('click', () => {
    play();
  });
})();

function newHand(player, index, name) {
  const payload = game.players[player].createNextCheck(parseInt(index), name);
  if (payload.isChanged) {
    if (payload.hand.length < 1) {
      game.drawFive();
      game.nextTurn();
    }
    renderCards();
    game.pauseOpponentClicks();
  }
}

function drawOne(index) {
  game.drawOneCard(parseInt(index));
  renderCards();
  game.pauseOpponentClicks();
}

function cardEventHandlers(arr, id, player) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i].getAttribute('index');
    const name = arr[i].getAttribute('src');
    if (id !== 'cardpool') {
      arr[i].onclick = newHand(player, index, name);
    } else {
      arr[i].onclick = drawOne(index);
    }
  }
}
