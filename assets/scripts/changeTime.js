
export const addZero = (int) => {
  if(int < 10) return `0${parseInt(int)}`
  return `${int}`
};

let interval;
let seconds = 0;
let minutes = 0;
let isPause = false;

export const returnSeconds = () => {
  return seconds
}

const stopTimer = (interval, timeText) => {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timeText.textContent = '00:00'
}

const viewTime = (timeText) => {
  minutes = seconds / 60;
  timeText.textContent = `${addZero(minutes)}:${addZero(seconds % 60)}`;
}

const timer = (timeText, isPause) => {
  if(isPause) {
    seconds += 0;
    viewTime(timeText);
    return
  } else {
    seconds += 1;
    viewTime(timeText);
  }
}

export const changeTime = (endGame, isPause = false) => {
  const timeText = document.querySelector('.time__text');

  if(!endGame) {
    clearInterval(interval);
    interval = setInterval( timer, 1000, timeText, isPause);
  } else if(endGame) {
    stopTimer(interval, timeText);
  }
}

