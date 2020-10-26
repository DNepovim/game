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
  type: 'increment' | 'targetAchieved'
  key?: number
}

