import { gamelogic, gameboard } from './gameboard.js'
import { makePlayer } from './players.js'

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
  boardTile.addEventListener('click', async () => {
    gamelogic.makeHumanTurn(boardTile, robot)
    setTimeout(() => {
      gamelogic.makeRobotTurn(human)
    }, 500)
  })
})
