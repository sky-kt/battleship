import { makeShip } from './ships.js'

function makeGameboards (coordinates) {
  const carrier = makeShip('carrier', coordinates.carrier)
  const battleship = makeShip('battleship', coordinates.battleship)
  const destroyer = makeShip('destroyer', coordinates.destroyer)
  const submarine = makeShip('submarine', coordinates.submarine)
  const patrolBoat = makeShip('patrolBoat', coordinates.patrolBoat)
  const missedAttacks = []

  function gameOver () {
    if (carrier.isSunk() && battleship.isSunk() && destroyer.isSunk() && submarine.isSunk() && patrolBoat.isSunk()) {
      return true
    }
    return false
  }

  function receiveAttack (attackCoordinates) {
    if (coordinates.carrier.includes(attackCoordinates)) {
      carrier.hit(attackCoordinates)
      return 'carrier hit'
    } else if (coordinates.battleship.includes(attackCoordinates)) {
      battleship.hit(attackCoordinates)
      return 'battleship hit'
    } else if (coordinates.destroyer.includes(attackCoordinates)) {
      destroyer.hit(attackCoordinates)
      return 'destroyer hit'
    } else if (coordinates.submarine.includes(attackCoordinates)) {
      submarine.hit(attackCoordinates)
      return 'submarine hit'
    } else if (coordinates.patrolBoat.includes(attackCoordinates)) {
      patrolBoat.hit(attackCoordinates)
      return 'patrolBoat hit'
    } else {
      missedAttacks.push(attackCoordinates)
      return 'miss'
    }
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

export { makeGameboards }
