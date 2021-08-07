import { gameboard } from './gameboard.js'
import { gamelogic } from './gamelogic'
import { makePlayer } from './players.js'
import { setup } from './setup.js'

// set up gameooards
gameboard.makeGameTiles()
gameboard.makeLetterTiles()
gameboard.makeNumberTiles();

(async () => {
  const gameboardCoordinates = await setup.createPlayerShips()
  document.getElementById('infoText').textContent = 'PLAY!'
  document.getElementById('robotContainer').style.display = ''
  const human = makePlayer(gameboardCoordinates)
  const robot = makePlayer(gameboardCoordinates)

  const boardTiles = document.querySelectorAll('.boardTile')
  boardTiles.forEach(boardTile => {
    boardTile.addEventListener('click', () => {
      gamelogic.makeHumanTurn(boardTile, robot)
      setTimeout(() => {
        gamelogic.makeRobotTurn(human)
      }, 500)
    })
  })
})()
