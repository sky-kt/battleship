import { findRandomCoordinate } from './robot.js'
import { infoText } from './infoText.js'

const humanBoard = document.getElementById('humanBoard')
const robotBoard = document.getElementById('robotBoard')
const numberRows = document.querySelectorAll('.numberRow')
const letterRows = document.querySelectorAll('.letterRow')

const gamelogic = (() => {
  let canClick = true

  function makeHumanTurn (boardTile, robot) {
    const boardRow = boardTile.parentElement
    const letter = String.fromCharCode(Array.from(boardRow.children).indexOf(boardTile) + 65)
    const number = Array.from(boardRow.parentElement.children).indexOf(boardRow) + 1
    const attackResult = robot.receiveAttack(letter + number)

    if (!attackResult.split(' ').includes('miss')) {
      gameboard.drawHitTile(letter + number, 'robot')
      if (attackResult.split(' ').includes('sunk')) {
        gameboard.drawSunkenShip(robot[attackResult.split(' ')[0]].coordinates, 'robot')
      }
    } else {
      gameboard.drawMissTile(letter + number, 'robot')
    }
    infoText.update(attackResult)
    canClick = false
  }

  function makeRobotTurn (human) {
    const randomCoordinate = findRandomCoordinate()
    const attackResult = human.receiveAttack(randomCoordinate)

    if (attackResult.split(' ').includes('hit') || attackResult.split(' ').includes('sunk')) {
      gameboard.drawHitTile(randomCoordinate, 'human')
    } else {
      gameboard.drawMissTile(randomCoordinate, 'human')
    }
    infoText.update(attackResult)
    setTimeout(() => { canClick = true }, 0)
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

  return {
    makeLetterTiles,
    makeNumberTiles,
    makeGameTiles,
    drawHumanShips,
    drawSunkenShip,
    drawHitTile,
    drawMissTile
  }
})()

export { gamelogic, gameboard }
