const humanBoard = document.getElementById('humanBoard')

const setup = (() => {
  function createPlayerShips () {
    const boardTiles = document.querySelectorAll('.boardTile')
    const finalShipCoords = { carrier: [], battleship: [], destroyer: [], submarine: [], patrolBoat: [] }

    const shipLengths = [5, 4, 3, 3, 2]
    let shipIdx = 0

    return new Promise((resolve) => {
      boardTiles.forEach(boardTile => {
        const boardRow = boardTile.parentElement
        const rowIdx = Array.from(boardTile.parentElement.children).indexOf(boardTile)

        if (boardTile.parentElement.parentElement === humanBoard) {
          boardTile.addEventListener('mouseover', () => {
            for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
              Array.from(boardRow.childNodes)[rowIdx + idx].classList.add('shipTempTile')
            }
          })
          boardTile.addEventListener('mouseout', () => {
            for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
              Array.from(boardRow.childNodes)[rowIdx + idx].classList.remove('shipTempTile')
            }
          })
          boardTile.addEventListener('click', () => {
            for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
              Array.from(boardRow.childNodes)[rowIdx + idx].classList.add('shipTile')
              const letter = String.fromCharCode(rowIdx + idx + 65)
              const number = Array.from(humanBoard.childNodes).indexOf(boardRow) + 1
              Object.values(finalShipCoords)[shipIdx].push(letter + number)
            }
            console.log(finalShipCoords)
            if (++shipIdx > 4) {
              resolve(finalShipCoords)
            }
          })
        }
      })
    })
  }

  return { createPlayerShips }
})()

export { setup }
