import { gameboard } from './gameboard.js'
const infoTextDOM = document.getElementById('infoText')

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
        if (robot.gameOver()) {
          alert('GAME OVER')
        }
      }
    } else {
      gameboard.drawMissTile(letter + number, 'robot')
    }
    infoTextDOM.textContent = attackResult

    canClick = false
  }

  function makeRobotTurn (human) {
    const randomCoordinate = human.findRandomCoordinate()
    const attackResult = human.receiveAttack(randomCoordinate)

    if (!attackResult.split(' ').includes('miss')) {
      gameboard.drawHitTile(randomCoordinate, 'human')
      if (attackResult.split(' ').includes('sunk')) {
        gameboard.drawSunkenShip(human[attackResult.split(' ')[0]].coordinates, 'human')
        if (human.gameOver()) {
          alert('GAME OVER')
        }
      }
    } else {
      gameboard.drawMissTile(randomCoordinate, 'human')
    }
    infoTextDOM.textContent = attackResult
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

export { gamelogic }
