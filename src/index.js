const playerBoard = document.getElementById('playerBoard')
const computerBoard = document.getElementById('computerBoard')

for (let idx = 0; idx < 121; idx++) {
  const tile = document.createElement('div')
  if (idx === 0) {
    tile.style.backgroundColor = '#dfdfdf'
    // pass
  } else if (idx >= 0 && idx <= 10) {
    const letter = String.fromCharCode(idx + 64)
    tile.appendChild(document.createTextNode(letter))
    tile.classList.add('letterTile')
  } else if (idx % 11 === 0) {
    tile.appendChild(document.createTextNode(idx / 11))
    tile.classList.add('numberTile')
  } else {
    tile.classList.add('boardTile')
  }
  computerBoard.appendChild(tile)
  playerBoard.appendChild(tile.cloneNode(true))
}
