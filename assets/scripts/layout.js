import { addZero } from './changeTime.js';
import { audioClick } from './headerEvents.js';
import { init, reset } from './index.js';
import { localName } from './localName.js';

export const deleteLayout = () => {
  const sidebar = document.querySelector('.sidebar');
  const homePage = document.querySelector('.main__home');
  const gamePage = document.querySelector('.main__game');
  const asideResults = document.querySelector('.aside__results');

  [sidebar, homePage, gamePage, asideResults].forEach( element => {
    if(element) {
      if(element.classList.contains('main_active')) {
        element.classList.remove('main_active');
        element.remove();
      } else {
        element.remove();
      }
    } else {
      return
    }
  });
};

export const addLayout = (data) => {
  const container = document.querySelector('.container');

  data.forEach( (element) => {
    container.append(element)
    if(element.classList.contains('main')) {
      setTimeout( () => {
        element.classList.add('main_active')
      }, 200)
      return
    }
  });
}

  const minutes = () => {
    return addZero(localStorage.getItem('memory-game-lefff_best-result') / 60)
  };
  const seconds = () => {
    return addZero(localStorage.getItem('memory-game-lefff_best-result') % 60)
  };

export const homePage = () => {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `        
    <aside class="aside__best aside">
      <h3 class="best__title">Best result:</h3>
      <span class="best__text">${localStorage.getItem('memory-game-lefff_best-result') ? `${minutes()}:${seconds()}` : '00:00'}</span>
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
  ${localStorage.getItem('memory-game-lefff_name') ? localStorage.getItem('memory-game-lefff_name') : 'Username'}
  `;

  const timeText = document.createElement('span');
  timeText.className = 'time__text';
  timeText.textContent = '00:00';


  const localNickname = localStorage.getItem('memory-game-lefff_name');
  const homePage = document.createElement('main');
  homePage.className = 'main main__home home';
  homePage.innerHTML = `
  <h2 class="home__title">Hello, ${localNickname ? localNickname : 'Player'}!</h2>
        <p class="home__text">Welcome to <span class="home__text-select">the memory-game v1.020</span></p>
        <p class="home__text"><span class="home__text-select">Rules:</span> Find all matching pictures with the minimum of time and have fun 🙃</p>
  `;

  const homeForm = document.createElement('form');
  homeForm.className = 'home__form';
  homeForm.innerHTML = `
  <label class="home__label">
  ${localStorage.getItem('memory-game-lefff_name') ? '<span class="home__text-select">click start</span></label>' : '<span class="home__text-select">Please enter your nickname:</span><input class="home__input" type="text" placeholder="here" autofocus></label>'
}`;

  const startButton = document.createElement('button');
  startButton.className = 'home__button';
  startButton.type = 'submit';
  startButton.textContent = 'START';

  homeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const homeTitle = document.querySelector('.home__title');
  
      timeName.textContent = homeForm[0].value === '' ? 'Username' : localName(homeForm[0].value);
      if(homeForm[0].value !== '' && typeof homeForm[0].value === 'string') {
        homeTitle.innerHTML = `Hello, ${localStorage.getItem('memory-game-lefff_name')}!`;
      } else {
        homeTitle.textContent = 'Hello, Player!'
      }
    });

  startButton.addEventListener('click', () => {
    reset();

    if(homeForm[0].value !== '' || localStorage.getItem('memory-game-lefff_name')) {
      audioClick();
      setTimeout( () => {
        init(gamePage());
      }, 300)
    } else {
      timeName.textContent = 'Username';
      homeForm[0].focus()
      if(homeForm[0].classList.contains('input_incorrect')) {
        homeForm[0].classList.remove('input_incorrect');
      }
      setTimeout( () => {
        homeForm[0].classList.add('input_incorrect');
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

  const items = JSON.parse(localStorage.getItem('memory-game-lefff_results'));
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

  const restart = document.querySelector('.restart');
  restart.classList.remove('restart_active');

  asideTime.prepend(timeName);
  asideTime.append(timeText);
  sidebar.prepend(asideTime);
  homeForm.append(startButton);
  homePage.append(homeForm);
  results.append(title, list);

  return [sidebar, homePage, results];
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
      <span class="time__name">${localStorage.getItem('memory-game-lefff_name') ? localStorage.getItem('memory-game-lefff_name') : 'Username'}</span>
      <h3 class="time__title">Timer:</h3>
      <span class="time__text">00:00</span>
    </aside>

    <aside class="aside__best aside">
      <h3 class="best__title">Best result:</h3>
      <span class="best__text">${localStorage.getItem('memory-game-lefff_best-result') ? `${minutes()}:${seconds()}` : '00:00'}</span>
    </aside>
  `;

  const results = document.createElement('div');
  results.className = 'aside__results aside';
  
  const title = document.createElement('h2');
  title.className = 'results__title';
  title.textContent = 'My history:';

  const list = document.createElement('ol');
  list.className = 'results__list';

  const items = JSON.parse(localStorage.getItem('memory-game-lefff_results'));
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

  const restart = document.querySelector('.restart');
  restart.classList.add('restart_active');
  cardsList.append(...cards)
  gameWrapper.append(cardsList)
  gamePage.append(gameWrapper)
  results.append(title, list);

  return [sidebar, gamePage, results];
}
