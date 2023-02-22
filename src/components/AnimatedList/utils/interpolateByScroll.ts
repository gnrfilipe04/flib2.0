import { Animated } from "react-native"

export const interpolateByScroll = (inputRange: number[], outputRange: number[], scroll: Animated.Value) => {
    return scroll.interpolate({
      inputRange,
      outputRange
    })
  }