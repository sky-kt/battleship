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
