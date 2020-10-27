import { GameState, GameStateActionType, KeyState } from "./gameState"

export const getRandomNumber = (values: KeyState[]): number => Math.floor(Math.random() * getMaxNumber(values)) + 1

export const getMaxNumber = (values: KeyState[]): number => values.reduce((prev, cur) => prev + (cur.coeficient * 9), 0)

export const countScore = (clicks: number): number => clicks > 50 ? 0 : 100 - (2 * clicks)

export const getTargetsValues = (state: GameState) => state.targets.map(target => target.value)

export const getGameValue = (state: GameState): number => state.keys.reduce((prev, cur) => prev + (cur.value * cur.coeficient), 0)