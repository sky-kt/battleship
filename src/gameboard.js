import { robot } from './robot.js'

const humanBoard = document.getElementById('humanBoard')
const robotBoard = document.getElementById('robotBoard')
const numberRows = document.querySelectorAll('.numberRow')
const letterRows = document.querySelectorAll('.letterRow')

const gamelogic = (() => {
  let canClick = true
  function makeHumanTurn () {
    canClick = true
  }

  function makeRobotTurn () {
    canClick = false
    robot.findRandomCoordinate()
    setTimeout(0, makeHumanTurn())
  }

  document.addEventListener('click', e => {
    if (!canClick) {
      e.stopPropagation()
      e.preventDefault()
    }
  }, true)

  return { makeHumanTurn, makeRobotTurn }
})()

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

  function makeGameTiles () {
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

  function drawHumanShips (coordArray) {
    for (const coordIdx in coordArray) {
      const row = Array.from(humanBoard.children)[parseInt(coordArray[coordIdx].slice(1) - 1)]
      const numEquivalent = coordArray[coordIdx].charCodeAt(0) - 65
      Array.from(row.children)[numEquivalent].classList.add('shipTile')
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

  return {
    makeLetterTiles,
    makeNumberTiles,
    makeGameTiles,
    drawHumanShips,
    drawHitTile,
    drawMissTile
  }
})()

export { gamelogic, gameboard }
