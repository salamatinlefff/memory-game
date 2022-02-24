import { setBestResult } from './index.js';

export const getLocalDataName = () => {
  if(localStorage.getItem('memory-game-lefff')) {
    return JSON.parse(localStorage.getItem('memory-game-lefff')).name;
  }
}
export const getLocalDataBest = () => {
  if(localStorage.getItem('memory-game-lefff')) {
    return JSON.parse(localStorage.getItem('memory-game-lefff')).best;
  }
}
export const getLocalDataHistory = () => {
  if(localStorage.getItem('memory-game-lefff')) {
    return JSON.parse(localStorage.getItem('memory-game-lefff')).history;
  } else {
    return false
  }
}

const setLocalDataName = (localObject, value) => {
  if(localObject) {
    localObject.name = value;
    const newName = JSON.stringify(localObject);

    localStorage.setItem('memory-game-lefff', newName);
  } else {
    const newName = JSON.stringify({name: value});
    localStorage.setItem('memory-game-lefff', newName);
  }
}


const setLocalDataBest = (localObject, value) => {
  if(localObject) {
    localObject.best = value
    const newBest = JSON.stringify(localObject);

    setBestResult(value);
    localStorage.setItem('memory-game-lefff', newBest);
  } else {
    const newBest = JSON.stringify({best: value});

    setBestResult(value);
    localStorage.setItem('memory-game-lefff', newBest);
  }
}

const setLocalDataHistory = (localObject, value) => {
  if(localObject && localObject.history) {
    if(localObject.history.length >= 10) {
      localObject.history.shift(value);
      if(localObject.history.length >= 10) {
        for(; localObject.history.length >= 10;) {
          localObject.history.shift(value);
        }
      }
    }
    localObject.history.push(value);
    const newHistory = JSON.stringify(localObject);
  
    localStorage.setItem('memory-game-lefff', newHistory);
  } else if(localObject) {
    localObject.history = [value];
    const newHistory = JSON.stringify(localObject);
    localStorage.setItem('memory-game-lefff', newHistory);
  } else {
    const newHistory = JSON.stringify({history: [value]});
    localStorage.setItem('memory-game-lefff', newHistory);
  }

}


export const localData = (key, value) => {
  const localDataParse = JSON.parse(localStorage.getItem('memory-game-lefff'));

  switch(key) {
    case 'name':
    setLocalDataName(localDataParse, value);
    break;

    case 'best':
    setLocalDataBest(localDataParse, value);
    break;

    case 'history':
      setLocalDataHistory(localDataParse, value)
    break;

    default:
      throw new Error(`key ${key} is undefined`)
  }
}
