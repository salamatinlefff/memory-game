import { addZero } from './changeTime.js';

const isLocalBest = () => {
  return +localStorage.getItem('memory-game-lefff_best-result');
}

let bestResult = isLocalBest() ? isLocalBest() : 0;

const isBest = seconds => {
    if(seconds < bestResult) {
      bestResult = seconds
      return true;
    } else {
      return false;
    }
}

export const localResults = data => {

  const minutes = addZero(data / 60);
  const seconds = addZero(data % 60);
  const resultGame = `${minutes}:${seconds}`

  const localResults = localStorage.getItem('memory-game-lefff_results');
  const newResult = [`${resultGame}`];
  
  if(data >= 5) {
    if(isBest(data)) {
      localStorage.setItem('memory-game-lefff_best-result', bestResult);
    } else if(bestResult === 0) {
      bestResult = data
      localStorage.setItem('memory-game-lefff_best-result', bestResult);
    }
  } else if(data < 5) {
    
  } else {
    bestResult = data
    localStorage.setItem('memory-game-lefff_best-result', data);
  }

  if(localResults) {
    let localResultsResults = JSON.parse(localStorage.getItem('memory-game-lefff_results'))
    let lengthResults = localResultsResults.length;

    if(lengthResults < 10) {
      localResultsResults.push(resultGame);
      localStorage.setItem('memory-game-lefff_results', JSON.stringify(localResultsResults))
    } else if (lengthResults >= 10) {
      localResultsResults.shift();
      localResultsResults.push(resultGame);
      localStorage.setItem('memory-game-lefff_results', JSON.stringify(localResultsResults))
    }
  } else {
    localStorage.setItem('memory-game-lefff_results', JSON.stringify(newResult))
  }
}
