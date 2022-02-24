
import { gamePage, addLayout, deleteLayout, homePage } from './layout.js';
import { addZero, changeTime, returnSeconds, viewTime } from './changeTime.js';
import { audio, music } from './music.js';
import { headerEvents } from './headerEvents.js';
import { changeName } from './changeName.js';
import { localData } from './localData.js';

let matchedCard = 0
let cardOne, cardTwo;
let disableDeck = false;
let isStarted = false;
let bestResult = 0

export const init = (page) => {
  deleteLayout();
  addLayout(page);
  cards();
}
  init(homePage());
  headerEvents();
  music();
  changeName();

function cards() {
  const cards = document.querySelectorAll('.card');

  cards.forEach( card => {
    card.addEventListener('click', flipCard)
  });
}

export const setBestResult = value => {
  bestResult = value
}

export const isStartedGame = () => {
  return isStarted
}

export const reset = () => {
  matchedCard = 0
  cardOne = null
  cardTwo = null
  disableDeck = false;
  isStarted = false;
  changeTime(true)
}

const showResult = () => {
  const overlay = document.querySelector('.overlay');
  const result = document.querySelector('.result');
  const resultText = document.querySelector('.result__text');

  viewTime(resultText);

  overlay.classList.add('overlay_active');
  result.classList.add('result_active');
}
export function matchCards(imgOneSrc, imgTwoSrc, cardMain, cardSecond) {
  if(imgOneSrc === imgTwoSrc) {
    matchedCard += 1;
    
    audio.positiveResponse.pause();
    audio.positiveResponse.currentTime = 0;
    audio.positiveResponse.play();

    cardMain.classList.add('win');
    cardSecond.classList.add('win');

    if(matchedCard === 8) {
      audio.victory.play();
      showResult();
      changeTime(false, true);

      let result = `${addZero(returnSeconds() / 60)}:${addZero(addZero(returnSeconds() % 60))}`;
      const currentTime = returnSeconds();

      if(bestResult >= 0 && currentTime >= 5) {
        localData('best', currentTime); 
      } else {
        throw new Error(`your result '${currentTime}' less than 5, you are a cheating(`)
      }
      localData('history', result);

      setTimeout( () => {
        reset();
        init(gamePage());
      },1000)

    } else {
      cardOne.removeEventListener('click', flipCard);
      cardTwo.removeEventListener('click', flipCard);
    }
    cardOne = cardTwo = '';
    return disableDeck = false;
  }

  setTimeout( () => {
    audio.negativeResponse.pause()
    audio.negativeResponse.currentTime = 0;
    audio.negativeResponse.play()
    cardOne.classList.add('snake');
    cardTwo.classList.add('snake');
  }, 200);

  setTimeout( () => {
    cardOne.classList.remove('snake','win', 'flip');
    cardTwo.classList.remove('snake','win', 'flip');
    cardOne = cardTwo = '';
    disableDeck = false
  }, 500)
}

function flipCard({target: clickedCard}) {
  if(!isStarted) {
    changeTime(false, false)
    isStarted = true
  }

  if(cardOne !== clickedCard  && !disableDeck) {
    clickedCard.classList.add('flip');
  
    if(!cardOne) {
      return cardOne = clickedCard;
    } 
    cardTwo = clickedCard;

    disableDeck = true;

    let cardOneImg = cardOne.querySelector('.back_img').src;
    let cardTwoImg = cardTwo.querySelector('.back_img').src;
    matchCards(cardOneImg, cardTwoImg, cardOne, cardTwo)
  }
}