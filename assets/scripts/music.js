export const audio = {
  background: new Audio(`./assets/audio/background2.mp3`),
  positiveResponse: new Audio(`./assets/audio/positive1.mp3`),
  negativeResponse: new Audio(`./assets/audio/negative4.mp3`),
  victory: new Audio(`./assets/audio/victory.mp3`),
  click: new Audio('./assets/audio/click2.mp3'),
  changeVolume: new Audio('./assets/audio/change_volume.mp3'),
}

export const music = () => {
  const inputBackground = document.querySelector('.overlay__input_background');
  const inputEffects = document.querySelector('.overlay__input_effects');
  const muteBackground = document.getElementById('mute');

  inputBackground.style.background = `linear-gradient(to right, rgb(255, 76, 246) ${inputBackground.value}%, rgba(255, 255, 255, 1) ${inputBackground.value}%`;

  inputEffects.style.background = `linear-gradient(to right, rgb(255, 76, 246) ${inputEffects.value}%, rgba(255, 255, 255, 1) ${inputEffects.value}%`;

  let backgroundIsPlaying = false;
  
  inputBackground.addEventListener('input', () => {
    audio.background.play();

    inputBackground.style.background = `linear-gradient(to right, rgb(255, 76, 246) ${inputBackground.value}%, rgba(255, 255, 255, 1) ${inputBackground.value}%`;

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
    audio.changeVolume.play();

    inputEffects.style.background = `linear-gradient(to right, rgb(255, 76, 246) ${inputEffects.value}%, rgba(255, 255, 255, 1) ${inputEffects.value}%`;

    audio.changeVolume.volume = inputEffects.value / 100;
    audio.victory.volume = inputEffects.value / 100;
    audio.positiveResponse.volume = inputEffects.value / 100;
    audio.negativeResponse.volume = inputEffects.value / 100;
  })

  muteBackground.addEventListener('change', () => {
    audio.changeVolume.pause();
    audio.changeVolume.currentTime = 0;
    audio.changeVolume.play();
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