import { GameStateItem } from "./gameState"

export const getRandomNumber = (values: GameStateItem[]): number => Math.floor(Math.random() * getMaxNumber(values)) + 1

export const getMaxNumber = (values: GameStateItem[]): number => values.reduce((prev, cur) => prev + (cur.coeficient * 9), 0)

export const countScore = (clicks: number): number => clicks > 50 ? 0 : 100 - (2 * clicks)