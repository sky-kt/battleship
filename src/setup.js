const humanBoard = document.getElementById('humanBoard')

const finalShipCoords = { carrier: [], battleship: [], destroyer: [], submarine: [], patrolBoat: [] }
const shipLengths = [5, 4, 3, 3, 2]
let shipIdx = 0

const setup = (() => {
  function makeTargetedTiles (boardRow, rowIdx) {
    let hasOverlapped = false; let hasBroken = false
    const targetedTiles = []

    for (let idx = 0; idx < shipLengths[shipIdx]; idx++) {
      if (rowIdx + idx < 10) {
        const curTile = Array.from(boardRow.childNodes)[rowIdx + idx]
        targetedTiles.push(curTile)
        if (curTile.classList.contains('shipTile')) { hasOverlapped = true }
      } else {
        hasBroken = true
        break
      }
    }

    if (hasOverlapped && !hasBroken) { targetedTiles.push('hasOverlapped') }
    console.log(targetedTiles)
    return targetedTiles
  }

  function createPlayerShips () {
    return new Promise((resolve) => {
      const boardTiles = document.querySelectorAll('.boardTile')
      boardTiles.forEach(boardTile => {
        if (boardTile.parentElement.parentElement === humanBoard) {
          const boardRow = boardTile.parentElement
          const rowIdx = Array.from(boardTile.parentElement.children).indexOf(boardTile)

          // MOUSE OVER STUFF
          boardTile.addEventListener('mouseover', () => {
            const targetedTiles = makeTargetedTiles(boardRow, rowIdx)
            if (targetedTiles.length === shipLengths[shipIdx]) {
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.add('shipTempTile')
              }
            } else {
              if (targetedTiles[targetedTiles.length - 1] === 'hasOverlapped') {
                targetedTiles.pop()
              }
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.add('invalidTempTile')
              }
            }
          })

          // MOUSE OUT STUFF
          boardTile.addEventListener('mouseout', () => {
            const targetedTiles = makeTargetedTiles(boardRow, rowIdx)
            if (targetedTiles.length === shipLengths[shipIdx]) {
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.remove('shipTempTile')
              }
            } else {
              if (targetedTiles[targetedTiles.length - 1] === 'hasOverlapped') {
                targetedTiles.pop()
              }
              for (const targetedTile in targetedTiles) {
                targetedTiles[targetedTile].classList.remove('invalidTempTile')
              }
            }
          })

          // CLICK STUFF
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
