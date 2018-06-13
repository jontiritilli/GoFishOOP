class Deck {
  constructor(discards = []){
      this.cards = [];
      this.suites = ['h','d','s','c'];
      this.values = [2,3,4,5,6,7,8,9,10,'j','q','k','a'];
      this.discards = discards;
  }
  createDeck(){
      this.cards = [];
      const suites = this.suites.slice();
      const values = this.values.slice();
      const unshuffled = [];
      const shuffled = [];
      for(let i = 0; i < suites.length; i++){
          for(let k = 0; k < values.length; k++){
              const card = suites[i]+values[k];
              if(!unshuffled.includes(card)){
                  unshuffled.push(card);
              }
          }
      }
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
export default Deck;