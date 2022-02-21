import { init } from './index.js';
import { changeTime } from './changeTime.js';
import { gamePage, homePage } from './layout.js';
import { audio } from './music.js';

export const headerEvents = () => {
  const restart = document.querySelector('.restart');
  const home = document.querySelector('.home');
  const settings = document.querySelector('.settings');
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  const overlayClose = document.querySelector('.overlay__close');
  const resume = document.querySelector('.resume');

  restart.addEventListener('click', () => {
      audio.click.pause();
      audio.click.currentTime = 0;
      audio.click.play();

      overlay.classList.add('overlay_active');
      resume.classList.add('resume_active');

      init(gamePage());
      changeTime(true);
    });

  settings.addEventListener('click', () => {
    audio.click.pause();
    audio.click.currentTime = 0;
    audio.click.play();

    overlay.classList.add('overlay_active');
    modal.classList.add('modal_active');
  });

  overlay.addEventListener('click', event => {
    if(event.target.classList.contains('overlay')) {
      audio.click.pause();
      audio.click.currentTime = 0;
      audio.click.play();

      overlay.classList.remove('overlay_active');
      modal.classList.remove('modal_active');
    }
  });

  resume.addEventListener('click', () => {
    audio.click.pause();
    audio.click.currentTime = 0;
    audio.click.play();

    resume.classList.remove('resume_active');
    overlay.classList.remove('overlay_active');
    changeTime(true);
    changeTime(false);
  })

  overlayClose.addEventListener('click', () => {
    audio.click.pause();
    audio.click.currentTime = 0;
    audio.click.play();

    overlay.classList.remove('overlay_active');
    modal.classList.remove('modal_active');
  });

  home.addEventListener('click', () => {

    audio.click.pause();
    audio.click.currentTime = 0;
    audio.click.play();

    init(homePage());
    changeTime(true);
  })
}