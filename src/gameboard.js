let humanBoard = document.getElementById('humanBoard')
let robotBoard = document.getElementById('robotBoard')

const numberRows = document.querySelectorAll('.numberRow')
const letterRows = document.querySelectorAll('.letterRow')

const gameboard = (() => {
  function makeNumberTiles () {
    for (let idx = 0; idx < 10; idx++) {
      numberRows.forEach(numberRow => {
        const numberTile = document.createElement('div')
        numberTile.classList.add('numberTile')
        numberTile.appendChild(document.createTextNode(idx + 1))
        numberRow.appendChild(numberTile)
      })
    }
  }

  function makeLetterTiles () {
    for (let idx = 0; idx < 10; idx++) {
      letterRows.forEach(letterRow => {
        const letterTile = document.createElement('div')
        letterTile.classList.add('letterTile')
        const letter = String.fromCharCode(idx + 65)
        letterTile.appendChild(document.createTextNode(letter))
        letterRow.appendChild(letterTile)
      })
    }
  }

  function makeGameTiles (target) {
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
  }

  function drawSunkenShip (coords, target) {
    for (const coord in coords) {
      const coordinate = coords[coord]; let row
      if (target === 'robot') {
        row = Array.from(robotBoard.children)[parseInt(coordinate.slice(1) - 1)]
      } else {
        row = Array.from(humanBoard.children)[parseInt(coordinate.slice(1) - 1)]
      }
      const numEquivalent = coordinate.charCodeAt(0) - 65
      const sunkTile = Array.from(row.children)[numEquivalent]
      sunkTile.classList.add('sunkTile')
    }
  }

  function drawHitTile (coordinate, target) {
    let row
    if (target === 'robot') {
      row = Array.from(robotBoard.children)[parseInt(coordinate.slice(1) - 1)]
    } else {
      row = Array.from(humanBoard.children)[parseInt(coordinate.slice(1) - 1)]
    }
    const numEquivalent = coordinate.charCodeAt(0) - 65
    const hitTile = Array.from(row.children)[numEquivalent]
    hitTile.classList.add('hitTile')
    hitTile.textContent = '✖'
  }

  function drawMissTile (coordinate, target) {
    let row
    if (target === 'robot') {
      row = Array.from(robotBoard.children)[parseInt(coordinate.slice(1) - 1)]
    } else {
      row = Array.from(humanBoard.children)[parseInt(coordinate.slice(1) - 1)]
    }
    const numEquivalent = coordinate.charCodeAt(0) - 65
    const missTile = Array.from(row.children)[numEquivalent]
    missTile.classList.add('missTile')
    missTile.textContent = '⬤'
  }

  function initBoards () {
    humanBoard = document.getElementById('humanBoard')
    robotBoard = document.getElementById('robotBoard')
  }

  return {
    makeLetterTiles,
    makeNumberTiles,
    makeGameTiles,
    drawSunkenShip,
    drawHitTile,
    drawMissTile,
    initBoards
  }
})()

export { gameboard }
