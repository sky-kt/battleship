function makeShip (boatName, coordinates) {
  let boatLength
  if (boatName === 'carrier') {
    boatLength = 5
  } else if (boatName === 'battleship') {
    boatLength = 4
  } else if (boatName === 'destroyer' || boatName === 'submarine') {
    boatLength = 3
  } else {
    boatLength = 2
  }

  function hit (coord) {
    this.hitTracker[coord] = 'hit'
  }

  function isSunk () {
    const amtOfHits = Object.keys(this.hitTracker).length
    if (amtOfHits === this.boatLength) {
      return true
    } return false
  }

  return {
    boatName,
    coordinates,
    boatLength,
    hitTracker: {},
    hit,
    isSunk
  }
}

export { makeShip }
