const humanBoard = document.getElementById('humanBoard')
const robotBoard = document.getElementById('robotBoard')
const numberRows = document.querySelectorAll('.numberRow')
const letterRows = document.querySelectorAll('.letterRow');

// set up gameooards
(() => {
  for (let idx = 0; idx < 10; idx++) {
    const boardRow = document.createElement('div')
    boardRow.classList.add('boardRow')
    for (let idx = 0; idx < 10; idx++) {
      const tile = document.createElement('div')
      tile.classList.add('boardTile')
      boardRow.appendChild(tile)
    }
    humanBoard.appendChild(boardRow)
    robotBoard.appendChild(boardRow.cloneNode(true))
  }
})();

// add tile event listeners
(() => {
  const boardTiles = document.querySelectorAll('.boardTile')
  boardTiles.forEach(boardTile => {
    boardTile.addEventListener('click', () => {
      const boardRow = boardTile.parentElement
      const letter = String.fromCharCode(Array.from(boardRow.children).indexOf(boardTile) + 65)
      const number = Array.from(boardRow.parentElement.children).indexOf(boardRow) + 1
      const coordinate = letter + number
      alert(coordinate)
    })
  })
})();

// add number description tiles
(() => {
  for (let idx = 0; idx < 10; idx++) {
    numberRows.forEach(numberRow => {
      const numberTile = document.createElement('div')
      numberTile.classList.add('numberTile')
      numberTile.appendChild(document.createTextNode(idx + 1))
      numberRow.appendChild(numberTile)
    })
  }
})();

// add letter description tiles
(() => {
  for (let idx = 0; idx < 10; idx++) {
    letterRows.forEach(letterRow => {
      const letterTile = document.createElement('div')
      letterTile.classList.add('letterTile')
      const letter = String.fromCharCode(idx + 65)
      letterTile.appendChild(document.createTextNode(letter))
      letterRow.appendChild(letterTile)
    })
  }
})()
