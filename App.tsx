import React, { useEffect, useReducer } from 'react';
import { Text, View } from 'react-native';
import { css } from '@emotion/native'
import { GameState, GameStateActionType, useGameState } from './components/gameState';
import { GameKeyboard } from './components/GameKeyboard';
import { countScore, getGameValue, getTargetsValues } from './components/gameUtils';



export default function App() {

  const [state, dispatch] = useGameState()

  useEffect(() => {
    if (getTargetsValues(state).indexOf(getGameValue(state)) !== -1) {
      dispatch({ type: GameStateActionType.Achieved })
    }
  }, [state])

  useEffect(() => {
    setInterval(() => {
      dispatch({ type: GameStateActionType.AddTarget })
    }, 2000)
  }, [state])


  const gameValue = getGameValue(state)

  return (
    <View
      style={css`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
      `}
    >
      <Text
        style={css`
          align-self: flex-start;
          margin: 20px auto;
        `}
      >
        {state.score} | {state.session.clicks} | {countScore(state.session.clicks)}
      </Text>
      <Text
        style={css`
          font-size: 60px;
          color: green;
          margin-bottom: 60px;
          flex: auto
        `}
      >
        {state.targets.map(item => item.value).join(', ')}
      </Text>
      <Text
        style={css`
          font-size: 40px;
        `}
      >
        {gameValue}
      </Text>
      <View
        style={css`
          margin: 20px 5% 15%
        `}
      >
        <GameKeyboard values={state.keys} dispatch={dispatch} />
      </View>
    </View>
  );
}
