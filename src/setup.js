let humanBoard = document.getElementById('humanBoard')

const setup = (() => {
  function createPlayerShips () {
    const boardTiles = document.querySelectorAll('.boardTile')
    const finalShipCoords = { carrier: [], battleship: [], destroyer: [], submarine: [], patrolBoat: [] }

    const shipLengths = [5, 4, 3, 3, 2]
    let shipIdx = 0

    return new Promise((resolve) => {
      boardTiles.forEach(boardTile => {
        if (boardTile.parentElement.parentElement === humanBoard) {
          const boardRow = boardTile.parentElement
          const rowIdx = Array.from(boardTile.parentElement.children).indexOf(boardTile)

          boardTile.addEventListener('mouseover', () => {
            const targetedTiles = []

            for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
              if (rowIdx + idx < 10) {
                targetedTiles.push(Array.from(boardRow.childNodes)[rowIdx + idx])
              } else {
                break
              }
            }

            if (targetedTiles.length === shipLengths[shipIdx]) {
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.add('shipTempTile')
              }
            } else {
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.add('invalidTempTile')
              }
            }
          })

          boardTile.addEventListener('mouseout', () => {
            const targetedTiles = []

            for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
              if (rowIdx + idx < 10) {
                targetedTiles.push(Array.from(boardRow.childNodes)[rowIdx + idx])
              } else {
                break
              }
            }

            if (targetedTiles.length === shipLengths[shipIdx]) {
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.remove('shipTempTile')
              }
            } else {
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.remove('invalidTempTile')
              }
            }
          })

          boardTile.addEventListener('click', () => {
            if (rowIdx + shipLengths[shipIdx] < 11) {
              for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
                const letter = String.fromCharCode(rowIdx + idx + 65)
                const number = Array.from(humanBoard.childNodes).indexOf(boardRow) + 1
                Object.values(finalShipCoords)[shipIdx].push(letter + number)
                Array.from(boardRow.childNodes)[rowIdx + idx].classList.add('shipTile')
              }
              if (++shipIdx > 4) {
                const hbClone = humanBoard.cloneNode(true)
                humanBoard.parentNode.replaceChild(hbClone, humanBoard)
                resolve(finalShipCoords)
              }
            } else {
              alert('Invalid location...')
            }
          })
        }
      })
    })
  }

  return { createPlayerShips }
})()

export { setup }
