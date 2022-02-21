
import { addLayout, addPage, deleteLayout } from './layout.js';
import { changeTime, returnSeconds } from './changeTime.js';
import { localName } from './localName.js';
import { localResults } from './localResults.js';

const sidebars = addPage();

const container = document.querySelector('.container');
addLayout(sidebars, container)

const cards = document.querySelectorAll('.card');
const restart = document.querySelector('.restart');
const inputBackground = document.querySelector('.overlay__input_background')
const inputEffects = document.querySelector('.overlay__input_effects');
const settings = document.querySelector('.settings');
const overlay = document.querySelector('.overlay');
const overlayClose = document.querySelector('.overlay__close');
const muteBackground = document.getElementById('mute');
const timeText = document.querySelector('.time__text');
const home = document.querySelector('.home');
const homeForm = document.querySelector('.home__form');
const timeName = document.querySelector('.time__name');
const startButton = document.querySelector('.home__button');
let name;
let matchedCard = 0
let cardOne, cardTwo;
let disableDeck = false;
const positiveResponse = new Audio(`./assets/audio/positive1.mp3`);
const negativeResponse = new Audio(`./assets/audio/negative4.mp3`);
const victory = new Audio(`./assets/audio/victory.mp3`);
const background = new Audio(`./assets/audio/background2.mp3`);

// ! ДОБАВИТЬ АВТОМАТИЧЕСКУЮ СМЕНУ ВЁРСТКИ БЕЗ ПЕРЕЗАГРУЗКИ!!!


let backgroundIsPlaying = false;

inputBackground.addEventListener('input', () => {
  background.play();
  background.volume = inputBackground.value / 100
  backgroundIsPlaying = true;

  muteBackground.checked = true;
// 
  if(inputBackground.value <= 0) {
    muteBackground.checked = false;
  }
})

inputEffects.addEventListener('input', () => {
  victory.volume = inputEffects.value / 100;
  positiveResponse.volume = inputEffects.value / 100;
  negativeResponse.volume = inputEffects.value / 100;
})

background.addEventListener('ended', () => {
  background.pause();
  background.currentTime = 0;
  background.play();
  backgroundIsPlaying = true
})

export const getTime = (time) => {
  return time
}

const shuffleCard = () => {
  matchedCard = 0
  cardOne, cardTwo = '';
  disableDeck = false;

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

  // arr.sort( () => Math.random() > 0.5 ? 1 : -1);


  cards.forEach( (card, index) => {
    card.classList.remove('flip');

    let ImgTag = card.querySelector('.back_img');
    ImgTag.src = `./assets/img/img-${arr[index]}.png`;

    card.addEventListener('click', flipCard);
  })
}

const reset = () => {
  cardOne = '';
  cardTwo = '';
      
  cards.forEach( card => {
    card.classList.remove('win');
    card.classList.remove('win');
  })
};

const matchCards = (imgOneSrc, imgTwoSrc, cardMain, cardSecond) => {
  if(imgOneSrc === imgTwoSrc) {
    matchedCard += 1;

    positiveResponse.pause();
    positiveResponse.currentTime = 0;
    positiveResponse.play();

    cardMain.classList.add('win');
    cardSecond.classList.add('win');

    if(matchedCard === 8) {
      victory.play();

      let result = returnSeconds();
      localResults(result);
      changeTime(timeText, true);
      reset();


      setTimeout( () => {
        cards.forEach( card => {
          card.classList.add('win')
        })
      }, 10)

      setTimeout( () => {
        cards.forEach( card => {
          card.classList.remove('snake','win', 'flip');
        })
        location.reload()
        return shuffleCard();

        
      }, 3000)
    } else {
      cardOne.removeEventListener('click', flipCard);
      cardTwo.removeEventListener('click', flipCard);
    }
    cardOne = cardTwo = '';
    return disableDeck = false;
  }

  setTimeout( () => {
    negativeResponse.pause()
    negativeResponse.currentTime = 0;
    negativeResponse.play()
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

shuffleCard();


if(homeForm) {
  homeForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    let localNames = localStorage.getItem('memory-game-lefff_name');
    
    name = localNames ? localNames : homeForm[0].value;
    timeName.textContent = name;
    homeForm[0].value = ''
  
    localName(name);
    })
}


if(restart) {
  restart.addEventListener('click', () => {
    reset();
    shuffleCard();
    changeTime(timeText, false);
  });
}

settings.addEventListener('click', () => {
  overlay.classList.add('overlay_active')
});

overlayClose.addEventListener('click', () => {
  overlay.classList.remove('overlay_active')
});

home.addEventListener('click', () => {
  location = 'index.html'
  changeTime(timeText, true);
  // deleteLayout(gamePage);
  // addLayout(homePage);
})

muteBackground.addEventListener('change', () => {
  if(!backgroundIsPlaying) {
    background.play();
    backgroundIsPlaying = true;
  } else {
    background.pause();
    backgroundIsPlaying = false;
  }
})

if(startButton) {
  startButton.addEventListener('click', () => {
    location = 'game.html'
  })
}

cards.forEach( card => {
  card.addEventListener('click', flipCard)
})
