import { addZero } from './changeTime.js';
import { audioClick } from './headerEvents.js';
import { cards, reset } from './index.js';
import { getLocalDataBest, getLocalDataHistory, getLocalDataName, localData } from './localData.js';

export const deleteContainer = () => {
  const container = document.querySelector('.container');
  if(container) {
    container.remove()
  }
};

export const addLayoutHeaderAndOverlay = () => {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
  <nav class="header__navigation">
      <ul class="navigation__list">
              
        <li class="navigation__item">
          <button class="navigation__button restart">restart

        </button>
      </li>
      
        <li class="navigation__item">
          <button class="navigation__button home">home</button>
        </li>

        <li class="navigation__item">
          <button class="navigation__button settings">settings</button>
        </li>
      </ul>
    </nav>

    <div class="mute">
      <input class="mute__checkbox" type="checkbox" id="mute">
      <label for="mute" class="mute__label">mute</label>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `
  <div class="overlay__modal modal">
  <h2 class="modal__title">Settings</h2>
  
  <label class="modal__label">Music: 
    <input class="modal__input modal__input_background" type="range" value="50">
  </label>

  <label class="modal__label">Effects: 
    <input class="modal__input modal__input_effects" type="range" value="50">
  </label>

  <label class="modal__label"><p class="modal__label_text">Correct/ Incorrect match:</p> 
    <input class="modal__input modal__input_correct-incorrect" type="range" value="10">
  </label>

  <label class="modal__label modal__label_change-name">Change name: 
    <input class="modal__input modal__input_change-name" type="text" placeholder="new name">
  </label>
  <button class="modal__button_change-name">change name</button>

  <button class="modal__close">
    <svg class="close__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#ffffff"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
  </button>
</div>

<div class="overlay__result result">
  <h2 class="result__title">Your result:</h2>
  <p class="result__text">00:00</p>
  <button class="result__button">OK</button>
</div>
  `

  document.body.append(header, overlay);
}

export const addLayout = (data) => {
  deleteContainer();

  const container = document.createElement('div');
  container.className = 'container'

  data.forEach( (element) => {
    container.append(element)
    if(element.classList.contains('main')) {
      setTimeout( () => {
        element.classList.add('main_active')
      }, 200)
      return
    }
  });
  document.body.append(container);

  cards();
}

  const minutes = () => {
    return addZero(getLocalDataBest() / 60)
  };
  const seconds = () => {
    return addZero(getLocalDataBest() % 60)
  };

