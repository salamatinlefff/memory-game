const changeTextAndLocalAndReset = (changeNameInput, timeName) => {
  timeName.textContent = changeNameInput.value;
  localStorage.setItem('memory-game-lefff_name', changeNameInput.value)
  changeNameInput.value = '';
}

const animationIncorrect = (changeNameInput) => {
  changeNameInput.classList.remove('modal__input_change-name_empty');
  changeNameInput.classList.add('modal__input_change-name_empty');

  setTimeout(() => {
    changeNameInput.classList.remove('modal__input_change-name_empty');
  }, 500)
}

export const changeName = () => {
  const changeNameInput = document.querySelector('.modal__input_change-name');
  const changeNameButton = document.querySelector('.modal__button_change-name');
  const timeName = document.querySelector('.time__name');

  changeNameInput.addEventListener('keydown', event => {
    if(event.key === 'Enter') {
      if(changeNameInput.value !== '') {
        changeTextAndLocalAndReset(changeNameInput, timeName);
      } else {
        animationIncorrect(changeNameInput);
      }
    }
  })

  changeNameButton.addEventListener('click', () => {
    if(changeNameInput.value !== '') {
      changeTextAndLocalAndReset(changeNameInput, timeName);
    } else {
      animationIncorrect(changeNameInput);
    }
  })
}