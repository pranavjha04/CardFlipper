'use strict';

const cardsContainer = document.querySelector('.cards-container');
const randomColors  = ["#ADD8E6", "#98FF98", "#FFDAB9", "#E6E6FA", "#F08080", "#FFFACD"];
const cards = document.querySelectorAll('.card');
const filledIndex = new Set();
const moves = document.querySelector('.moves');
const maxScore = document.querySelector('.max-score');
const resetButton = document.querySelector('.reset');
const sidebar = document.querySelector('.side-bar');
class Game{
    _firstClicked;
    _secondClicked;
    _moveCount;
    _matchedCount;
    constructor(){
        filledIndex.clear();
        this._firstClicked = null;
        this._secondClicked = null;
        this._moveCount = 0;
        this._matchedCount = 0;
        this.#getColors();
        cards.forEach(card => card.addEventListener('click',this._cardClickEvent.bind(this)));
        resetButton.addEventListener('click',this._init.bind(this));
    }

    _init(){
        this._firstClicked = null;
        this._secondClicked = null;
        this._moveCount = 0;
        this._matchedCount = 0;
        filledIndex.clear();
        moves.textContent = 'Moves : 0';
        sidebar.style.backgroundColor = 'white';
        cards.forEach((card) => {
            card.style.backgroundColor = 'white';
            card.classList.toggle('flip');
            card.classList.remove('matched');
        });
        this.#getColors();
    }
    #getColors(){
        randomColors.forEach((color) => {
            const [randomCardOne,randomCardTwo] = [this.#getRandomNumber(),this.#getRandomNumber()];
            document.querySelector(`.card-${randomCardOne}`).setAttribute('code',color);
            document.querySelector(`.card-${randomCardTwo}`).setAttribute('code',color);
        });
    }

    _cardClickEvent(e){
        const clicked = e.target;

        if(clicked === this._firstClicked || clicked.classList.contains('matched')) return;

        if(!this._firstClicked){
            this._firstClicked = clicked;
            this._firstClicked.classList.toggle('flip');
            e.target.style.backgroundColor = clicked.getAttribute('code');
        }
        else if(!this._secondClicked){
            this._secondClicked = clicked;
            this._secondClicked.classList.toggle('flip');
            e.target.style.backgroundColor = clicked.getAttribute('code');
            this.#checkMatch();
        }
    }

    #checkMatch() {
        const firstColor = this._firstClicked.getAttribute('code');
        const secondColor = this._secondClicked.getAttribute('code');
    
        setTimeout(() => {
            if (firstColor !== secondColor) {
                this._firstClicked.classList.toggle('flip');
                this._secondClicked.classList.toggle('flip');
                this._firstClicked.style.backgroundColor = 'white';
                this._secondClicked.style.backgroundColor = 'white';
            }
            else{
                this._firstClicked.classList.add('matched');
                this._secondClicked.classList.add('matched');
                ++this._matchedCount
            }
            this._firstClicked = null;
            this._secondClicked = null;
            ++this._moveCount;
            this._updateStats();
        }, 500); 
    }
    _updateStats(){
        moves.textContent = `Moves : ${this._moveCount}`;
        if(this._matchedCount === 6){
            const newMaxScore = Math.max(+this._moveCount,+maxScore.textContent.slice(-1));
            maxScore.textContent = `Max Score : ${newMaxScore}`;
            sidebar.style.backgroundColor = `#60b347`;
        }
    }
    #getRandomNumber(){
        let randomNum = Math.trunc(Math.random()*12)+1;
        while(filledIndex.has(randomNum)){
            randomNum = Math.trunc(Math.random()*12)+1;
        }
        filledIndex.add(randomNum);
        return randomNum;
    }
}

const game = new Game();
