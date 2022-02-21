
export const addZero = (int) => {
  if(int < 10) return `0${parseInt(int)}`
  return `${int}`
};

let interval;
let seconds = 0;
let minutes = 0;

export const returnSeconds = () => {
  return seconds
}

const stopTimer = (interval, timeText) => {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timeText.textContent = '00:00'
}

const timer = (timeText) => {
  seconds += 1;
  minutes = seconds / 60;
  timeText.textContent = `${addZero(minutes)}:${addZero(seconds % 60)}`;
}

export const changeTime = (endGame) => {
  const timeText = document.querySelector('.time__text');

  if(!endGame) {
    interval = setInterval( timer, 1000, timeText);
  } else if(endGame) {
    stopTimer(interval, timeText);
  }
}

