export const audio = {
  background: new Audio(`./assets/audio/background1.mp3`),
  positiveResponse: new Audio(`./assets/audio/positive1_1.mp3`),
  negativeResponse: new Audio(`./assets/audio/negative4.mp3`),
  victory: new Audio(`./assets/audio/victory.mp3`),
  click: new Audio('./assets/audio/click2-min_1.mp3'),
}

const startVolumeAudio = (inputBackground, inputEffects, inputCorrect, inputIncorrect) => {
  audio.background.volume = inputBackground.value / 100;
  audio.click.volume = inputEffects.value / 100;
  audio.victory.volume = inputEffects.value / 100;
  audio.positiveResponse.volume = inputCorrect.value / 100;
  audio.negativeResponse.volume = inputIncorrect.value / 100;
}

const startInputColors = (inputBackground, inputEffects, inputCorrect, inputIncorrect) => {
  inputBackground.style.background = `linear-gradient(to right, #e78300 ${inputBackground.value}%, #ffffff ${inputBackground.value}%`;

  inputEffects.style.background = `linear-gradient(to right, #e78300 ${inputEffects.value}%, #ffffff ${inputEffects.value}%`;

  inputIncorrect.style.background = `linear-gradient(to right, #e78300 ${inputIncorrect.value}%, #ffffff ${inputIncorrect.value}%`;

  inputCorrect.style.background = `linear-gradient(to right, #e78300 ${inputCorrect.value}%, #ffffff ${inputCorrect.value}%`;
}

export const music = () => {
  const inputBackground = document.querySelector('.modal__input_background');
  const inputEffects = document.querySelector('.modal__input_effects');
  const inputCorrect = document.querySelector('.modal__input_correct');
  const inputIncorrect = document.querySelector('.modal__input_incorrect');
  const muteBackground = document.getElementById('mute');

  startVolumeAudio(inputBackground, inputEffects, inputCorrect, inputIncorrect);
  startInputColors(inputBackground, inputEffects, inputCorrect, inputIncorrect)

  let backgroundIsPlaying = false;
  
  inputBackground.addEventListener('input', () => {
    audio.background.play();

    inputBackground.style.background = `linear-gradient(to right, #e78300 ${inputBackground.value}%, #ffffff ${inputBackground.value}%`;

    audio.background.volume = inputBackground.value / 100
    backgroundIsPlaying = true;
    muteBackground.checked = true;
  
    if(inputBackground.value <= 0) {
      muteBackground.checked = false;
    }
  });

  audio.background.addEventListener('ended', () => {
    audio.background.pause();
    audio.background.currentTime = 0;
    audio.background.play();
    audio.backgroundIsPlaying = true
  })
  
  inputEffects.addEventListener('input', () => {
    audio.click.play();

    inputEffects.style.background = `linear-gradient(to right, #e78300 ${inputEffects.value}%, #ffffff ${inputEffects.value}%`;
    
    audio.click.volume = inputEffects.value / 100;
    audio.victory.volume = inputEffects.value / 100;
    audio.positiveResponse.volume = inputEffects.value / 100;
  })

  inputCorrect.addEventListener('input', () => {
    audio.positiveResponse.play();

    inputCorrect.style.background = `linear-gradient(to right, #e78300 ${inputCorrect.value}%, #ffffff ${inputCorrect.value}%`;
    
    audio.positiveResponse.volume = inputCorrect.value / 100;
  })

  inputIncorrect.addEventListener('input', () => {
    audio.negativeResponse.play();

    inputIncorrect.style.background = `linear-gradient(to right, #e78300 ${inputIncorrect.value}%, #ffffff ${inputIncorrect.value}%`;
    
    audio.negativeResponse.volume = inputIncorrect.value / 100;
  })

  muteBackground.addEventListener('change', () => {
    audio.click.pause();
    audio.click.currentTime = 0;
    audio.click.play();
    if(!backgroundIsPlaying  && inputBackground.value === '50' && muteBackground.checked) {
      audio.background.play();
      audio.background.volume = inputBackground.value / 100;
      backgroundIsPlaying = true;
    } else if(!backgroundIsPlaying) {
      audio.background.play();
      audio.background.volume = 0.5;
      inputBackground.value = 50;
      backgroundIsPlaying = true;
    } else {
      audio.background.pause();
      audio.background.volume = 0;
      backgroundIsPlaying = false;
    }
  })
}