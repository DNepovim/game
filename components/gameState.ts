import { useReducer } from "react"
import { countScore, getGameValue, getRandomNumber } from "./gameUtils"

export interface KeyState {
  key: number
  value: number
  coeficient: number
}

export interface Target {
  value: number
}


export interface GameState {
  targets: Target[]
  score: number
  session: {
    clicks: number
  }
  keys: KeyState[]
}

export interface GameStateAction {
  type: GameStateActionType
  key?: number
}

export enum GameStateActionType {
  Increment = 'increment',
  Decrement = 'decrement',
  AddTarget = 'add-target',
  Achieved = 'achieved'
}

const reducer = (state: GameState, action: GameStateAction): GameState => {
  switch (action.type) {
    case GameStateActionType.Increment:
      return {
        ...state,
        session: {
          ...state.session,
          clicks: ++state.session.clicks
        },
        keys: state.keys.map(item => item.key !== action.key ? item : {
          ...item,
          value: item.value > 8 ? 0 : ++item.value
      })
    }
    case GameStateActionType.Decrement:
      return {
        ...state,
        session: {
          ...state.session,
          clicks: ++state.session.clicks
        },
        keys: state.keys.map(item => item.key !== action.key ? item : {
          ...item,
          value: item.value < 1 ? 9 : --item.value
      })
    }
    case GameStateActionType.AddTarget:
      if (state.targets.length >= 5) {
        return state
      }
      return {
        ...state,
        targets: [...state.targets, {
          value: getRandomNumber(initialValues)
        }]
      }
    case GameStateActionType.Achieved:
      return {
        ...state,
        targets: state.targets.filter(target => target.value !== getGameValue(state)),
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

const initialValues: KeyState[] = [3, 2, 1, 6, 4, 2, 9, 6, 3].map((item, index) => ({ key: index, value: 0, coeficient: item }))

const initialState: GameState = {
  targets: [],
  score: 0,
  session: {
    clicks: 0
  },
  keys: initialValues
}

export const useGameState = () => useReducer(reducer, initialState)




