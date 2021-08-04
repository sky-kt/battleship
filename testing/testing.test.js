/* eslint-disable*/
import { makeShip } from '../src/ships.js'
import { makeGameboards } from '../src/gameboards.js'

const gameboardCoordinates = {
  carrier: ['A1', 'A2', 'A3', 'A4', 'A5'],
  battleship: ['B1', 'B2', 'B3', 'B4'],
  destroyer: ['C1', 'C2', 'C3'],
  submarine: ['D1', 'D2', 'D3'],
  patrolBoat: ['E1', 'E2']
}

test('Fire random shots', () => {
  const gameboardsTest = makeGameboards(gameboardCoordinates)
  expect(gameboardsTest.receiveAttack('A2')).toBe('carrier hit')
  expect(gameboardsTest.receiveAttack('E2')).toBe('patrolBoat hit')
  expect(gameboardsTest.receiveAttack('Z1')).toBe('miss')
})

test('Sink a ship', () => {
  const gameboardsTest = makeGameboards(gameboardCoordinates)
  const targetedCoords = ['A1', 'A2', 'A3', 'A4', 'A5']
  for (const coord in targetedCoords) {
    gameboardsTest.receiveAttack(targetedCoords[coord])
  }
  expect(gameboardsTest.carrier.isSunk()).toBe(true)
})

test('Sink all ships', () => {
  const gameboardsTest = makeGameboards(gameboardCoordinates)
  const targetedCoords = [
    'A1', 'A2', 'A3', 'A4', 'A5', 
    'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3',
    'D1', 'D2', 'D3',
    'E1', 'E2'
  ]
  for (const coord in targetedCoords) {
    gameboardsTest.receiveAttack(targetedCoords[coord])
  }
  expect(gameboardsTest.gameOver()).toBe(true)
})