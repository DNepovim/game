import { useReducer } from "react"
import { countScore, getRandomNumber } from "./gameUtils"

export interface GameStateItem {
  key: number
  value: number
  coeficient: number
}

export interface GameState {
  targetValue: number
  score: number
  session: {
    clicks: number
  }
  values: GameStateItem[]
}

export interface GameStateAction {
  type: 'increment' | 'decrement' | 'targetAchieved'
  key?: number
}

const reducer = (state: GameState, action: GameStateAction): GameState => {
  switch (action.type) {
    case 'decrement':
      return {
        ...state,
        session: {
          ...state.session,
          clicks: ++state.session.clicks
        },
        values: state.values.map(item => item.key !== action.key ? item : {
          ...item,
          value: item.value < 1 ? 9 : --item.value
      })
    }
    case 'targetAchieved':
      return {
        ...state,
        targetValue: getRandomNumber(state.values),
        session: {
          ...state.session,
          clicks: 0
        },
        score: state.score + countScore(state.session.clicks)
      }
    default:
      throw new Error();
  }
}

const initialValues: GameStateItem[] = [3, 2, 1, 6, 4, 2, 9, 6, 3].map((item, index) => ({ key: index, value: 0, coeficient: item }))

const initialState: GameState = {
  targetValue: getRandomNumber(initialValues),
  score: 0,
  session: {
    clicks: 0
  },
  values: initialValues
}

export const useGameState = () => useReducer(reducer, initialState)




