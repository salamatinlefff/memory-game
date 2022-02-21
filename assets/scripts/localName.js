export const localName = name => {
  const localName = localStorage.getItem('memory-game-lefff_name');
  if(localName) {
    if(localName === name) {
      return name
    } else {
      localStorage.setItem('memory-game-lefff_name', name)
      return name
    }
  } else {
    localStorage.setItem('memory-game-lefff_name', name)
    return name
  }
}