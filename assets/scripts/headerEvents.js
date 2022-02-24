import { isStartedGame, reset } from './index.js';
import { changeTime } from './changeTime.js';
import { addLayout, gamePage, homePage } from './layout.js';
import { audio } from './music.js';

const ifGameAndStartedGame = () => {
  const mainHome = document.querySelector('.main__home');

  if(!mainHome) {
    if(isStartedGame()) {
      return changeTime(false, false);
    } else {
      return changeTime(false, true);
    }
  }
}

export const audioClick = () => {
  audio.click.pause();
  audio.click.currentTime = 0;
  audio.click.play();
}

const closeOverlay = (overlay, modal, result) => {
  overlay.classList.remove('overlay_active');
  modal.classList.remove('modal_active');
  result.classList.remove('result_active');
}

export const headerEvents = () => {
  const restart = document.querySelector('.restart');
  const home = document.querySelector('.home');
  const settings = document.querySelector('.settings');
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  const result = document.querySelector('.result');
  const overlayClose = document.querySelector('.modal__close');
  const resultButton = document.querySelector('.result__button');

  restart.addEventListener('click', () => {
    audioClick();
    reset();
    init(gamePage());
    });

  settings.addEventListener('click', () => {
    changeTime(false, true);
    audioClick()

    overlay.classList.add('overlay_active');
    modal.classList.add('modal_active');
  });

  overlay.addEventListener('click', event => {
    if(event.target.classList.contains('overlay')) {
      ifGameAndStartedGame();
      audioClick();
      closeOverlay(overlay, modal, result);
    }
  });

  overlayClose.addEventListener('click', () => {
    audioClick();
    ifGameAndStartedGame();
    closeOverlay(overlay, modal, result);
  });

  resultButton.addEventListener('click', () => {
    audioClick();
    closeOverlay(overlay, modal, result);
  })

  home.addEventListener('click', () => {
    reset();
    audioClick()
    addLayout(homePage());
    changeTime(true);
  })
}