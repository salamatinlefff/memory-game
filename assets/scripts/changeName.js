import { audioClick } from './headerEvents.js';

const changeTextAndLocalAndReset = (changeNameInput) => {
  const timeName = document.querySelector('.time__name');
  const homeTitle = document.querySelector('.home__title');
  const newName = changeNameInput.value

  timeName.textContent = newName;
  localStorage.setItem('memory-game-lefff_name', newName)
  homeTitle.innerHTML = `Hello, ${newName}!`
  changeNameInput.value = '';
}

const animationIncorrect = (changeNameInput) => {
  changeNameInput.classList.remove('modal__input_change-name_empty');
  changeNameInput.classList.add('modal__input_change-name_empty');

  setTimeout(() => {
    changeNameInput.classList.remove('modal__input_change-name_empty');
  }, 500)
}

const changeTextHomeForm = () => {
  const homeTextSelect = document.querySelectorAll('.home__text-select');
  const homeInput = document.querySelector('.home__input');
  
  if(homeTextSelect && homeInput) {
    homeTextSelect[2].textContent = 'click start';
    homeInput.remove();
  }
}

export const changeName = () => {
  const changeNameInput = document.querySelector('.modal__input_change-name');
  const changeNameButton = document.querySelector('.modal__button_change-name');

  changeNameInput.addEventListener('keydown', event => {
    if(event.key === 'Enter') {
      audioClick();
      if(changeNameInput.value !== '') {
        changeTextAndLocalAndReset(changeNameInput);
        changeTextHomeForm();
      } else {
        animationIncorrect(changeNameInput);
      }
    }
  })

  changeNameButton.addEventListener('click', () => {
    audioClick();
    if(changeNameInput.value !== '') {
      changeTextAndLocalAndReset(changeNameInput);
      changeTextHomeForm();
    } else {
      animationIncorrect(changeNameInput);
    }
  })
}