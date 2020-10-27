import React, { useEffect, useReducer } from 'react';
import { Text, View } from 'react-native';
import { css } from '@emotion/native'
import { GameState, useGameState } from './components/gameState';
import { GameKeyboard } from './components/GameKeyboard';
import { countScore } from './components/gameUtils';

const getGameValue = (state: GameState): number => state.values.reduce((prev, cur) => prev + (cur.value * cur.coeficient), 0)


export default function App() {

  const [state, dispatch] = useGameState()

  useEffect(() => {
    if (state.targetValue === getGameValue(state)) {
      dispatch({type: 'targetAchieved'})
    }
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
        {state.targetValue}
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
        <GameKeyboard values={state.values} dispatch={dispatch} />
      </View>
    </View>
  );
}
