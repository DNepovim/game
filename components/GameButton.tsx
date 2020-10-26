import React from "react"
import { css } from '@emotion/native'
import { Text, TouchableOpacity } from "react-native"

interface GameButtonProps {
  value: number
  onPress: () => {}
}

export const GameButton = ({value, onPress}: GameButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={css`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
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
  )
}