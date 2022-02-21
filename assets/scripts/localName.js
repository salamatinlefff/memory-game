export const localName = name => {
  const localName = localStorage.getItem('memory-game-lefff_name');

  if(localName && name !== '') {
    if(localName === name) {
      return name
    } else {
      localStorage.setItem('memory-game-lefff_name', name)
      return name
    }
  } else if(name === '' && !localName) {
    name = 'Username';
    return name;
  } else if(name === '' && localName) {
    return localName
  } else {
    localStorage.setItem('memory-game-lefff_name', name)
    return name
  }
}