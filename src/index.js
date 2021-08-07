import { gameboard } from './gameboard.js'
import { gamelogic } from './gamelogic'
import { makePlayer } from './players.js'
import { setup } from './setup.js'

// set up gameooards
gameboard.makeGameTiles()
gameboard.makeLetterTiles()
gameboard.makeNumberTiles();

(async () => {
  setup.createPlayerShips()
    .then(gameboardCoordinates => {
      console.log(gameboardCoordinates)
      alert('resolved (in index.js)!')

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
    })
})()
