import React from "react"
import { css } from '@emotion/native'
import { Text, TouchableOpacity } from "react-native"
import GestureRecognizer from 'react-native-swipe-gestures';

interface GameButtonProps {
  value: number
  onUp: () => {}
  onDown: () => {}
}

export const GameButton = ({value, onUp, onDown}: GameButtonProps) => {
  const hexValue = (255 - value * 10).toString(16)
  const color = `#${hexValue}${hexValue}${hexValue}`
  return (
    <GestureRecognizer
      onSwipeDown={onDown}
      onSwipeUp={onUp}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onUp}
        style={css`
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${color};
          width: 90px;
          height: 90px;
          border-radius: 45px;
          margin: 5px;
        `}
      >
        <Text
          style={css`
            color: gray;
            font-size: 40px;
          `}
        >
          {value}
        </Text>
      </TouchableOpacity>
    </GestureRecognizer>
  )
}