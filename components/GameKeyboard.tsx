import React, { Dispatch } from "react";
import { css } from "@emotion/native";
import { View } from 'react-native';
import { GameButton } from "./GameButton";
import { GameState, GameStateAction, GameStateItem } from "./GameState";

interface GameKeyboardProps {
  values: GameStateItem[]
  dispatch: Dispatch<GameStateAction>
}

export const GameKeyboard = ({values, dispatch}: GameKeyboardProps) =>
  <View
    style={css`
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      margin: 0 auto;
      width: 300px
    `}
  >
    {values.map(({value, key}:GameStateItem) => (
      <GameButton key={key} value={value} onPress={async () => dispatch({ type: 'increment', key })} />
    ))}
</View>