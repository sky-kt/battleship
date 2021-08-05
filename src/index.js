import { gameboard } from './gameboard.js'
import { makePlayer } from './players.js'
import { findRandomCoordinate } from './robot.js'

// set up gameooards
gameboard.makeGameTiles()
gameboard.makeLetterTiles()
gameboard.makeNumberTiles()

const gameboardCoordinates = {
  carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
  battleship: ['A2', 'B2', 'C2', 'D2'],
  destroyer: ['A3', 'B3', 'C3'],
  submarine: ['A4', 'B4', 'C4'],
  patrolBoat: ['A5', 'B5']
}

for (const ship in Object.values(gameboardCoordinates)) {
  gameboard.drawHumanShips(Object.values(gameboardCoordinates)[ship])
}

const human = makePlayer(gameboardCoordinates)
const robot = makePlayer(gameboardCoordinates)

const boardTiles = document.querySelectorAll('.boardTile')
boardTiles.forEach(boardTile => {
  boardTile.addEventListener('click', () => {
    const boardRow = boardTile.parentElement
    const letter = String.fromCharCode(Array.from(boardRow.children).indexOf(boardTile) + 65)
    const number = Array.from(boardRow.parentElement.children).indexOf(boardRow) + 1
    const attackResult = robot.receiveAttack(letter + number)

    const hitOutcomes = ['carrier hit', 'battleship hit', 'destroyer hit', 'submarine hit', 'patrolBoat hit']
    if (hitOutcomes.includes(attackResult)) {
      gameboard.drawHitTile(letter + number, 'robot')
    } else {
      gameboard.drawMissTile(letter + number, 'robot')
    }

    const randomCoordinate = findRandomCoordinate()
    const attackResult2 = human.receiveAttack(randomCoordinate)
    if (hitOutcomes.includes(attackResult2)) {
      gameboard.drawHitTile(randomCoordinate, 'human')
    } else {
      gameboard.drawMissTile(randomCoordinate, 'human')
    }
  })
})
