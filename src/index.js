const playerBoard = document.getElementById('playerBoard')
const computerBoard = document.getElementById('computerBoard');

// set up boards
(() => {
  for (let idx = 0; idx < 121; idx++) {
    const tile = document.createElement('div')
    if (idx === 0) {
      tile.style.backgroundColor = '#dfdfdf'
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

    const displayTile = (tile) => {
      console.log(tile)
    }

    const clonedTile = tile.cloneNode(true)
    tile.addEventListener('click', () => displayTile(tile))
    clonedTile.addEventListener('click', () => displayTile(clonedTile))

    playerBoard.appendChild(tile)
    computerBoard.appendChild(clonedTile)
  }
})()