export const homePage = () => {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `        
    <aside class="aside__best aside">
      <h3 class="best__title">Best result:</h3>
      <span class="best__text">${getLocalDataBest() ? `${minutes()}:${seconds()}` : '00:00'}</span>
    </aside>
  `;

  const asideTime = document.createElement('aside');
  asideTime.className = 'aside__time time aside';
  asideTime.innerHTML = `
  <h3 class="time__title">Timer:</h3>
  `

  const timeName = document.createElement('span');
  timeName.className = 'time__name';
  timeName.innerHTML = `
  ${getLocalDataName() ? getLocalDataName() : 'Player'}
  `;

  const timeText = document.createElement('span');
  timeText.className = 'time__text';
  timeText.textContent = '00:00';


  const homePage = document.createElement('main');
  homePage.className = 'main main__home home';
  homePage.innerHTML = `
  <h2 class="home__title">Hello, ${getLocalDataName() ? getLocalDataName() : 'Player'}!</h2>
        <p class="home__text">Welcome to <span class="home__text-select">the memory-game v1.0112</span></p>
        <p class="home__text"><span class="home__text-select">Rules:</span> Find all matching pictures with the minimum of time and have fun 🙃</p>
  `;

  const homeForm = document.createElement('form');
  homeForm.className = 'home__form';
  homeForm.innerHTML = `
  <label class="home__label">
  ${getLocalDataName() ? '<span class="home__text-select">click start</span></label>' : '<span class="home__text-select">Please enter your nickname:</span><input class="home__input" type="text" placeholder="here" autofocus></label>'
}`;

  const startButton = document.createElement('button');
  startButton.className = 'home__button';
  startButton.type = 'submit';
  startButton.textContent = 'START';

  homeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const inputValue = homeForm[0].value;
    const homeTitle = document.querySelector('.home__title');
    
      if(inputValue !== '' && typeof inputValue === 'string') {
        localData('name', inputValue)
        homeTitle.innerHTML = `Hello, ${getLocalDataName()}!`;
        timeName.textContent = getLocalDataName();
      }
    });

  startButton.addEventListener('click', () => {
    reset();

    const input = homeForm[0];

    if(input.value !== '' || getLocalDataName()) {
      audioClick();
      setTimeout( () => {
        addLayout(gamePage());
      }, 300)
    } else {
      input.focus()
      if(input.classList.contains('input_incorrect')) {
        input.classList.remove('input_incorrect');
      }
      setTimeout( () => {
        input.classList.add('input_incorrect');
      }, 10)
      audioClick();
      return
    }
  })

  const results = document.createElement('div');
  results.className = 'aside__results aside';
  
  const title = document.createElement('h2');
  title.className = 'results__title';
  title.textContent = 'My history:';

  const list = document.createElement('ol');
  list.className = 'results__list';

  const items = getLocalDataHistory();
  if(items) {
    const times = items.map( item => {
      const resultItem = document.createElement('li');
      resultItem.className = 'results__item';
      resultItem.textContent = item;
      return resultItem
    }).reverse()
    list.append(...times)
  } else {
    list.innerHTML = '';
  }

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <a href="https://github.com/salamatinlefff" class="github" target="blank">@salamatinlefff</a>
    <span class="year">2022</span>
    <a href="https://rs.school/js-stage0/" class="rs_link" target="blank"></a>
  `

  const restart = document.querySelector('.restart');
  restart.classList.remove('restart_active');

  asideTime.prepend(timeName);
  asideTime.append(timeText);
  sidebar.prepend(asideTime);
  homeForm.append(startButton);
  homePage.append(homeForm);
  results.append(title, list);

  return [sidebar, homePage, results, footer];
}

export const gamePage = () => {
  const gamePage = document.createElement('main');
  gamePage.className = 'main main__game';

  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'game-wrapper';

  const cardsList = document.createElement('ul');
  cardsList.className = 'cards';

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort( () => Math.random() > 0.5 ? 1 : -1);
  const cards = [];
  for(let i = 0; i < 16; i += 1) {
    const card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <div class="view view_front">
    <img src="./assets/img/que_icon.svg">
    </div>
    <div class="view view_back">
    <img class="back_img" src="./assets/img/img-${arr[i]}.png">
    </div>
    `
    cards.push(card)
  }
  
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `        
    <aside class="aside__time time aside">
      <span class="time__name">${getLocalDataName() ? getLocalDataName() : 'Player'}</span>
      <h3 class="time__title">Timer:</h3>
      <span class="time__text">00:00</span>
    </aside>

    <aside class="aside__best aside">
      <h3 class="best__title">Best result:</h3>
      <span class="best__text">${getLocalDataBest() ? `${minutes()}:${seconds()}` : '00:00'}</span>
    </aside>
  `;

  const results = document.createElement('div');
  results.className = 'aside__results aside';
  
  const title = document.createElement('h2');
  title.className = 'results__title';
  title.textContent = 'My history:';

  const list = document.createElement('ol');
  list.className = 'results__list';

  const items = getLocalDataHistory();
  if(items) {
    const times = items.map( item => {
      const resultItem = document.createElement('li');
      resultItem.className = 'results__item';
      resultItem.textContent = item;
      return resultItem
    }).reverse()
    list.append(...times)
  } else {
    list.innerHTML = ``
  };

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <a href="https://github.com/salamatinlefff" class="github" target="blank">@salamatinlefff</a>
    <span class="year">2022</span>
    <a href="https://rs.school/js-stage0/" class="rs_link" target="blank"></a>
  `

  const restart = document.querySelector('.restart');
  restart.classList.add('restart_active');
  cardsList.append(...cards)
  gameWrapper.append(cardsList)
  gamePage.append(gameWrapper)
  results.append(title, list);

  return [sidebar, gamePage, results, footer];
}
