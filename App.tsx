import React, { useEffect, useReducer } from 'react';
import { Text, View } from 'react-native';
import { css } from '@emotion/native'
import { GameState, GameStateAction, GameStateItem } from './components/GameState';
import { GameKeyboard } from './components/GameKeyboard';

const getGameValue = (state: GameState): number => state.values.reduce((prev, cur) => prev + (cur.value * cur.coeficient), 0)


export default function App() {

  const countScore = (clicks:number):number => clicks > 50 ? 0 : 100 - (2*clicks)

  const reducer = (state: GameState, action: GameStateAction): GameState => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          session: {
            ...state.session,
            clicks: ++state.session.clicks
          },
          values: state.values.map(item => item.key !== action.key ? item : {
            ...item,
            value: item.value > 8 ? 0 : ++item.value
        })
      }
      case 'targetAchieved':
        return {
          ...state,
          targetValue: getRandomNumber(),
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

  const maxNumber: number = initialValues.reduce((prev, cur) => prev + (cur.coeficient * 9), 0)

  const getRandomNumber = () => Math.floor(Math.random() * maxNumber) +1

  const initialState: GameState = {
    targetValue: getRandomNumber(),
    score: 0,
    session: {
      clicks: 0
    },
    values: initialValues
  }


  const [state, dispatch] = useReducer(reducer, initialState)

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
