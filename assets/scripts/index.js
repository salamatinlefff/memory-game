
import { gamePage, addLayout, deleteLayout, homePage } from './layout.js';
import { changeTime, returnSeconds } from './changeTime.js';
import { localResults } from './localResults.js';
import { audio, music } from './music.js';
import { headerEvents } from './headerEvents.js';

let matchedCard = 0
let cardOne, cardTwo;
let disableDeck = false;

export const init = (page) => {
    deleteLayout();
    addLayout(page);
    setTimeout( () => {
      cards();
    }, 350)
}

  init(homePage());
  headerEvents();
  music();

function cards() {
  const cards = document.querySelectorAll('.card');

  cards.forEach( card => {
    card.addEventListener('click', flipCard)
  });

  
}

export const getTime = (time) => {
  return time
}

export function shuffleCard(cards) {
  matchedCard = 0
  cardOne, cardTwo = '';
  disableDeck = false;

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

  arr.sort( () => Math.random() > 0.5 ? 1 : -1);

  cards.forEach( (card, index) => {
    card.classList.remove('flip');

    let ImgTag = card.querySelector('.back_img');
    ImgTag.src = `./assets/img/img-${arr[index]}.png`;

    card.addEventListener('click', flipCard);
  })
}

function matchCards(imgOneSrc, imgTwoSrc, cardMain, cardSecond) {
  if(imgOneSrc === imgTwoSrc) {
    matchedCard += 1;
    
    audio.positiveResponse.pause();
    audio.positiveResponse.currentTime = 0;
    audio.positiveResponse.play();

    cardMain.classList.add('win');
    cardSecond.classList.add('win');

    if(matchedCard === 8) {
      const overlay = document.querySelector('.overlay');
      const resume = document.querySelector('.resume');

      audio.victory.play();
      changeTime(false, true);

      let result = returnSeconds();
      localResults(result);
      matchedCard = 0;
      cardOne = cardTwo = '';
      setTimeout( () => {
        init(gamePage());
        changeTime(true);
        overlay.classList.add('overlay_active');
        resume.classList.add('resume_active');
      }, 3000)

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
  }, 700)

}

const flipCard = ({target: clickedCard}) => {
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

console.log(`
  Приветики всем кто читает этот текст ✌

  "По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10" - результат специально не добавляю после победы, мне не нравится эта идея)

  Если есть какие-то вопросики или предложения и пожелания, буду рад услышать в  дискорде: lefff#8383, или в телеграме: http://t.me/salamatinlefff 
  =)
`);