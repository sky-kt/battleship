const humanBoard = document.getElementById('humanBoard')

// const gameboardCoordinates = {
//   carrier: ['A1', 'B1', 'C1', 'D1', 'E1'],
//   battleship: ['A2', 'B2', 'C2', 'D2'],
//   destroyer: ['A3', 'B3', 'C3'],
//   submarine: ['A4', 'B4', 'C4'],
//   patrolBoat: ['A5', 'B5']
// }

const setup = (() => {
  function createPlayerShips () {
    const boardTiles = document.querySelectorAll('.boardTile')
    const shipCoords = {
      carrier: [5],
      battleship: [4],
      destroyer: [3],
      submarine: [3],
      patrolBoat: [2]
    }

    boardTiles.forEach(boardTile => {
      const boardRow = boardTile.parentElement
      const number = Array.from(boardTile.parentElement.children).indexOf(boardTile)
      let amtOfCoords

      for (const ship in Object.values(shipCoords)) {
        if (Object.values(shipCoords)[ship].length === 1) {
          amtOfCoords = Object.values(shipCoords)[ship][0]
          console.log(amtOfCoords)
          break
        }
      }

      if (boardTile.parentElement.parentElement === humanBoard) {
        boardTile.addEventListener('mouseover', () => {
          for (let idx = 0; idx < amtOfCoords; idx++) {
            Array.from(boardRow.childNodes)[number + idx].textContent = 'TST'
          }
        })
        boardTile.addEventListener('mouseout', () => {
          for (let idx = 0; idx < amtOfCoords; idx++) {
            if (!boardTile.classList.contains('clicked_TEST')) {
              Array.from(boardRow.childNodes)[number + idx].textContent = ''
            }
          }
        })
        boardTile.addEventListener('click', () => {
          for (let idx = 0; idx < amtOfCoords; idx++) {
            Array.from(boardRow.childNodes)[number + idx].textContent = 'TST'
            boardTile.classList.add('clicked_TEST')
          }
        })
      }
    })
  }

  return { createPlayerShips }
})()

export { setup }
