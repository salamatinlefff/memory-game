const changeTextAndLocalAndReset = (changeNameInput, timeName) => {
  timeName.textContent = changeNameInput.value;
  localStorage.setItem('memory-game-lefff_name', changeNameInput.value)
  changeNameInput.value = '';
}

export const changeName = () => {
  const changeNameInput = document.querySelector('.modal__input_change-name');
  const changeNameButton = document.querySelector('.modal__button_change-name');
  const timeName = document.querySelector('.time__name');

  changeNameInput.addEventListener('keydown', event => {
    if(event.key === 'Enter') {
      changeTextAndLocalAndReset(changeNameInput, timeName);
    }
  })

  changeNameButton.addEventListener('click', () => {
    changeTextAndLocalAndReset(changeNameInput, timeName);
  })
}