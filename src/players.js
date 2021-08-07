import { makeShip } from './ships.js'

function makePlayer (coordinates) {
  const carrier = makeShip('carrier', coordinates.carrier)
  const battleship = makeShip('battleship', coordinates.battleship)
  const destroyer = makeShip('destroyer', coordinates.destroyer)
  const submarine = makeShip('submarine', coordinates.submarine)
  const patrolBoat = makeShip('patrolBoat', coordinates.patrolBoat)
  const missedAttacks = []

  function receiveAttack (attackCoordinates) {
    if (coordinates.carrier.includes(attackCoordinates)) {
      carrier.hit(attackCoordinates)
      if (carrier.isSunk()) {
        return 'carrier sunk'
      } return 'carrier hit'
    } else if (coordinates.battleship.includes(attackCoordinates)) {
      battleship.hit(attackCoordinates)
      if (battleship.isSunk()) {
        return 'battleship sunk'
      } return 'battleship hit'
    } else if (coordinates.destroyer.includes(attackCoordinates)) {
      destroyer.hit(attackCoordinates)
      if (destroyer.isSunk()) {
        return 'destroyer sunk'
      } return 'destroyer hit'
    } else if (coordinates.submarine.includes(attackCoordinates)) {
      submarine.hit(attackCoordinates)
      if (submarine.isSunk()) {
        return 'submarine sunk'
      } return 'submarine hit'
    } else if (coordinates.patrolBoat.includes(attackCoordinates)) {
      patrolBoat.hit(attackCoordinates)
      if (patrolBoat.isSunk()) {
        return 'patrolBoat sunk'
      } return 'patrolBoat hit'
    } else {
      missedAttacks.push(attackCoordinates)
      return 'miss'
    }
  }

  function gameOver () {
    if (carrier.isSunk() && battleship.isSunk() && destroyer.isSunk() && submarine.isSunk() && patrolBoat.isSunk()) {
      return true
    }
    return false
  }

  return {
    gameOver,
    receiveAttack,
    carrier,
    battleship,
    destroyer,
    submarine,
    patrolBoat
  }
}

export { makePlayer }
