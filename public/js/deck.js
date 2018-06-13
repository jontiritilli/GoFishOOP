class Deck {
  constructor(discards = []){
    this.cards = [];
    this.images = ['assets/images/cards/2C.jpg','assets/images/cards/3C.jpg','assets/images/cards/4C.jpg','assets/images/cards/5C.jpg','assets/images/cards/6C.jpg','assets/images/cards/7C.jpg','assets/images/cards/8C.jpg','assets/images/cards/9C.jpg','assets/images/cards/10C.jpg','assets/images/cards/JC.jpg','assets/images/cards/QC.jpg','assets/images/cards/KC.jpg','assets/images/cards/AC.jpg','assets/images/cards/2D.jpg','assets/images/cards/3D.jpg','assets/images/cards/4D.jpg','assets/images/cards/5D.jpg','assets/images/cards/6D.jpg','assets/images/cards/7D.jpg','assets/images/cards/8D.jpg','assets/images/cards/9D.jpg','assets/images/cards/10D.jpg','assets/images/cards/JD.jpg','assets/images/cards/QD.jpg','assets/images/cards/KD.jpg','assets/images/cards/AD.jpg','assets/images/cards/2H.jpg','assets/images/cards/3H.jpg','assets/images/cards/4H.jpg','assets/images/cards/5H.jpg','assets/images/cards/6H.jpg','assets/images/cards/7H.jpg','assets/images/cards/8H.jpg','assets/images/cards/9H.jpg','assets/images/cards/10H.jpg','assets/images/cards/JH.jpg','assets/images/cards/QH.jpg','assets/images/cards/KH.jpg','assets/images/cards/AH.jpg','assets/images/cards/2S.jpg','assets/images/cards/3S.jpg','assets/images/cards/4S.jpg','assets/images/cards/5S.jpg','assets/images/cards/6S.jpg','assets/images/cards/7S.jpg','assets/images/cards/8S.jpg','assets/images/cards/9S.jpg','assets/images/cards/10S.jpg','assets/images/cards/JS.jpg','assets/images/cards/QS.jpg','assets/images/cards/KS.jpg','assets/images/cards/AS.jpg',];
    this.discards = discards;
    this.giveCard = this.giveCard.bind(this);
  }
  createDeck(){
    this.cards = [];
    const unshuffled = this.images.slice();
    const shuffled = [];
    while(unshuffled.length){
      let nextIndex = Math.floor(Math.random()*unshuffled.length);
      shuffled.push(unshuffled[nextIndex]);
      unshuffled.splice(nextIndex, 1);
    }
    this.cards = shuffled;
  }
  giveCard(index){
    const card = this.cards[index];
    this.cards.splice(index,1);
    return card;
  }
}
