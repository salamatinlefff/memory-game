import { addZero, returnSeconds } from './changeTime.js';

export const deleteLayout = page => {
  page.forEach( item => {
    item.remove()
  });
};

export const addLayout = (page, container) => {
  page.forEach( item => {
    container.append(item);
  })
}

  const minutes = addZero(localStorage.getItem('memory-game-lefff_best-result') / 60);
  const seconds = addZero(localStorage.getItem('memory-game-lefff_best-result') % 60);


export const addPage = () => {

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
      <span class="best__text">${localStorage.getItem('memory-game-lefff_best-result') ? `${minutes}:${seconds}` : '00:00'}</span>
    </aside>
  `;

  const results = document.createElement('div');
  results.className = 'aside__results aside';
  
  const title = document.createElement('h2');
  title.className = 'results__title';
  title.textContent = 'My Results:';

  const list = document.createElement('ol');
  list.className = 'results__list';

  const items = JSON.parse(localStorage.getItem('memory-game-lefff_results'));
  if(items.length > 0) {
    const times = items.map( item => {
      const resultItem = document.createElement('li');
      resultItem.className = 'results__item';
      resultItem.textContent = item;
      return resultItem
    })
    list.append(...times)
  }
  
  results.append(title, list);

  return [sidebar, results]
}

export const addHomePage = () => {
  const header = document.createElement('header');
  header.className = 'header'

  header.innerHTML = `
  <nav class="header__navigation">
  <ul class="navigation__list">
    <li class="navigation__item">
      <button class="navigation__button home">home</button>
    </li>
  
    <li class="navigation__item">
      <button class="navigation__button">top players</button>
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

  const homePage = `
  <main class="main main__home home ">
        <h2 class="home__title">Hello player.</h2>
        <p class="home__text">I am glad to see you to <span class="home__text-select">memory-game v0.0003210</span></p>
        <p class="home__text"><span class="home__text-select">Rules:</span> It is necessary to find all matching pictures in the minimum time and have fun :)</p>
        <form class="home__form" action="#">
          <label class="home__label"><span class="home__text-select">Please enter your nickname:</span>
            <input class="home__input" type="text" name="nickname" minlength="2" maxlength="16" title="minimum 2 symbols, maximum 16 symbols" placeholder="here" autofocus>
          </label>
          <button class="home__button" type="submit">START</button>
        </form>
      </main>
  `
  return addPage(header, homePage)
}

export const addGamePage = () => {
  const header = document.createElement('header');
  header.className = 'header';

  // const nav = document.createElement('nav');
  // nav.className = 'header__navigation';

  // const navList = document.createElement('ul');
  // navList.className = 'navigation__list';

  // const navItemHome = document.createElement('li');
  // navItemHome.className = 'navigation__item';
  // const navItemHomeButton = document.createElement('button');
  // navItemHomeButton.className = 'navigation__button home';
  // navItemHomeButton.textContent = 'home';
//   <div class="mute">
//   <input class="mute__checkbox" type="checkbox" id="mute">
//   <label for="mute" class="mute__label">mute</label>
// </div>

  const mute = document.createElement('div');
  mute.className = 'mute';

  const checkbox = document.createElement('input');
  checkbox.className = 'mute__checkbox';
  checkbox.type = 'checkbox';
  checkbox.id = 'mute';

  const label = document.createElement('label');
  label.className = 'mute__label';

  mute.append(checkbox, label);



  checkbox.addEventListener('change', () => {
    if(!backgroundIsPlaying) {
      background.play();
      backgroundIsPlaying = true;
    } else {
      background.pause();
      backgroundIsPlaying = false;
    }
  })

  header.innerHTML = `
  <nav class="header__navigation">
  <ul class="navigation__list">
    <li class="navigation__item">
      <button class="navigation__button home">home</button>
    </li>
  
    <li class="navigation__item">
      <button class="navigation__button restart">restart

    </button></li>
    <li class="navigation__item">
      <button class="navigation__button">top players</button>
    </li>

    <li class="navigation__item">
      <button class="navigation__button settings">settings</button>
    </li>
  </ul>
</nav>

  `;

  const gamePage = `
  <main class="main main__game">
  <div class="game-wrapper">
    <ul class="cards">
      
      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-1.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-2.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-3.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-4.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-5.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-6.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-7.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-8.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-1.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-2.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-3.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-4.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-5.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-6.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-7.png">
        </div>
      </li>

      <li class="card">
        <div class="view view_front">
          <img src="./assets/img/que_icon.svg">
        </div>
        <div class="view view_back">
          <img class="back_img" src="./assets/img/img-8.png">
        </div>
      </li>
    </ul>
  </div>
</main>
  `
  header.append(mute)
  return addPage(header, gamePage);
}
