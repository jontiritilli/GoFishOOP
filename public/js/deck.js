class Deck {
  constructor(discards = []){
      this.cards = [];
      this.images = ['images/cards/2C.jpg','images/cards/3C.jpg','images/cards/4C.jpg','images/cards/5C.jpg','images/cards/6C.jpg','images/cards/7C.jpg','images/cards/8C.jpg','images/cards/9C.jpg','images/cards/10C.jpg','images/cards/QC.jpg','images/cards/QC.jpg','images/cards/KC.jpg','images/cards/AC.jpg','images/cards/2D.jpg','images/cards/3D.jpg','images/cards/4D.jpg','images/cards/5D.jpg','images/cards/6D.jpg','images/cards/7D.jpg','images/cards/8D.jpg','images/cards/9D.jpg','images/cards/10D.jpg','images/cards/JD.jpg','images/cards/QD.jpg','images/cards/KD.jpg','images/cards/AD.jpg','images/cards/2H.jpg','images/cards/3H.jpg','images/cards/4H.jpg','images/cards/5H.jpg','images/cards/6H.jpg','images/cards/7H.jpg','images/cards/8H.jpg','images/cards/9H.jpg','images/cards/10H.jpg','images/cards/JH.jpg','images/cards/QH.jpg','images/cards/KH.jpg','images/cards/AH.jpg','images/cards/2S.jpg','images/cards/3S.jpg','images/cards/4S.jpg','images/cards/5S.jpg','images/cards/6S.jpg','images/cards/7S.jpg','images/cards/8S.jpg','images/cards/9S.jpg','images/cards/10S.jpg','images/cards/JS.jpg','images/cards/QS.jpg','images/cards/KS.jpg','images/cards/AS.jpg',];
      this.discards = discards;
  }
  createDeck(){
      this.cards = [];
      const unshuffled = this.images.slice();
      const shuffled = [];
      // for(let i = 0; i < unshuffled.length; i++){
      //         if(!shuffled.includes(images[i])){
      //             shuffled.push(images[i]);
      //         }
      //     }
      // }
      while(unshuffled.length){
          let nextIndex = Math.floor(Math.random()*unshuffled.length);
          shuffled.push(unshuffled[nextIndex]);
          unshuffled.splice(nextIndex, 1);
      }
      this.cards = shuffled;
  }
  giveCard(){
      const card = this.cards[0];
      this.cards.splice(0,1);
      return card;
  }
}
