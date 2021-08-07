import { makeShip } from './ships.js'

const allCoordArray = [
  'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1',
  'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2',
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3',
  'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4',
  'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5',
  'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6', 'J6',
  'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7', 'J7',
  'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8', 'J8',
  'A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9', 'J9',
  'A10', 'B10', 'C10', 'D10', 'E10', 'F10', 'G10', 'H10', 'I10', 'J10'
]

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

  function findRandomCoordinate () {
    const randomCoordinate = allCoordArray[Math.floor(Math.random() * allCoordArray.length)]
    allCoordArray.splice(allCoordArray.indexOf(randomCoordinate), 1)
    return randomCoordinate
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
    findRandomCoordinate,
    carrier,
    battleship,
    destroyer,
    submarine,
    patrolBoat
  }
}

export { makePlayer }
